# user image contain Node.js and yarn
FROM node:14

# install Yarn
RUN npm install yarn

# create app directory
WORKDIR /app

# Copy package.json and yarn.lock to the workdir
COPY package*.json yarn.lock ./

# Install dependencies by Yarn
RUN yarn install --ignore-engines

# Copy all files to the workdir
COPY . .

# Expose default port of Next.js
EXPOSE 3000

# Command to run when starting the container
CMD ["yarn", "dev"]