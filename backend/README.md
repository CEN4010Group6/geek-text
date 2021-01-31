# geek-text backend

## Running commands in the container

Commands that need to be run in the container, such as adding new dependencies and additional setup, may be run as:

`docker-compose run backend <command>`

## Running initial database setup

- `docker-compose run backend npx prisma generate`

## Running migrations

- `docker-compose run backend npx prisma migrate dev --preview-feature`
