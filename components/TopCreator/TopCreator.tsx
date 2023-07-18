/* eslint-disable jsx-a11y/alt-text */
import styles from "./TopCreator.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import iconCat from "../../public/images/TopCollection/iconCat.png";
import iconLinh from "../../public/images/TopCollection/iconLinh.png";
import iconMask from "../../public/images/TopCollection/iconMask.png";
import iconMusk from "../../public/images/TopCollection/iconMusk.png";
import big5 from "../../public/images/TopCreator/soi-big-5.png";
import big6 from "../../public/images/TopCreator/big-6.png";
import big2 from "../../public/images/TopCreator/big-2.png";
import big3 from "../../public/images/TopCreator/big-3.png";
import big4 from "../../public/images/TopCreator/big-4.png";
import mini5 from "../../public/images/TopCreator/mini-5.1.png";
import mini from "../../public/images/TopCreator/mini-5.2.png";
import mini6 from "../../public/images/TopCreator/mini-6.1.png";

import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const TopCreator = () => {
  const topCreators = [
    {
      url: big2.src,
      caption: "Elon Musk",
      mini_1: mini5.src,
      mini_2: mini.src,
    },
    {
      url: big2.src,
      caption: "Putin",
      mini_1: mini6.src,
      mini_2: mini.src,
    },
    {
      url: big3.src,
      caption: "Biden",
      mini_1: mini5.src,
      mini_2: mini.src,
    },
    {
      url: big4.src,
      caption: "John",
      mini_1: mini5.src,
      mini_2: mini.src,
    },
    {
      url: big3.src,
      caption: "The Rock adsa",
      mini_1: mini5.src,
      mini_2: mini6.src,
    },
    {
      url: big2.src,
      caption: "Tomato",
      mini_1: mini5.src,
      mini_2: mini5.src,
    },
    {
      url: big5.src,
      caption: "david",
      mini_1: mini6.src,
      mini_2: mini.src,
    },
    ,
    {
      url: big6.src,
      caption: "david",
      mini_1: mini6.src,
      mini_2: mini.src,
    },
  ];
  return (
    <div>
      <div className={styles.topCreatorContainer}>
        <div className={styles.topCreatorTittle}>Top Creator</div>
        <div className={styles.topCreatorRight}>
          <Button variant="success">See All</Button>
        </div>
      </div>
      <Row>
        {topCreators.map((topCreator, index) => (
          <Col key={index} sm={4} lg={3} style={{ display: "flex" }}>
            <Card
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "5%",
                marginBottom: "15px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex" }}>
                <Card.Img
                  src={topCreator?.url}
                  alt="green iguana"
                  style={{
                    width: "60%",
                  }}
                />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Card.Img
                    src={topCreator?.mini_1}
                    alt="green iguana"
                    style={{
                      padding: "0 0 0 15%",
                      width: "100%",
                      borderRadius: "10%",
                    }}
                  />
                  <Card.Img
                    src={topCreator?.mini_2}
                    alt="green iguana"
                    style={{
                      padding: "15% 0 0 15%",
                      width: "100%",
                      borderRadius: "10%",
                    }}
                  />
                </div>
              </div>

              <div className={styles.topCreatorIconName}>
                <Image
                  src={topCreator?.url!}
                  width={30}
                  height={30}
                  alt={topCreator?.caption!}
                  style={{ borderRadius: "50%" }}
                />
                <div className={styles.topCollectionText}>
                  {topCreator?.caption} (24)
                  <div className={styles.topCreatorStar}>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f7d447" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f7d447" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f7d447" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f7d447" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f7d447" }}
                    />
                  </div>
                </div>
                <div className={styles.totalVolume}>
                  0.000213 ETH
                  <div className={styles.nameTotal}>total volume</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
