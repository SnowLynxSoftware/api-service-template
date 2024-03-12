FROM node:lts-bookworm as build
WORKDIR /opt/api
COPY . .
RUN npm ci
RUN npm run build
RUN rm -rf __tests__ .env .env.example .gitignore jest.config.js test-report.html tsconfig.json src .idea

FROM node:lts-bookworm-slim
COPY --from=build /opt/api /opt/api
EXPOSE 3000