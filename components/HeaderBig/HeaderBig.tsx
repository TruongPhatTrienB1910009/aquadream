import styles from "./HeaderBig.module.css";
import Image from "next/image";
import ParrotImage from "../../public/images/Navbar/vetAndFire.png";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const slideImages = [
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
  },
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
  },
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
  },
];

export const HeaderBig = () => {
  return (
    <div style={{ position: "sticky" }}>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index} className={styles.headerBigContainer}>
            <div className={styles.headerBig}>
              <div className={styles.headerBigText}>
                <span>{slideImage.caption}</span>
              </div>
              <div className={styles.headerMinText}>
                <span>
                  Buy and sell NETs from the world&rsquo;s artists. More than
                  1000 premium digital artworks are aviable to be your&rsquo;s
                </span>
              </div>
              <div className={styles.headerBigButton}></div>
            </div>
            <div className={styles.headerMin}>
              <Image
                width={500}
                height={500}
                src={slideImage.url}
                className={styles.headerParrotImage}
                alt="Parrot image"
              />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
// const buttonStyle = {
//   width: "30px",
//   background: "none",
//   border: "0px",
// };
// const properties = {
//   prevArrow: (
//     <button style={{ ...buttonStyle, marginRight: "20px" }}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         height="1.5em"
//         viewBox="0 0 448 512"
//       >
//         <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
//       </svg>
//     </button>
//   ),
//   nextArrow: (
//     <button style={{ ...buttonStyle }}>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         height="1.5em"
//         viewBox="0 0 448 512"
//       >
//         <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
//       </svg>
//     </button>
//   ),
// };
