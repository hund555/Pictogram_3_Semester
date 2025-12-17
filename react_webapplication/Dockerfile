#Buildstage
FROM node:20-alpine AS BUILD
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Production
FROM nginx:alpine

#Remove default nginx config:
RUN rm /etc/nginx/conf.d/default.conf

#Place custom nginx config
COPY nginx.conf /etc/nginx/conf.d



COPY --from=BUILD /app/dist /usr/share/nginx/html



EXPOSE 49732



CMD ["nginx", "-g", "daemon off;"]

