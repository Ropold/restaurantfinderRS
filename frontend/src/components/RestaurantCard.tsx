import { Restaurant } from "./Restaurant.ts";
import "./RestaurantCard.css";

export type RestaurantCardProps = {
    restaurant: Restaurant;
    onViewDetails: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleWishlist: (id: string) => void;
    onEditToggle: () => void;
    isEditing: boolean;
    editData: { [key: string]: string };
    onEditChange: (field: string, value: string) => void;
    onSaveEdit: () => void;
};

export default function RestaurantCard({
     restaurant,
     onViewDetails,
     onDelete,
     onToggleWishlist,
     onEditToggle,
     isEditing,
     editData,
     onEditChange,
     onSaveEdit,
     }: RestaurantCardProps) {

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this restaurant?")) {
            onDelete(id);
        }
    };


    return (
        <div key={restaurant.id} className="restaurant-card">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => onEditChange("name", e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={editData.city}
                        onChange={(e) => onEditChange("city", e.target.value)}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        value={editData.category}
                        onChange={(e) => onEditChange("category", e.target.value)}
                        placeholder="Category"
                    />
                    <input
                        type="text"
                        value={editData.description}
                        onChange={(e) => onEditChange("description", e.target.value)}
                        placeholder="Description"
                    />
                    <button onClick={onSaveEdit}>Save</button>
                    <button onClick={onEditToggle}>Cancel</button>
                </>
            ) : (
                <>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.city}</p>
                    <p>{restaurant.category}</p>
                    <p>{restaurant.description}</p>
                    <div className="restaurant-card-buttons">
                        <button id="button-details" onClick={() => onViewDetails(restaurant.id)}>Details</button>
                        <button id="button-edit" onClick={onEditToggle}>Edit</button>
                        <button id="button-delete" onClick={() => handleDelete(restaurant.id)}>Delete</button>
                        <button
                            id="button-wishlist"
                            onClick={() => onToggleWishlist(restaurant.id)}
                            style={{color: restaurant.status === "ON_WISHLIST" ? "red" : "black"}}
                        >
                            ♥
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
