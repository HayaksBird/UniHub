FROM node:bullseye

WORKDIR /Users/michael_shamshidov/Desktop/UniHub/node

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Set environment variables
ENV PORT=4200

# Expose port
EXPOSE 4200

# Command to start the application
CMD [ "npm", "start" ]
