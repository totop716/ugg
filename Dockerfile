FROM alpine:3.10

# Install system dependencies
RUN apk add --no-cache --update \
  bash \
  gcc \
  musl-dev \
  postgresql-dev \
  python3 \
  python3-dev \
  py3-pip \
  curl \
  # Pillow dependencies
  jpeg-dev \
  zlib-dev \
  freetype-dev \
  lcms2-dev \
  openjpeg-dev \
  tiff-dev \
  tk-dev \
  tcl-dev \
  harfbuzz-dev \
  fribidi-dev \
  git \
  nodejs \
  nodejs-npm
RUN pip3 install --no-cache-dir -q pipenv

# Add our code
ADD ./ /app/webapp/

WORKDIR /app/webapp/frontend

# Install frontend dependencies
# RUN npm ci

WORKDIR /app/webapp/backend

# Install backend dependencies

RUN pipenv install --deploy --system

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

# Run the web server on port $PORT
CMD waitress-serve --port=$PORT ugg_2957.wsgi:application
