# Microservices using Node.js

This project was built to demonstrate basic scaling microservices possibilities using docker containers and load balancer (NGINX).

## Services

This project is split to 4 different packages.

- Auth Service (Node.js) - Service that provides persistant registration & authentication using MongoDB
- Dashboard (React.js) - Web application that provides 3 routes to create an account, login and view home page made only for logged in users
- Gift Card Service (Node.js) - Service is meant to send emails with gift cards to new registered users
- Greeting Service (Node.js) - Service is meant to send greeting emails to new registered users

## Architecture

Project architecture is done by `docker-compose` on development environment. This project can be deployed easily to any cloud, since it's making use of Docker conterization.

Scaling on development environment is done by changing `scale` option inside `docker-compose.yml` for any service.

All services communicate via Load Balancer (Nginx), which is doing service discovery using DNS server provided by Docker engine. By default it redirects requests to containers using `round-robin` method, but it can be changed by tweaking Nginx configuration.

## Usage:

```bash
docker-compose up
```

By default, there is only port `3000` exposed by load-balancer, so after starting the containers, you can access http://localhost:3000 and you should see "Dashboard" web application which will ask you to login or create an account.

## Notes

1. If in the middle of the account creation, one of the services such as "Gift Card" or "Greeting" is unreachable, account gets deleted and registration is failing gracefully.
2. Architecture can be improved by using "queue" messaging, and doing things (such as sending emails) asynchonously.
3. React Application can be improved by reusing form business logic
4. Skeleton which is used for Authentication service, doesn't normalize errors coming from "mongo" which is not secure, and makes it hard to work with
5. Build times can be improved by using Docker layers
