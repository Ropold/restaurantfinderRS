import {useNavigate} from "react-router-dom";


export default function NavBar() {

    const navigate = useNavigate();

    return(
        <>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/wishlist")}>Wishlist</button>
            <button onClick={() => navigate("/addrestaurant")}>Add Restaurant</button>
        </>
    );
}