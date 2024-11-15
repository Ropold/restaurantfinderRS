import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRestaurant() {
    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<"ON_WISHLIST" | "NOT_ON_WISHLIST">("ON_WISHLIST");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const restaurantData = {
            name,
            city,
            category,
            description,
            status,
        };

        axios
            .post(`/api/restaurant`, restaurantData)
            .then(() => {
                navigate("/");
            })
            .catch((error) => console.error("Error adding restaurant:", error));
    };

    return (
        <div className="page">
            <h1>Add Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as "ON_WISHLIST" | "NOT_ON_WISHLIST")}>
                        <option value="ON_WISHLIST">On Wishlist</option>
                        <option value="NOT_ON_WISHLIST">Not On Wishlist</option>
                    </select>
                </div>
                <button type="submit">Add Restaurant</button>
            </form>
        </div>
    );
}
