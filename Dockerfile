# Use the official Node.js 20.17.0 image as the base image
FROM node:20.17.0 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Set environment variable to skip Husky hooks
ENV HUSKY=0

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the application
RUN npm run build

# Use a lightweight image to serve the production build
FROM node:20.17.0 as production

# Install `serve` to serve the built files
RUN npm install -g serve

# Copy the build from the previous stage
COPY --from=build /app/dist /app/dist

# Set the working directory
WORKDIR /app/dist

# Expose port 3000
EXPOSE 3000

# Command to serve the app in production
CMD ["serve", "-s", ".", "-l", "3000"]
