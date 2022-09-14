// styles:
import styles from "../components/css/Card.module.css";

export default function DateContainer({ start, finish }) {
  return (
    <svg
      className={styles.books}
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 0 43.052 20.209"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(-69.558 -82.606)"
        className={styles["testing-element"]}
      >
        <g
          transform="translate(-61.897 32.823)"
          stroke="#000"
          strokeWidth="0.13229"
        >
          <path
            className={styles["testing-element"]}
            d="m140.66 64.461v-4.3758h-6.8059v-5.992h11.138v-4.2433h22.425v4.2433h7.0261v5.992h-9.6423v4.3758h8.0978v5.4662h-41.375v-5.4662z"
            fill="#b27e43"
          />
          <g fill="none">
            <path d="m144.99 54.093h11.38" />
            <path d="m167.41 54.093h-3.7712" />
            <path d="m148.69 64.328h16.105" />
            <path d="m140.66 64.461h2.0677" />
            <path d="m138.66 60.085h13.397" />
            <path d="m160.24 60.085h14.205" />
          </g>
        </g>
      </g>
      <text
        className={`${styles["date-value"]} ${styles.starter}`}
        id="start-date"
        fontFamily="Dosis, sans-serif;"
        fontSize="4"
        letterSpacing="0.7"
        fill="#F0F1F2"
      >
        <tspan x="0" y="10">
          {start}
        </tspan>
      </text>
    </svg>
  );
}
