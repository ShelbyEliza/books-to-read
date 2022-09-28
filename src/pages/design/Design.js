// styles:
import styles from "./Design.module.css";

const colorList = [
  { "primary-accent": "#d69554" },
  { "lightest-primary-bg": "#edd2d4" },
  { "light-primary-bg": "#7b4e51" },
  { "dark-primary-bg": "#513738" },
  { "light-primary-accent": "#ffcf9e" },
  { foilage: "#90b788ff" },
  { "primary-bg": "#663c3f" },
  { "secondary-bg": "#421422" },
];

const fontList = [
  { "font-family": "'Inknut Antiqua', serif" },
  { "font-family": "'Josefin Slab', serif" },
  { "font-family": "'Dosis', sans-serif" },
  { "font-family": "'Rajdhani' sans-serif" },
  { "font-family": "'Lora', serif" },
];

export default function Design() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Design Guide</h1>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>Page Structure</h2>
          <h3>Heading H1</h3>
          <p>top-margin 32px</p>
          <p>font-size: 2em</p>
          <p>padding: 24px</p>
          <p>font-family: "Inknut Antiqua", serif</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>Colors</h2>
          {colorList.map((color) => {
            let colorName = Object.keys(color);
            let colorID = Object.values(color);
            return (
              <div key={colorName} className={styles.colors}>
                <p
                  className={styles["color-square"]}
                  style={{
                    background: `var(--${colorName})`,
                    color: `var(--${colorName})`,
                    borderBottom: `1px solid var(--${colorName})`,
                  }}
                >
                  COLOR
                </p>
                <div className={styles["color-details"]}>
                  <p className={styles["color-name"]}>{colorName} </p>
                  <p className={styles["color-ID"]}>{colorID}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.section}>
          <h2 className={styles["section-title"]}>Fonts</h2>
          <div className={styles.fonts}>
            {fontList.map((font) => {
              let fontID = Object.values(font);
              return (
                <div
                  key={fontID}
                  className={styles["font-name"]}
                  style={{
                    fontFamily: fontID,
                  }}
                >
                  <h1
                    style={{
                      fontFamily: fontID,
                    }}
                  >
                    {fontID}
                  </h1>
                  <p className={styles["font-paragraph"]}>
                    He did not move. He was still as the rocks themselves.
                    Stillness spread out from him, like rings from a stone
                    dropped in the water. His silence became not absence of
                    speech, but a thing in itself, like the silence of the
                    desert.
                  </p>
                </div>
              );
            })}
          </div>
          {/* <ul className={styles.list}>
            <li className={styles["li-1"]}>Banner Title</li>
            <li className={styles["li-1"]}>Page Titles</li>
            <li className={styles["li-1"]}>
              Cards
              <ul className={styles.list}>
                <li className={styles["li-2"]}>Book Title</li>
                <li className={styles["li-2"]}>Author</li>
                <li className={styles["li-2"]}>Content</li>
              </ul>
            </li>
            <li className={styles["li-1"]}>Error</li>
            <li className={styles["li-1"]}>Navbar</li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}
