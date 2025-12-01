# base image -> lang/environment used in application
FROM node:22

# creating folder/image_name to store files and folders of application
WORKDIR /app

# copying package and package-lock.json in current directory (/app)
COPY package*.json .

# to install all the packages -> this will create node_modules folder
RUN npm install

# to copy all the application files and folder to docker image
COPY . .

# env set up
ENV PORT=4000

# exposing the port
EXPOSE 4000

# command to run application for docker
# CMD [ "node" ,"index.js" ]
CMD [ "npm" ,"start" ]