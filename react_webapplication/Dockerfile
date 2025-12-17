#Buildstage
FROM node:20-alpine AS BUILD
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


#Production
FROM nginx:alpine

#Remove default nginx config:
RUN rm /etc/nginx/conf.d/default.conf

#Place custom nginx config
COPY nginx.conf /etc/nginx/conf.d



COPY --from=build /app/build /usr/share/nginx/html



EXPOSE 80



CMD ["nginx, "-g", "deamon off;"]

