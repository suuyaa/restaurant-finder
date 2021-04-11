import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mb-4'>
      <form>
        <div className='row'>
          <div className='col'>
            <input
              type='text'
              className='form-control'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='col'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type='text'
              className='form-control'
              placeholder='location'
            />
          </div>
          <div className='col'>
            <select
              className='form-select'
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}>
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <div className='d-grid col'>
            <button
              onClick={handleSubmit}
              type='button'
              className='btn btn-primary'>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
