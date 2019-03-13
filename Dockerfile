FROM node:10.13-alpine AS builder

WORKDIR /usr/src/resume

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

FROM node:10.13-alpine
WORKDIR /resume
RUN npm install serve -g 
COPY --from=builder /usr/src/resume/build /resume/build
COPY --from=builder /usr/src/resume/package.json /resume
COPY --from=builder /usr/src/resume/.env /resume

EXPOSE 3080
CMD npm run serve