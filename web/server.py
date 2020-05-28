import argparse
import json
import logging
import ssl
import sys

from pathlib import Path
from aiohttp import web
from aiohttp.web_exceptions import HTTPServiceUnavailable
from aiortc import RTCSessionDescription, RTCPeerConnection
from kaldi import KaldiSink, kaldi_server_queue
import aiohttp_cors
import datetime

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

class table:
    def __init__(self,name) :
        self.name = name
        self.isOccupied = False
        self.foodItems = []
    def setOccupied(self,status) :
        self.isOccupied = status
        return self.isOccupied
class respond :
    def __init__(self) :
        self.key = "initKey"
        self.status = False
        self.value = "initValue"

foodOrder = []

table1 = table("table1")
table2 = table("table2")
table3 = table("table3")
table4 = table("table4")
table5 = table("table5")

def findOrder(name) :
    for i in range(0,len(foodOrder)) :
        if name in foodOrder[i] :
            return i
    return -1

def removeOrder(name) :
    if findOrder(name) != -1 :
        del foodOrder[findOrder(name)]

async def textfield(request) :
    params = await request.json()
    orders = params['orders']
    #table = params['table']
    res = respond()
    secondMode = "anything"
    if ("จอง" in orders) and ("โต๊ะ" in orders):
        res.key = "table"
        if "หนึ่ง" in orders :
            res.value = "table1"
            if (not table1.isOccupied) :
                # table1.setOccupied(True)
                res.tableNo = "1"
                res.title = "Available"
                res.status = True
            else :
                res.tableNo = "1"
                res.status = False
        elif "สอง" in orders :
            res.value = "table2"
            if (not table2.isOccupied) :
                # table2.setOccupied(True)
                res.tableNo = "2"
                res.title = "Available"
                res.status = True
            else :
                res.tableNo = "2"
                res.status = False
        elif "สาม" in orders :
            res.value = "table3"
            if (not table3.isOccupied) :
                # table3.setOccupied(True)
                res.tableNo = "3"
                res.title = "Available"
                res.status = True
            else :
                res.tableNo = "3"
                res.status = False
        elif "สี่" in orders :
            res.value = "table4"
            if (not table4.isOccupied) :
                # table4.setOccupied(True)
                res.tableNo = "4"
                res.title = "Available"
                res.status = True
            else :
                res.tableNo = "4"
                res.status = False
        elif "ห้า" in orders :
            res.value = "table5"
            if (not table5.isOccupied) :
                # table5.setOccupied(True)
                res.tableNo = "5"
                res.title = "Available"
                res.status = True
            else :
                res.tableNo = "5"
                res.status = False
    elif ("กี่" in orders) and ("บาท" in orders) or ("เท่าไร" in orders):
        res.key = "asking"
        res.status = True
        if ("ข้าว ไข่เจียว หมูสับ" in orders):
            res.name = "ข้าวไข่เจียวหมูสับ"
        elif ("กะเพรา หมูสับ" in orders):
            res.name = "กะเพราหมูสับ"
            res.makeTime = 600000
        elif ("ข้าวผัด หมู" in orders):
            res.name = "ข้าวผัดหมู"
            res.makeTime = 600000
        elif ("ข้าว หมูกรอบ" in orders):
            res.name = "ข้าวหมูกรอบ"
        elif ("ก๋วยเตี๋ยว" in orders):
            res.name = "ก๋วยเตี๋ยว"
        if "หนึ่ง" in orders : res.amount = 1
        elif "สอง" in orders : res.amount = 2
        elif "สาม" in orders : res.amount = 3
        elif "สี่" in orders : res.amount = 4
        elif "ห้า" in orders : res.amount = 5
    elif ("ขอ" in orders) and ("จาน" in orders):
        res.key = "order"
        x = datetime.datetime.now()
        if ("ข้าว ไข่เจียว หมูสับ" in orders):
            res.name = "ข้าวไข่เจียวหมูสับ"
            res.text = "ไข่ที่ดีคือไข่ลาดยาง"
            res.image = "ข้าวไข่เจียวหมูสับ.jpg"
            res.price = "99.-"
            res.addTime = str(x)
            res.makeTime = 600000
        elif ("กะเพรา หมูสับ" in orders):
            res.name = "กะเพราหมูสับ"
            res.text = "หมูที่ดีหรือหมู่กลม"
            res.image = "กะเพราหมูสับ.jpg"
            res.price = "99.-"
            res.addTime = str(x)
            res.makeTime = 600000
        elif ("ข้าวผัด หมู" in orders):
            res.name = "ข้าวผัดหมู"
            res.text = "ผัดที่ดีคือผัดใบเขียว"
            res.image = "ข้าวผัดหมู.png"
            res.price = "99.-"
            res.addTime = str(x)
            res.makeTime = 600000
        elif ("ข้าว หมูกรอบ" in orders):
            res.name = "ข้าวหมูกรอบ"
            res.text = "หมูกรอบบบบบบบบบบบ"
            res.image = "ข้าวหมูกรอบ.jpg"
            res.price = "99.-"
            res.addTime = str(x)
            res.makeTime = 600000
        elif ("ก๋วยเตี๋ยว" in orders):
            res.name = "ก๋วยเตี๋ยว"
            res.text = "เส้นที่ดีคือเส้นใหญ่"
            res.image = "ก๋วยเตี๋ยว.jpg"
            res.price = "99.-"
            res.addTime = str(x)
            res.makeTime = 300000
        if "หนึ่ง" in orders : res.amount = 1
        elif "สอง" in orders : res.amount = 2
        elif "สาม" in orders : res.amount = 3
        elif "สี่" in orders : res.amount = 4
        elif "ห้า" in orders : res.amount = 5
        # jsonStr = json.dumps(res.__dict__,ensure_ascii=False)
        # foodOrder.append(jsonStr)
        
    elif "เมนู" in orders :
        res.key = "menu"
        res.status = True
        res.value = ["menu"]
    elif "ราคา" in orders :
        res.key = "price"
        res.status = True
        res.value = ["price"]
    elif "ให้" in orders :
        if ( "ดาว" in orders ) or ( "คะแนน" in orders ) :   
            res.key = "star"
            res.status = True
            res.value = ["star"]
            if "หนึ่ง" in orders : res.point = 1
            elif "สอง" in orders : res.point = 2
            elif "สาม" in orders : res.point = 3
            elif "สี่" in orders : res.point = 4
            elif "ห้า" in orders : res.point = 5
    elif ("คิด" in orders) or ("จ่าย" in orders) or ("เก็บ" in orders) :
        if ( "ตัง" in orders ) or ( "เงิน" in orders ) :   
            res.key = "bill"
            res.status = True
            res.value = ["bill"]
    ###### confirm #######
    elif ("ยืนยัน" in orders) and ("จอง" in orders) :
        res.key = "confirm"
        if "1" in orders : 
            res.status = True
            res.tableNo = 1
            table1.setOccupied(True)
            res.occupied = table1.isOccupied
        elif "2" in orders :
            res.status = True
            res.tableNo = 2 
            table2.setOccupied(True)
            res.occupied = table2.isOccupied
        elif "3" in orders :
            res.status = True 
            res.tableNo = 3
            table3.setOccupied(True)
            res.occupied = table3.isOccupied
        elif "4" in orders :
            res.status = True 
            res.tableNo = 4
            table4.setOccupied(True)
            res.occupied = table4.isOccupied
        elif "5" in orders :
            res.status = True 
            res.tableNo = 5
            table5.setOccupied(True)
            res.occupied = table5.isOccupied
        
    elif ("ยืนยัน" in orders) and ("สั่ง" in orders) :
            res.key = "Confirm"
            x = datetime.datetime.now()
            if ("ข้าวไข่เจียวหมูสับ" in orders):
                res.name = "ข้าวไข่เจียวหมูสับ"
                res.text = "ไข่ที่ดีคือไข่ลาดยาง"
                res.image = "ข้าวไข่เจียวหมูสับ.jpg"
                res.price = "99.-"
                res.addTime = str(x)
                res.makeTime = 600000
            elif ("กะเพราหมูสับ" in orders):
                res.name = "กะเพราหมูสับ"
                res.text = "หมูที่ดีหรือหมู่กลม"
                res.image = "กะเพราหมูสับ.jpg"
                res.price = "99.-"
                res.addTime = str(x)
                res.makeTime = 600000
            elif ("ข้าวผัดหมู" in orders):
                res.name = "ข้าวผัดหมู"
                res.text = "ผัดที่ดีคือผัดใบเขียว"
                res.image = "ข้าวผัดหมู.png"
                res.price = "99.-"
                res.addTime = str(x)
                res.makeTime = 600000
            elif ("ข้าวหมูกรอบ" in orders):
                res.name = "ข้าวหมูกรอบ"
                res.text = "หมูกรอบบบบบบบบบบบ"
                res.image = "ข้าวหมูกรอบ.jpg"
                res.price = "99.-"
                res.addTime = str(x)
                res.makeTime = 600000
            elif ("ก๋วยเตี๋ยว" in orders):
                res.name = "ก๋วยเตี๋ยว"
                res.text = "เส้นที่ดีคือเส้นใหญ่"
                res.image = "ก๋วยเตี๋ยว.jpg"
                res.price = "99.-"
                res.addTime = str(x)
                res.makeTime = 300000
            if "1" in orders : res.amount = 1
            elif "2" in orders : res.amount = 2
            elif "3" in orders : res.amount = 3
            elif "4" in orders : res.amount = 4
            elif "5" in orders : res.amount = 5
            
            jsonStr = json.dumps(res.__dict__,ensure_ascii=False)
            foodOrder.append(jsonStr)
    elif ("ลบ") in orders :
        res.key = "delete"
        res.status = True
        if ("ข้าว ไข่เจียว หมูสับ" in orders):
            removeOrder("ข้าวไข่เจียวหมูสับ")
        elif ("กะเพรา หมูสับ" in orders):
            removeOrder("กะเพราหมูสับ")
        elif ("ข้าวผัด หมู" in orders):
            removeOrder("ข้าวผัดหมู")
        elif ("ข้าว หมูกรอบ" in orders):
            removeOrder("ข้าวหมูกรอบ")
        elif ("ก๋วยเตี๋ยว" in orders):
            removeOrder("ก๋วยเตี๋ยว")
    elif ("ยกเลิก" in orders) and ("ขอ" not in orders):
        res.key = "cancel"
        res.status = True
        if ("ข้าว ไข่เจียว หมูสับ" in orders):
            removeOrder("ข้าวไข่เจียวหมูสับ")
        elif ("กะเพรา หมูสับ" in orders):
            removeOrder("กะเพราหมูสับ")
        elif ("ข้าวผัด หมู" in orders):
            removeOrder("ข้าวผัดหมู")
        elif ("ข้าว หมูกรอบ" in orders):
            removeOrder("ข้าวหมูกรอบ")
        elif ("ก๋วยเตี๋ยว" in orders):
            removeOrder("ก๋วยเตี๋ยว")
    

    jsonStr = json.dumps(res.__dict__,ensure_ascii=False)
    return web.Response(content_type='text/html', text=jsonStr)
    #return web.json_response(jsonStr)

async def table(request):
    tbNo = request.match_info.get('name')
    if (tbNo == "1"):
        jsonStr = json.dumps(table1.__dict__)
        return web.Response(content_type='text/html', text=str(jsonStr))
    if (tbNo == "2"):
        jsonStr = json.dumps(table2.__dict__)
        return web.Response(content_type='text/html', text=str(jsonStr))
    if (tbNo == "3"):
        jsonStr = json.dumps(table3.__dict__)
        return web.Response(content_type='text/html', text=str(jsonStr))
    if (tbNo == "4"):
        jsonStr = json.dumps(table4.__dict__)
        return web.Response(content_type='text/html', text=str(jsonStr))
    if (tbNo == "5"):
        jsonStr = json.dumps(table5.__dict__)
        return web.Response(content_type='text/html', text=str(jsonStr))

async def order(request) :
    print("ordering")
    return web.Response(content_type='text/html', text=str(foodOrder))

async def debug(request) :
    print("order")
    jsonStr = json.dumps(table1.__dict__)
    return web.Response(content_type='text/html', text=str(jsonStr))

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
    app.router.add_post('/offer', offer)

    app.router.add_post('/textfield',textfield)
    app.router.add_get('/debug',debug)
    app.router.add_get('/order',order)
    app.add_routes([web.get('/table', table),
                web.get('/table/{name}', table)])

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