FROM python:3.10

WORKDIR /app/server

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# environment variables
ENV DEVELOPMENT_DATABASE_URI="postgresql://glebisi:xs6lGhOTcuQ1@ep-summer-sun-a27gxr0f.eu-central-1.aws.neon.tech/neondb?sslmode=require"
ENV PRODUCTION_DATABASE_URI="postgresql://admin:UQYbKMGokZ0v7rSDR88PSg9kxIgvw9Qj@dpg-cmpadn6n7f5s73ddes0g-a.frankfurt-postgres.render.com/postgres_database_tpp2"
ENV PRODUCTION_CDN_URL="https://codevoke.pythonanywhere.com/"
ENV DEVELOPMENT_CDN_URL="https://glorious-journey-44q4rj6549w2qvpq-5050.app.github.dev/"
ENV JWT_SECRET_KEY="oisfhduidhuihUIUG*ED*Geuigd8g*@&G#ED*23bd#*@GDBdbbsaibciuasbniubcn"

# running server
CMD ["gunicorn", "app:app", "--bind", "localhost:5000"]
