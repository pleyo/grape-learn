# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Set the environment variable
ENV NODE_ENV=production

# Build TypeScript files
RUN npm run build


# Expose the port that your app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]