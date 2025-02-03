# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, excluding node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate dev

# Expose the port the app runs on
EXPOSE 9000

# Define the command to run the app
CMD ["npm", "start"]
