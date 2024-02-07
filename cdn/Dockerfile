FROM python:3.10

WORKDIR /app/cdn

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# running cdn server
CMD ["gunicorn", "app:app", "--bind", "localhost:5050"]
