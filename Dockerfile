# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy the entire current directory contents to the Nginx web directory
COPY . /usr/share/nginx/html

# Set permissions for the HTML files and directories
RUN chmod -R 755 /usr/share/nginx/html


# Expose port 80 to the outside world
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
