FROM node:latest as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . . 
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/angular-test-table /usr/share/nginx/html