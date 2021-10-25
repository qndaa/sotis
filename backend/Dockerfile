FROM python:3.9.5
ENV PYTHONBUFFERED=1
WORKDIR /backend
COPY ./requirements.txt /backend/
RUN pip install -r requirements.txt
COPY . /backend/
WORKDIR /backend/api