import { useState } from "react";

const ratingList = [1, 2, 3, 4, 5];

export default function Rating({ handleRating, defaultRating }) {
  const [selectedRating, setSelectedRating] = useState(
    defaultRating ? defaultRating : null
  );

  const changeRating = (rating) => {
    setSelectedRating(rating);
    handleRating(rating);
  };

  return (
    <fieldset>
      <legend>Rating</legend>
      <div className="rating-container">
        {ratingList.map((rating) => {
          return (
            <div className="rating-option" key={rating}>
              <input
                name="rating"
                type="radio"
                id={rating}
                value={rating}
                onChange={(e) => changeRating(rating)}
                checked={rating === selectedRating ? true : false}
              />
              <label className="rating-label" htmlFor={rating}>
                {rating}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
