FROM node:lts-alpine

# Set the environment to production
ENV NODE_ENV=development

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and other related files
COPY package.json package-lock.json tsconfig.json ./
# RUN npm ci
# Install dependencies including 'ts-node'
# Ensure that 'ts-node' is listed in your package.json under 'dependencies' or 'devDependencies'
RUN npm install
RUN npm install ts-node --save-dev
RUN npm install typescript --save-dev

# Copy the rest of the application
COPY . .
# Compile TypeScript
# RUN tsc

# Expose the port the app runs on
EXPOSE 5000

# Change ownership to non-root user for security
RUN chown -R node /usr/src/app

# Use non-root user to run the app
USER node

# Start the application
CMD ["npm", "run", "server"]
