import {Restaurant} from "./Restaurant.ts";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {WishlistStatus} from "./WishlistStatus.ts";
import SearchBar from "./SearchBar.tsx";
import "./Home.css"
import RestaurantCard from "./RestaurantCard.tsx";
import {useNavigate} from "react-router-dom";


export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [editingRestaurantId, setEditingRestaurantId] = useState<string | null>(null);
    const [editData, setEditData] = useState<{ [key: string]: string }>({});


    const navigate = useNavigate();

    const fetchRestaurants = useCallback(() => {
        axios
            .get("api/restaurant")
            .then((response) => setRestaurants(response.data))
            .catch((error) => console.error("Error fetching restaurants:", error));
    }, []);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    const handleViewDetails = (id: string) => {
        navigate(`/restaurant/${id}`);
    };

    const handleDelete = (id: string) => {
        console.log("Deleting restaurant with ID:", id);
        axios
            .delete(`/api/restaurant/${id}`)
            .then(() => {
                setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting restaurant:", error);
            });
    };

    const handleToggleWishlist = (id: string) => {
        const restaurant = restaurants.find((r) => r.id === id);
        if (!restaurant) return;

        const updatedStatus: WishlistStatus =
            restaurant.status === "ON_WISHLIST" ? "NOT_ON_WISHLIST" : "ON_WISHLIST";

        const updatedRestaurant = { ...restaurant, status: updatedStatus };

        axios
            .put(`/api/restaurant/${id}`, updatedRestaurant)
            .then((response) => {
                setRestaurants((prevRestaurants) =>
                    prevRestaurants.map((r) => (r.id === id ? response.data : r))
                );
            })
            .catch((error) => console.error("Error updating wishlist status:", error));
    };

    const handleEditToggle = (id: string) => {
        setEditingRestaurantId(id);
        const restaurantToEdit = restaurants.find((restaurant) => restaurant.id === id);
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
        const updatedRestaurant = { ...restaurants.find((r) => r.id === id), ...editData };
        axios
            .put(`/api/restaurant/${id}`, updatedRestaurant)
            .then((response) => {
                setRestaurants((prevRestaurants) =>
                    prevRestaurants.map((r) => (r.id === id ? response.data : r))
                );
                setEditingRestaurantId(null);
            })
            .catch((error) => console.error("Error saving restaurant edits:", error));
    };


    return (
        <div className="page">
            <h1>Restaurants</h1>
            <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                restaurants={restaurants}
                setFilteredRestaurants={setFilteredRestaurants}
            />
            <div className="restaurant-list">
                {filteredRestaurants.map((restaurant) => (
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
        </div>
    );
}