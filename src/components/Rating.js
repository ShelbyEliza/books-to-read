// styles:
import styles from "./css/CreateAndEdit.module.css";

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
    <div className={styles["rating-container"]}>
      <fieldset>
        <legend>Rating:</legend>
        {ratingList.map((rating) => {
          return (
            <div className={styles["rating-option"]} key={rating}>
              <input
                name="rating"
                type="radio"
                id={rating}
                value={rating}
                onChange={(e) => changeRating(rating)}
                checked={rating === selectedRating ? true : false}
              />
              <label className={styles["rating-label"]} htmlFor={rating}>
                {rating}
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
