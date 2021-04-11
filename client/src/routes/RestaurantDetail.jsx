import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(selectedRestaurant);
  return (
    <div>
      {selectedRestaurant && (
        <div>
          <h1 className='text-center display-1'>
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className='text-center'>
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span>
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <Reviews reviews={selectedRestaurant.reviews} />
          <AddReview />
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
