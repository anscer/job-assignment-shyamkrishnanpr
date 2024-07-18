# Use the official Node.js image with a specific version
FROM node:18.16.1

# Set working directory inside the container
WORKDIR /usr/src/app

# Install npm packages as non-root user
RUN addgroup --system app && adduser --system --ingroup app app
RUN chown -R app:app /usr/src/app

# Change to non-root user
USER app

# Copy package.json and package-lock.json to WORKDIR
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code to WORKDIR
COPY . .

# Expose port 8000 (if your application listens on a specific port)
EXPOSE 8000

# Command to run your application
CMD ["npm", "start"]
