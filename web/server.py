import argparse
import json
import logging
import ssl
import sys
import requests

from pathlib import Path
from aiohttp import web
from aiohttp.web_exceptions import HTTPServiceUnavailable
from aiortc import RTCSessionDescription, RTCPeerConnection
from kaldi import KaldiSink, kaldi_server_queue
import aiohttp_cors

ROOT = Path(__file__).parent

root = logging.getLogger()
root.setLevel(logging.INFO)

handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)
formatter = logging.Formatter('[%(asctime)s] %(name)s <%(levelname)s> %(message)s')
handler.setFormatter(formatter)
root.addHandler(handler)


async def index(request):
    content = open(str(ROOT / 'static' / 'index.html')).read()
    return web.Response(content_type='text/html', text=content)


async def offer(request):
    kaldi_server = await kaldi_server_queue.get()
    if not kaldi_server:
        raise HTTPServiceUnavailable()

    # if not kaldi_server:
    #     raise HTTPGatewayTimeout()

    params = await request.json()
    offer = RTCSessionDescription(
        sdp=params['sdp'],
        type=params['type'])

    pc = RTCPeerConnection()

    kaldi = KaldiSink(pc, kaldi_server)

    @pc.on('datachannel')
    async def on_datachannel(channel):
        await kaldi.set_text_channel(channel)

    @pc.on('iceconnectionstatechange')
    async def on_iceconnectionstatechange():
        if pc.iceConnectionState == 'failed':
            await pc.close()

    @pc.on('track')
    async def on_track(track):
        if track.kind == 'audio':
            await kaldi.set_audio_track(track)

        @track.on('ended')
        async def on_ended():
            await kaldi.stop()

    await pc.setRemoteDescription(offer)
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    await kaldi.start()

    return web.Response(
        content_type='application/json',
        text=json.dumps({
            'sdp': pc.localDescription.sdp,
            'type': pc.localDescription.type
        }))

async def search(request):
    params = await request.json()
    lat = params['lat']
    lng = params['lng']
    key = params['key']

    URL = 'https://discovery.deliveryhero.io/search/api/v1/feed'
    data = {
        'brand': "foodpanda",
        'config': "Variant6",
        'country_code': "th",
        'customer_id': "",
        'customer_type': "regular",
        'include_component_types': ["vendors"],
        'include_fields': ["feed"],
        'language_code': "th",
        'language_id': "6",
        'limit': 50,
        'location': {'point': {'latitude': lat, 'longitude': lng}},
        'offset': 0,
        'opening_type': "delivery",
        'platform': "web",
        'q': key,
        'session_id': "",
        'vertical_type': "restaurants"
	}
    r = requests.post(URL, json=data)
    out = r.json()['feed']['items'][0]['items']
    return web.Response(content_type='text/html', text=str(out))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--servers', help='Server configuration JSON')
    parser.add_argument('--cert-file', help='SSL certificate file (for HTTPS)')
    parser.add_argument('--key-file', help='SSL key file (for HTTPS)')
    parser.add_argument('--port', type=int, default=8080,
                        help='Port for HTTP server (default: 8080)')

    args = parser.parse_args()

    if args.cert_file:
        ssl_context = ssl.SSLContext()
        ssl_context.load_cert_chain(args.cert_file, args.key_file)
    else:
        ssl_context = None

    app = web.Application()
    app.router.add_get('/', index)
    app.router.add_get('/search', search)
    app.router.add_post('/offer', offer)
    app.router.add_static('/static/', path=ROOT / 'static', name='static')

    # Configure default CORS settings.
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
    })

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)

    kaldi_server_queue.load(args.servers)

    web.run_app(app, port=args.port, ssl_context=ssl_context)