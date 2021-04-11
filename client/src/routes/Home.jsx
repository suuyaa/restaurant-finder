import React from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import AddRestaurant from "../components/AddRestaurant";

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
