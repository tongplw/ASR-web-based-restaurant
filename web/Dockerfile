FROM python:3.7

ADD ./web/requirements.txt /tmp/requirements.txt
RUN pip install -qr /tmp/requirements.txt
ADD ./web /server
WORKDIR /server

EXPOSE 8080

ENTRYPOINT ["python", "server.py"]
CMD ["--servers","/server/servers.json"]
