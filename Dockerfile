FROM node:22.14.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY .env.development ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8001

CMD ["node", "dist/main"]
