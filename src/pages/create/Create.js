// styles:
import "./Create.css";

export default function Create() {
  return (
    <div>
      <h2>Create a New Blog</h2>
      <form id="create-form">
        <div className="form-row">
          <label htmlFor="bookTitle">Title:</label>

          <input
            id="bookTitle"
            name="bookTitle"
            type="text"
            required="required"
          />
        </div>

        <div className="form-row">
          <label htmlFor="author">Author:</label>

          <input id="author" name="author" type="text" required="required" />
        </div>
        <div className="form-row">
          <label htmlFor="dateStarted">Started:</label>
          <input
            id="dateStarted"
            name="dateStarted"
            type="date"
            value="2021-10-15"
            min="1992-11-16"
            max="2092-11-16"
          />
        </div>

        <div className="form-row">
          <label htmlFor="dateFinished">Finished:</label>
          <input
            id="dateFinished"
            name="dateFinished"
            type="date"
            min="1992-11-16"
            max="2092-11-16"
          />
        </div>

        <div className="form-row-full">
          <fieldset>
            <legend>Tags:</legend>
            <div className="tag-option">
              <input type="checkbox" id="sci-fi" name="tags" value="Sci-fi" />
              <label htmlFor="sci-fi">Sci-fi</label>
            </div>
            <div className="tag-option">
              <input type="checkbox" id="fantasy" name="tags" value="Fantasy" />
              <label htmlFor="fantasy">Fantasy</label>
            </div>
            <div className="tag-option">
              <input
                type="checkbox"
                id="informative"
                name="tags"
                value="Informative"
              />
              <label htmlFor="informative">Informative</label>
            </div>
            <div className="tag-option">
              <input type="checkbox" id="fiction" name="tags" value="Fiction" />
              <label htmlFor="fiction">Fiction</label>
            </div>
            <div className="tag-option">
              <input
                type="checkbox"
                id="short-story"
                name="tags"
                value="Short Story"
              />
              <label htmlFor="short-story">Short Story</label>
            </div>
            <div className="tag-option">
              <input
                type="checkbox"
                id="non-fiction"
                name="tags"
                value="Non-fiction"
              />
              <label htmlFor="non-fiction">Non-Fiction</label>
            </div>
            <div className="tag-option">
              <input
                type="checkbox"
                id="biography"
                name="tags"
                value="Biography"
              />
              <label htmlFor="biography">Biography</label>
            </div>
            <div className="tag-option">
              <input
                type="checkbox"
                id="classical"
                name="tags"
                value="Classical"
              />
              <label htmlFor="classical">Classical</label>
            </div>
            <div className="tag-option">
              <input type="checkbox" id="comedy" name="tags" value="Comedy" />
              <label htmlFor="comedy">Comedy</label>
            </div>
            <div className="tag-option">
              <input type="checkbox" id="horror" name="tags" value="Horror" />
              <label htmlFor="horror">Horror</label>
            </div>
          </fieldset>
        </div>

        <div className="form-row-full">
          <label htmlFor="blogContent">Thoughts on the Book:</label>
        </div>

        <textarea id="blogContent" name="blogContent"></textarea>
      </form>
      <button form="create-form">Post!</button>
    </div>
  );
}
