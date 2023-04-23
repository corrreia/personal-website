# Use an official Node runtime as a parent image
FROM node:14-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a smaller base image for the production environment
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=builder /app/dist/personal-website /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
