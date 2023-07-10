/* eslint-disable jsx-a11y/alt-text */
import styles from "./TopCreator.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import imageIcon from "../../public/images/TopCollection/iconName.png";
import iconFish from "../../public/images/TopCollection/iconFish.png";
import iconCat from "../../public/images/TopCollection/iconCat.png";
import iconLinh from "../../public/images/TopCollection/iconLinh.png";
import iconMask from "../../public/images/TopCollection/iconMask.png";
import iconMusk from "../../public/images/TopCollection/iconMusk.png";
import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
export const TopCreator = () => {
  const [maxSize, setMaxSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setMaxSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the handler initially to set the initial size
    handleResize();
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const topCreators = [
    {
      url: imageIcon.src,
      caption: "Elon Musk",
    },
    {
      url: iconFish.src,
      caption: "Putin",
    },
    {
      url: iconCat.src,
      caption: "Biden",
    },
    {
      url: iconLinh.src,
      caption: "John",
    },
    {
      url: iconMask.src,
      caption: "The Rock",
    },
    {
      url: iconMusk.src,
      caption: "Tomato",
    },
    {
      url: imageIcon.src,
      caption: "david",
    },
    ,
    {
      url: imageIcon.src,
      caption: "david",
    },
  ];
  return (
    <div>
      <div>
        Max Size: {maxSize.width}px (width) x {maxSize.height}px (height)
      </div>
      <div className={styles.topCreatorContainer}>
        <div className={styles.topCreatorTittle}>Top Creator</div>
        <div className={styles.topCreatorRight}>
          <Button variant="success">See All</Button>
        </div>
      </div>
      <div className={styles.topCreatorCard}>
        {topCreators.map((topCreator, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              display: "flex",
              flexWrap: "wrap",
              width: "25%",
            }}
          >
            <Card
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "5%",
                width: "90%",
              }}
            >
              <div style={{ display: "flex" }}>
                <Card.Img
                  src={imageIcon.src}
                  alt="green iguana"
                  style={{
                    width: "60%",
                  }}
                />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Card.Img
                    src={topCreator?.url}
                    alt="green iguana"
                    style={{ padding: "0 0 0 15%", width: "100%" }}
                  />
                  <Card.Img
                    height="80"
                    width="30"
                    src={imageIcon.src}
                    alt="green iguana"
                    style={{ padding: "15% 0 0 15%", width: "100%" }}
                  />
                </div>
              </div>

              <div className={styles.topCollectionIconName}>
                <Image
                  src={topCreator?.url!}
                  width={30}
                  height={30}
                  alt={topCreator?.caption!}
                  style={{ borderRadius: "50%" }}
                />
                <div className={styles.topCollectionText}>
                  {topCreator?.caption} (24)
                </div>
              </div>
              <div className={styles.topCollectionStar}>
                <FontAwesomeIcon icon={faStar} style={{ color: "#f7d447" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f7d447" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f7d447" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f7d447" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#f7d447" }} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
