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

export default function Tags({ handleTags, prevTags }) {
  return (
    <div className="form-row-full tags">
      <fieldset>
        <legend>Tags:</legend>
        {tagList.map((tag) => {
          let checked = false;
          if (prevTags && prevTags.length > 0 && prevTags.includes(tag)) {
            checked = true;
          }
          return (
            <div key={tag.toLowerCase()} className="tag-option">
              <input
                type="checkbox"
                id={tag.toLowerCase()}
                name="tags"
                onChange={(e) => handleTags(e)}
                value={tag}
                defaultChecked={checked ? "checked" : ""}
              />
              <label htmlFor={tag.toLowerCase()}>{tag}</label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
