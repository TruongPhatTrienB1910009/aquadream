import styles from "./HeaderBig.module.css";
import Image from "next/image";
import ParrotImage from "../../public/images/Navbar/vetAndFire.png";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Button } from "react-bootstrap";
const slideImages = [
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFT\'s",
    description:
      `Aquadream is a place for users to trade nfts with each other, and participate in many small games if you are lucky, you will receive a series of attractive prizes.`,
  },
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
    description:
      "Buy and sell NETs from the world&rsquo;s artists. More than 1000 premium digital artworks are aviable to be your&#34s",
  },
  {
    url: ParrotImage,
    caption: "Discover Digital Art Collect and Sell your Specifice NFTs",
    description:
      "Buy and sell NETs from the world&rsquo;s artists. More than 1000 premium digital artworks are aviable to be your&#34;s",
  },
];

export const HeaderBig = () => {
  return (
    <div style={{ position: "sticky" }}>
      <div className={styles.headerBigContainer}>
            <div className={styles.headerBig}>
              <div className={styles.headerBigText}>
                <span>{slideImages[0].caption}</span>
              </div>
              <div className={styles.headerMinText}>
                <span>{slideImages[0].description}</span>
              </div>
              {/* <div className={styles.headerBigButton}>
                <Button variant="outline-success">Buy Now</Button>
                <Button variant="outline-success">See Categories</Button>
              </div> */}
            </div>
            <div className={styles.headerMin}>
              <Image
                width={500}
                height={500}
                src={slideImages[0].url}
                className={styles.headerParrotImage}
                alt="Parrot image"
              />
            </div>
          </div>
    </div>
  );
};
