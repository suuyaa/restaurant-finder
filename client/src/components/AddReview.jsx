import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      history.push("/");
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              type='text'
              id='rating'
              className='custom-select form-control'
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='review'>Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              name='review'
              id='review'
              className='form-control'></textarea>
          </div>
        </div>
        <button className='btn btn-primary mt-2' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
