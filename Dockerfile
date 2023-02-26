# STEP 1 기본 세팅
FROM node:18.12.1 as builder

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build


# STEP 2 서버 실행

FROM node:18.12.1-alpine

WORKDIR /app

ENV NODE_ENV dev

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm","run", "start:dev"]