package reacp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reacp.model.RestaurantModel;
import reacp.services.RestaurantService;

import java.util.List;

@RestController
@RequestMapping("api/restaurant")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public List<RestaurantModel> getAllRestaurants(){
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public RestaurantModel getRestaurantById(@PathVariable String id){
        return restaurantService.getRestaurantById(id);
    }

    @PostMapping
    public RestaurantModel postRestaurant(@RequestBody RestaurantModel restaurantModel){
        return restaurantService.addRestaurant(restaurantModel);
    }

    @PostMapping("/update-all")
    public List<RestaurantModel> updateAll(@RequestBody List<RestaurantModel> restaurantModels){
        return restaurantService.updateAll(restaurantModels);
    }

    @PutMapping("/{id}")
    public RestaurantModel putRestaurant(@PathVariable String id, @RequestBody RestaurantModel restaurantModel){
        return restaurantService.updateRestaurantWithPut(id, restaurantModel);
    }

    @PatchMapping("/{id}")
    public RestaurantModel patchRestaurant(@PathVariable String id, @RequestBody RestaurantModel restaurantModel){
        return restaurantService.updateRestaurantWithPatch(id, restaurantModel);
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable String id){
        restaurantService.deleteRestaurant(id);
    }
}
