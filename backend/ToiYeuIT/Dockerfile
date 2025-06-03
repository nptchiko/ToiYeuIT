
#FROM eclipse-temurin:21-alpine
#
#WORKDIR /app
#
#COPY .mvn/ .mvn
#
#COPY mvnw pom.xml ./
#
#RUN ./mvnw dependency:go-offline
#
#COPY src ./src
#
#CMD ["./mvnw", "spring-boot:run"]

FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21.0.7_6-jre-jammy

WORKDIR /app

COPY --from=build /app/target/ToiYeuIt.jar .

CMD ["java", "-jar", "ToiYeuIt.jar"]