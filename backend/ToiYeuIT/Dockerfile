FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .  

COPY src ./src 

COPY gen_cert.sh .

RUN chmod +x gen_cert.sh && ./gen_cert.sh

ENV JAVA_TOOL_OPTIONS -Dfile.encoding=UTF8

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21.0.7_6-jre-jammy

WORKDIR /app

COPY --from=build /app/target/ToiYeuIt.jar .

ENV JAVA_TOOL_OPTIONS -Dfile.encoding=UTF8

EXPOSE 8081

CMD ["java","-jar", "ToiYeuIt.jar"]
