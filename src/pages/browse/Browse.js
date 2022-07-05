// styles:
import styles from "./Browse.module.css";

import { useLocation } from "react-router-dom";
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
  const [headingIsOpen, setHeadingIsOpen] = useState("standby");
  const [detailsAreOpen, setDetailsAreOpen] = useState("");
  const [detailsType, setDetailsType] = useState("");

  const location = useLocation();

  let locationData;

  location.state === null
    ? (locationData = false)
    : (locationData = location.state);

  const { from } = locationData;

  useEffect(() => {
    if (from) {
      setDetailsAreOpen(from);
      setDetailsType("Tags");
    }
  }, [from]);

  const openMenu = (menuHeading) => {
    setHeadingIsOpen(menuHeading);
  };

  const openDetails = (option, type) => {
    setDetailsAreOpen(option);
    setDetailsType(type);
    setHeadingIsOpen("standby");
  };

  useEffect(() => {
    if (headingIsOpen === "Ratings" && headingIsOpen === "Tags") {
      setDetailsAreOpen("");
      setDetailsType("");
    }
  }, [headingIsOpen]);

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
                  onClick={() => openDetails(tag, "Tags")}
                  className={styles["list-item"]}
                  key={tag}
                >
                  {tag}
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
      {headingIsOpen === "standby" &&
        (detailsType.length > 0 ? (
          <div>
            {detailsType === "rating" && (
              <RatingDetails rating={detailsAreOpen} />
            )}

            {detailsType === "Tags" && <TagDetails tag={detailsAreOpen} />}
          </div>
        ) : (
          <div className={styles["msg-select-category"]}>
            <p>Please choose a category above to browse from.</p>
          </div>
        ))}
    </div>
  );
}
