# build environment
FROM node:13-alpine as build
WORKDIR /app
ARG REACT_APP_AUTH_URL=/api/auth
ENV REACT_APP_AUTH_URL=$REACT_APP_AUTH_URL
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn
COPY . /app
RUN yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]