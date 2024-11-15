import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { Restaurant } from "./Restaurant";
import MapBox from "./MapBox.tsx";

export default function Details() {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/api/restaurant/${id}`)
            .then((response) => setRestaurant(response.data))
            .catch((error) => console.error("Error fetching restaurant details:", error));
    }, [id]);

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h2>Details</h2>
            <p>Name: {restaurant.name}</p>
            <p>City: {restaurant.city}</p>
            <p>Category: {restaurant.category}</p>
            <p>Description: {restaurant.description}</p>

            <button onClick={() => navigate("/")}>Back to Home</button>
            <MapBox  />
        </>
    );
}
