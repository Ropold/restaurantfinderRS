import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Restaurant } from "./Restaurant";
import RestaurantCard from "./RestaurantCard";
import { WishlistStatus } from "./WishlistStatus";
import { useNavigate } from "react-router-dom";

export default function WishList() {
    const [wishlistRestaurants, setWishlistRestaurants] = useState<Restaurant[]>([]);
    const [editingRestaurantId, setEditingRestaurantId] = useState<string | null>(null);
    const [editData, setEditData] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const fetchWishlistRestaurants = useCallback(() => {
        axios
            .get("api/restaurant")
            .then((response) => {
                const onWishlist = response.data.filter((restaurant: Restaurant) => restaurant.status === "ON_WISHLIST");
                setWishlistRestaurants(onWishlist);
            })
            .catch((error) => console.error("Error fetching wishlist restaurants:", error));
    }, []);

    useEffect(() => {
        fetchWishlistRestaurants();
    }, [fetchWishlistRestaurants]);

    const handleViewDetails = (id: string) => {
        navigate(`/restaurant/${id}`);
    };

    const handleDelete = (id: string) => {
        console.log("delete", id);
        axios
            .delete(`/api/restaurant/${id}`)
            .then(() => {
                setWishlistRestaurants((prevRestaurants) =>
                    prevRestaurants.filter((restaurant) => restaurant.id !== id)
                );
                fetchWishlistRestaurants();
            })
            .catch((error) => {
                console.error("Error deleting restaurant:", error);
            });
    };

    const handleToggleWishlist = (id: string) => {
        const restaurant = wishlistRestaurants.find((r) => r.id === id);
        if (!restaurant) return;

        const updatedStatus: WishlistStatus =
            restaurant.status === "ON_WISHLIST" ? "NOT_ON_WISHLIST" : "ON_WISHLIST";

        const updatedRestaurant = { ...restaurant, status: updatedStatus };

        axios
            .put(`/api/restaurant/${id}`, updatedRestaurant)
            .then((response) => {
                setWishlistRestaurants((prevRestaurants) =>
                    prevRestaurants.map((r) => (r.id === id ? response.data : r))
                );
                fetchWishlistRestaurants();
            })
            .catch((error) => console.error("Error updating wishlist status:", error));
    };

    const handleEditToggle = (id: string) => {
        setEditingRestaurantId(id);
        const restaurantToEdit = wishlistRestaurants.find((restaurant) => restaurant.id === id);
        if (restaurantToEdit) {
            setEditData({
                name: restaurantToEdit.name,
                city: restaurantToEdit.city,
                category: restaurantToEdit.category,
                description: restaurantToEdit.description,
            });
        }
    };

    const handleEditChange = (field: string, value: string) => {
        setEditData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSaveEdit = (id: string) => {
        const updatedRestaurant = { ...wishlistRestaurants.find((r) => r.id === id), ...editData };
        axios
            .put(`/api/restaurant/${id}`, updatedRestaurant)
            .then((response) => {
                setWishlistRestaurants((prevRestaurants) =>
                    prevRestaurants.map((r) => (r.id === id ? response.data : r))
                );
                setEditingRestaurantId(null);
            })
            .catch((error) => console.error("Error saving restaurant edits:", error));
    };

    return (
        <div className="wishlist-container">
            <h2>WishList</h2>
            {wishlistRestaurants.length === 0 ? (
                <p>No restaurants on your wishlist yet.</p>
            ) : (
                <div className="restaurant-list">
                    {wishlistRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            onViewDetails={handleViewDetails}
                            onDelete={handleDelete}
                            onToggleWishlist={handleToggleWishlist}
                            onEditToggle={() => handleEditToggle(restaurant.id)}
                            isEditing={editingRestaurantId === restaurant.id}
                            editData={editData}
                            onEditChange={handleEditChange}
                            onSaveEdit={() => handleSaveEdit(restaurant.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
