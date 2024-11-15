import React from "react";
import "./SearchBar.css";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    restaurants: any[];
    setFilteredRestaurants: (restaurants: any[]) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
      value,
      onChange,
      restaurants,
      setFilteredRestaurants,}) => {
    const [filterType, setFilterType] = React.useState<string>("name");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    React.useEffect(() => {
        const filtered = restaurants.filter((restaurant) => {
            const searchLower = value.toLowerCase();
            switch (filterType) {
                case "name":
                    return restaurant.name.toLowerCase().includes(searchLower);
                case "city":
                    return restaurant.city.toLowerCase().includes(searchLower);
                case "category":
                    return restaurant.category.toLowerCase().includes(searchLower);
                default:
                    return true;
            }
        });
        setFilteredRestaurants(filtered);
    }, [value, filterType, restaurants, setFilteredRestaurants]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Suche nach Restaurant..."
                value={value}
                onChange={handleInputChange}
            />
            <div className="filter-buttons">
                <button
                    onClick={() => setFilterType("name")}
                    className={filterType === "name" ? "active" : ""}
                >
                    Name
                </button>
                <button
                    onClick={() => setFilterType("city")}
                    className={filterType === "city" ? "active" : ""}
                >
                    City
                </button>
                <button
                    onClick={() => setFilterType("category")}
                    className={filterType === "category" ? "active" : ""}
                >
                    Category
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
