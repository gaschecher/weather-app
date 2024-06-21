# Use the latest Node.js 20 image
FROM node:18
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY weather-app-nest-backend/package.json ./
# to get more than the simple logs docker build spits out by default
RUN npm config set loglevel verbose
# Install dependencies
RUN npm i --force
# Copy the source code
COPY weather-app-nest-backend/ .
# Build the application
RUN npm run build
# Set environment variables (optional), from a standard nest JS docker template i use
ENV NODE_ENV production
ENV PORT 3000
# Start the application
CMD ["node", "dist/main"]