FROM --platform=linux/amd64 openjdk:21
LABEL authors="robertstolz"
EXPOSE 8080
COPY backend/target/restaurantfinderRS.jar restaurantfinderRS.jar
ENTRYPOINT ["java", "-jar", "restaurantfinderRS.jar"]