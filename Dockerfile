FROM python:3.8-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY backend .
COPY dist ./dist
RUN pip install --upgrade pip
RUN apt-get update && apt-get install netcat -y
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir /app/static

ENTRYPOINT ["/app/entrypoint.sh"]