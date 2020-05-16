FROM python:3.7

COPY . server
WORKDIR /server
RUN pip install -r requirements.txt

EXPOSE 8080

ENTRYPOINT ["python", "server.py"]
CMD ["--servers","/server/servers.json"]