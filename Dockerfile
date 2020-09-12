FROM python:3.6

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Create directory, install requirements, and copy source code
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/

# Setting up some environment variables
ENV CLIMB_BETA_SECRET_KEY CLIMB_BETA_SECRET_KEY
ENV GOOGLE_API_KEY GOOGLE_API_KEY
ENV VIMEO_ACCESS_TOKEN VIMEO_ACCESS_TOKEN 
ENV VIMEO_CLIENT_ID VIMEO_CLIENT_ID
ENV VIMEO_CLIENT_SECRET VIMEO_CLIENT_SECRET

# Build production image
ENV AWS_ACCESS_KEY_ID AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY AWS_SECRET_ACCESS_KEY
ENV EMAIL_HOST_USER EMAIL_HOST_USER
ENV EMAIL_HOST_PASSWORD EMAIL_HOST_PASSWORD

RUN adduser --disabled-password --gecos '' accessuser
USER accessuser

CMD gunicorn climbbeta.wsgi:application --bind 0.0.0.0:$PORT