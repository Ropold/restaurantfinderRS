package reacp.model;

public record RestaurantModel(
        String id,
        String name,
        String city,
        String category,
        String description,
        WishlistStatus status
) {
}
