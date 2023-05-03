FROM node:17.1-alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install
# RUN npm upgrade

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm run build

FROM nginx:1.17.1-alpine
RUN apk --no-cache add curl

COPY ./nginx.config /etc/nginx/conf.d/default.conf
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/dist/product-browser /usr/share/nginx/html
