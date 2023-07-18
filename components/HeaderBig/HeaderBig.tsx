import styles from "./HeaderBig.module.css";
import Image from "next/image";
import ParrotImage from "../../public/images/Navbar/vetAndFire.png";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Button } from "react-bootstrap";

const slideImages = [
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
    description:
      "Buy and sell NETs from the world&rsquo;s artists. More than 1000 premium digital artworks are aviable to be your&rsquo;s",
  },
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
    description:
      "Buy and sell NETs from the world&rsquo;s artists. More than 1000 premium digital artworks are aviable to be your&rsquo;s",
  },
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
    description:
      "Buy and sell NETs from the world&rsquo;s artists. More than 1000 premium digital artworks are aviable to be your&rsquo;s",
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
                <span>{slideImage.description}</span>
              </div>
              <div className={styles.headerBigButton}>
                <Button variant="outline-success">Buy Now</Button>
                <Button variant="outline-success">See Categories</Button>
              </div>
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
