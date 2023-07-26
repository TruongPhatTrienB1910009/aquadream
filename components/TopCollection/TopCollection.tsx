import styles from "./TopCollection.module.css";
import imageIcon from "../../public/images/TopCollection/iconName.png";
import iconFish from "../../public/images/TopCollection/iconFish.png";
import iconCat from "../../public/images/TopCollection/iconCat.png";
import iconLinh from "../../public/images/TopCollection/iconLinh.png";
import iconMask from "../../public/images/TopCollection/iconMask.png";
import iconMusk from "../../public/images/TopCollection/iconMusk.png";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
export const TopCollection = () => {
  const [maxSize, setMaxSize] = useState({ width: 0, height: 0 });
  const [slidesCount, setslidesCount] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      setMaxSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the handler initially to set the initial size
    handleResize();
    if (maxSize.width < 500) setslidesCount(3);
    else setslidesCount(6);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxSize.width, slidesCount]);
  const topCollections = [
    {
      url: imageIcon.src,
      caption: "Elon Musk",
      color: "red",
    },
    {
      url: iconFish.src,
      caption: "Putin",
      color: "navy",
    },
    {
      url: iconCat.src,
      caption: "Biden",
      color: "lime",
    },
    {
      url: iconLinh.src,
      caption: "John",
      color: "silver",
    },
    {
      url: iconMask.src,
      caption: "The Rock",
      color: "yellow",
    },
    {
      url: iconMusk.src,
      caption: "Tomato",
      color: "green",
    },
    {
      url: imageIcon.src,
      caption: "david",
      color: "blue",
    },
  ];

  return (
    <div
      className={styles.topCollectionContainer}
      style={{ position: "sticky" }}
    >
      <div className={styles.topCollectionTittle}>Categories</div>
      <Slide
        slidesToScroll={slidesCount}
        slidesToShow={slidesCount}
        indicators={false}

      >
        {topCollections?.map((topCollection, index) => (
          <div key={index} className={styles.card}>
            <Card
              style={{
                cursor: "pointer",
                backgroundColor: "#f7f7f7",
                borderRadius: "5%",
              }}
            >
              <Card.Img
                src={topCollection.url}
                alt="green iguana"
                style={{ padding: "13px", borderRadius: "15%" }}
              />
              <div className={styles.topCollectionName}>
                {topCollection.caption}
              </div>
            </Card>
          </div>
        ))}
      </Slide>
    </div>
  );
};
