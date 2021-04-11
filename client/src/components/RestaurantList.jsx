import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurants.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span>0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span>({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className='list-group'>
      <table className='table table-hover table-success table-striped'>
        <thead>
          <tr className='bg-primary'>
            <th className='col'>Restaurant</th>
            <th className='col'>Location</th>
            <th className='col'>Price Range</th>
            <th className='col'>Review</th>
            <th className='col'>Edit</th>
            <th className='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              console.log(restaurant);
              return (
                <tr
                  key={restaurant.id}
                  onClick={(e) => handleClick(e, restaurant.id)}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"&".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={(e) => handleUpdate(e, restaurant.id)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={(e) => handleDelete(e, restaurant.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
