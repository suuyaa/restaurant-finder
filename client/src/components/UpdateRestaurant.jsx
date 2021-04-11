import React, { useState, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useHistory, useParams } from "react-router-dom";
// import { RestaurantContext } from "../context/RestaurantContext";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  console.log(id);
  const [name, setName] = useState("");
  //   const { restaurants } = useContext(RestaurantContext);
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RestaurantFinder.put(`/${id}`, {
      name: name,
      location: location,
      price_range: priceRange,
    });
    history.push("/");
  };

  return (
    <div className='container'>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='name'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            id='location'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            type='number'
            id='price_range'
            className='form-control'
          />
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
