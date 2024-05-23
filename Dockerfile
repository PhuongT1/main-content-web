FROM node:18.18.0

# Set the working directory in the container
WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build:prod

EXPOSE 3000

CMD ["yarn", "start"]
