# geek-text

## Prerequisites

- Docker
- docker-compose
- NodeJS

## Running the Docker containers

- `docker-compose up`

## Running the Docker containers in detached state

- `docker-compose up -d`

## Rebuilding the container images from a new push

- `docker-compose build <container>`

OR

- `docker-compose up --build`

## Manually running NPM install in a running container

- `docker-compose exec <service_name> npm install`

## Manully running another command in a running container

- `docker-compose exec <service_name> <command> [arguments]`

eg:

- `docker-compose exec backend primsa migrate deploy --preview-feature`
- `docker-compose exec backend npm run prisma:seed`
- `docker-compose exec frontend npm run build -- --prod`
