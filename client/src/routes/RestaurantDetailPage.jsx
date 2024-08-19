import React, { useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../component/StarRating";
import Reviews from "../component/Reviews";
import AddReview from "../component/AddReview";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  const fetchRestaurantData = useCallback(async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [id, setSelectedRestaurant]);

  useEffect(() => {
    fetchRestaurantData();
  }, [fetchRestaurantData]);

  const handleReviewSubmit = async () => {
    await fetchRestaurantData(); // Fetch data again to update reviews
  };

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview onSubmit={handleReviewSubmit} />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
