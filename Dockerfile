FROM python:3.6.3
ENV PYTHONUNBUFFERED 1
RUN mkdir /climbbeta
WORKDIR /climbbeta
COPY requirements.txt /climbbeta/
RUN pip install -r requirements.txt
COPY . /climbbeta/

ENV CLIMB_BETA_SECRET_KEY CLIMB_BETA_SECRET_KEY
ENV GOOGLE_API_KEY GOOGLE_API_KEY
ENV VIMEO_ACCESS_TOKEN VIMEO_ACCESS_TOKEN 
ENV VIMEO_CLIENT_ID VIMEO_CLIENT_ID
ENV VIMEO_CLIENT_SECRET VIMEO_CLIENT_SECRET