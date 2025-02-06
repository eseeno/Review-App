FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2-binary

COPY . /app 

ENV PYTHONPATH "${PYTHONPATH}:/app/review_platform"



EXPOSE 8000

ENV BROWSER=none

CMD gunicorn review_platform.wsgi:application 
