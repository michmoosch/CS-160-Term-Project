FROM node:18.15-buster
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "dev"]