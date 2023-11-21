FROM node:latest
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma/

COPY . .

RUN rm -rf node_modules package-lock.json

RUN npm install
RUN npm run build

EXPOSE 3000

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

CMD ["/wait-for-db.sh"]
