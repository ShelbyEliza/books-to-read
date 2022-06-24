// styles:
import styles from "./Browse.module.css";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import RatingDetails from "./RatingDetails";
import TagDetails from "../tags/TagDetails";

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

const ratingList = [1, 2, 3, 4, 5];

export default function Browse() {
  const [headingIsOpen, setHeadingIsOpen] = useState("");
  const [detailsAreOpen, setDetailsAreOpen] = useState("");
  const [detailsType, setDetailsType] = useState("");

  const openMenu = (menuHeading) => {
    setHeadingIsOpen(menuHeading);
  };

  const openDetails = (option, type) => {
    console.log(option, type);
    setDetailsAreOpen(option);
    setDetailsType(type);
  };

  useEffect(() => {
    if (headingIsOpen === "Ratings" && headingIsOpen === "Tags") {
      setDetailsAreOpen("");
      setDetailsType("");
    }
  }, [headingIsOpen]);

  useEffect(() => {
    setHeadingIsOpen("standby");
    // need to figure logic so that details and type get reset!
  }, [detailsAreOpen]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Browse by... </h1>
      <div className={styles.content}>
        <div className={`${styles["first-section"]} ${styles.section}`}>
          <h3
            onClick={() => openMenu("Tags")}
            className={styles["minor-heading"]}
          >
            Tags
          </h3>
          {headingIsOpen === "Tags" && (
            <ul>
              {tagList.map((tag) => (
                <li
                  onClick={() => openDetails(tag, "tag")}
                  className={styles["list-item"]}
                  key={tag}
                >
                  {tag}
                  {/* <Link to={`/tagDetails/${tag}`}>{tag}</Link> */}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`${styles.section} ${styles.middle}`}>
          <h3 className={styles.gap}>or</h3>
        </div>
        <div className={`${styles["second-section"]} ${styles.section}`}>
          <h3
            onClick={() => openMenu("Ratings")}
            className={styles["minor-heading"]}
          >
            Ratings
          </h3>
          {headingIsOpen === "Ratings" && (
            <ul>
              {ratingList.map((rating) => {
                return (
                  <li
                    onClick={() => openDetails(rating, "rating")}
                    className={styles["list-item"]}
                    key={rating}
                  >
                    {rating}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {detailsAreOpen && detailsType && headingIsOpen === "standby" && (
        <div>
          {detailsType === "rating" && (
            <RatingDetails rating={detailsAreOpen} />
          )}

          {detailsType === "tag" && <TagDetails tag={detailsAreOpen} />}
        </div>
      )}
    </div>
  );
}
