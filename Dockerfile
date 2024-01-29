# Use an official Node.js runtime as a parent image
FROM node:18

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG NEXT_PUBLIC_AUTH_API_URL
ENV NEXT_PUBLIC_AUTH_API_URL $NEXT_PUBLIC_AUTH_API_URL

ARG NEXT_PUBLIC_POSTS_API_URL
ENV NEXT_PUBLIC_POSTS_API_URL $NEXT_PUBLIC_POSTS_API_URL

ARG NEXT_PUBLIC_ADMIN_API_URL
ENV NEXT_PUBLIC_ADMIN_API_URL $NEXT_PUBLIC_ADMIN_API_URL

ARG NEXT_PUBLIC_FRONT_URL
ENV NEXT_PUBLIC_FRONT_URL $NEXT_PUBLIC_FRONT_URL

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the Next.js application
RUN NODE_ENV=$NODE_ENV npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
