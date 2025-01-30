FROM maven:3.8-openjdk-17 AS builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN mvn dependency:go-offline
COPY ./src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine AS final
WORKDIR /opt/app
EXPOSE 8080
COPY --from=builder /opt/app/target/*.jar app.jar
USER 185
ENTRYPOINT ["java", "-jar", "app.jar"]