# Use a base image containing Java runtime
FROM eclipse-temurin:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot jar file into the

COPY target/ToiYeuIt.jar /app/ToiYeuIt.jar

# Expose the port that the Spring Boot application runs on
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/ToiYeuIt.jar"]
