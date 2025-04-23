# ---- 1. Build Stage ----
FROM node:23-slim AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# ---- 2. Serve Stage ----
FROM nginx:1.27-alpine-slim
COPY --from=build /app/dist/tbp-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
