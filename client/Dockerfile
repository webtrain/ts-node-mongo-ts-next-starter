FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN yarn build

EXPOSE 3000

# Running the app
CMD ["npm", "run", "dev"]