# ---- 1. Build Stage ----
FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# ---- 2. Serve Stage ----
FROM nginx:1.25-alpine
COPY --from=build /app/dist/tbp-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
