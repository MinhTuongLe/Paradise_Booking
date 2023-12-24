# user image contain Node.js and yarn
FROM node:18

# create app directory
WORKDIR /usr/src/lamheo3

# Copy all files to the workdir
COPY . /usr/src/lamheo3

# 
#install Yarn
RUN npm install -g npm@10.2.5

RUN npm cache clean --force

RUN npm install yarn


# Copy package.json and yarn.lock to the workdir
# COPY package*.json yarn.lock ./
# run yarn build
RUN yarn

# Install dependencies by Yarn
# RUN yarn install --ignore-engines

# Expose default port of Next.js
EXPOSE 3000

# Command to run when starting the container
CMD ["yarn", "dev"]