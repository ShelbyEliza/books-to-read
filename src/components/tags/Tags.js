const tagList = [
  "Sci-fi",
  "Informative",
  "Short-Story",
  "Biography",
  "Comedy",
  "Fantasy",
  "Fiction",
  "Non-Fiction",
  "Classical",
  "Horror",
];

export default function Tags({ handleTags }) {
  return (
    <div className="form-row-full">
      <fieldset>
        <legend>Tags</legend>
        {tagList.map((tag) => {
          return (
            <div key={tag.toLowerCase()} className="tag-option">
              <input
                type="checkbox"
                id={tag.toLowerCase()}
                name="tags"
                onChange={(e) => handleTags(e)}
                value={tag}
              />
              <label htmlFor={tag.toLowerCase()}>{tag}</label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
