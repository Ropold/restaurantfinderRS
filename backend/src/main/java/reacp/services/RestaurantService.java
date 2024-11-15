package reacp.services;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reacp.model.RestaurantModel;
import reacp.repository.RestaurantRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final IdService idService;
    private final RestaurantRepo restaurantRepo;


    public List<RestaurantModel> getAllRestaurants() {
        return restaurantRepo.findAll();
    }

    public RestaurantModel getRestaurantById(String id) {
        return restaurantRepo.findById(id).orElseThrow(() -> new NoSuchElementException("No Restaurant found with Id: " + id));
    }

    public RestaurantModel addRestaurant(RestaurantModel restaurantModel) {
        RestaurantModel newRestaurantModel = new RestaurantModel(
                idService.generateRandomId(),
                restaurantModel.name(),
                restaurantModel.city(),
                restaurantModel.category(),
                restaurantModel.description(),
                restaurantModel.status()
        );
        restaurantRepo.save(newRestaurantModel);
        return restaurantRepo.findById(newRestaurantModel.id()).orElseThrow();
    }


    public List<RestaurantModel> updateAll(List<RestaurantModel> restaurantModels) {
        List<RestaurantModel> updatedAllRestaurants = new ArrayList<>();
        for(RestaurantModel restaurantModel : restaurantModels){
            RestaurantModel newRestaurantModel = new RestaurantModel(
                    idService.generateRandomId(),
                    restaurantModel.name(),
                    restaurantModel.city(),
                    restaurantModel.category(),
                    restaurantModel.description(),
                    restaurantModel.status()
            );
            restaurantRepo.save(newRestaurantModel);
            updatedAllRestaurants.add(newRestaurantModel);
        }
        return updatedAllRestaurants;
    }

    public RestaurantModel updateRestaurantWithPut(String id, RestaurantModel restaurantModel) {
        if(restaurantRepo.existsById(id)){
            RestaurantModel newRestaurantModel = new RestaurantModel(
                    id,
                    restaurantModel.name(),
                    restaurantModel.city(),
                    restaurantModel.category(),
                    restaurantModel.description(),
                    restaurantModel.status()
            );
            restaurantRepo.save(newRestaurantModel);
            return restaurantRepo.findById(newRestaurantModel.id()).orElseThrow();
        } else {
            throw new NoSuchElementException("No Restaurant found with the Put-Id:"+id);
        }
    }

    public RestaurantModel updateRestaurantWithPatch(String id, RestaurantModel restaurantModel) {
        RestaurantModel existingRestaurant = restaurantRepo.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found with the Put-Id: "+id));
        RestaurantModel updatedRestaurant = new RestaurantModel(
                existingRestaurant.id(),
                restaurantModel.name() != null ? restaurantModel.name() : existingRestaurant.name(),
                restaurantModel.city() != null ? restaurantModel.city() : existingRestaurant.city(),
                restaurantModel.category() != null ? restaurantModel.category() : existingRestaurant.category(),
                restaurantModel.description() != null ? restaurantModel.description() : existingRestaurant.description(),
                restaurantModel.status() != null ? restaurantModel.status() : existingRestaurant.status()
        );
        restaurantRepo.save(updatedRestaurant);
        return updatedRestaurant;
    }

    public void deleteRestaurant(String id) {
        restaurantRepo.deleteById(id);
    }
}
