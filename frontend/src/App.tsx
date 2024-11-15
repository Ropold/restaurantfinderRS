import './App.css'
import Home from "./components/Home.tsx";
import Details from "./components/Details.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WishList from "./components/WishList.tsx";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import AddRestaurant from "./components/AddRestaurant.tsx";

export default function App() {
    return (
        <>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurant/:id" element={<Details />} />
                    <Route path="/wishlist" element={<WishList />} />
                    <Route path="/addrestaurant" element={<AddRestaurant />} />
                </Routes>
                <Footer/>
            </Router>
        </>
    );
}