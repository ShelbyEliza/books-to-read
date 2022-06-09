const ratingList = [1, 2, 3, 4, 5];

export default function Rating({ handleRating, defaultRating }) {
  return (
    <fieldset>
      <legend>Rating</legend>
      <div className="rating-container">
        {ratingList.map((rating) => {
          let checked = false;
          if (defaultRating) {
            // eslint-disable-next-line eqeqeq
            if (defaultRating == rating) {
              checked = true;
            }
          }
          return (
            <div className="rating-option" key={rating}>
              <input
                name="rating"
                type="radio"
                id={rating}
                value={rating}
                onChange={(e) => handleRating(e)}
                checked={checked ? true : false}
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
