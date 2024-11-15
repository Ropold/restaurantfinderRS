package reacp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import reacp.model.RestaurantModel;

public interface RestaurantRepo extends MongoRepository<RestaurantModel, String> {
}
