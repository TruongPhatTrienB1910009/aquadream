import styles from "./ExploreCategories.module.css";
import Button from "react-bootstrap/Button";
import imageIcon from "../../public/images/TopCollection/iconName.png";
import iconFish from "../../public/images/TopCollection/iconFish.png";
import iconCat from "../../public/images/TopCollection/iconCat.png";
import iconLinh from "../../public/images/TopCollection/iconLinh.png";
import iconMask from "../../public/images/TopCollection/iconMask.png";
import iconMusk from "../../public/images/TopCollection/iconMusk.png";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CountdownTimer = dynamic(() => import("./Time"), { ssr: false });
import Image from "next/image";
import { Card } from "react-bootstrap";
import dynamic from "next/dynamic";
export const ExploreCategories = () => {
  const exploreCategories = [
    {
      url: imageIcon.src,
      name: "Elon Musk",
      time: "July 15, 2023 14:43:00",
      maxTotal: "10",
      totalSupply: "3",
      description: "Highest bid",
      price: "2.079",
      nameNft: "Metaverse Game",
      icon: iconMusk.src,
    },
    {
      url: iconFish.src,
      name: "Putin",
      time: "July 11, 2023 14:43:00",
      maxTotal: "7",
      totalSupply: "4",
      description: "Highest bid",
      price: "2.079",
      nameNft: "Metaverse Game",
      icon: iconMask.src,
    },
    {
      url: iconCat.src,
      name: "Biden",
      time: "July 11, 2023 14:43:00",
      maxTotal: "200",
      totalSupply: "2",
      description: "Highest bid",
      nameNft: "Metaverse Game",
      price: "2.079",
      icon: iconLinh.src,
    },
    {
      url: iconCat.src,
      name: "Biden",
      time: "July 11, 2023 14:43:00",
      maxTotal: "200",
      totalSupply: "2",
      description: "Highest bid",
      nameNft: "Metaverse Game",
      price: "2.079",
      icon: iconLinh.src,
    },
  ];
  return (
    <div>
      <div className={styles.exploreContainer}>
        <div className={styles.topCreatorTittle}>Explore Categories</div>
        <div className={styles.topCreatorRight}>
          <Button variant="success">See All</Button>
        </div>
      </div>
      <div className={styles.topCreatorCard}>
        {exploreCategories.map((explorecategory, index) => (
          <div key={index} className={styles.topCardItems}>
            <Card
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "5%",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <div className={styles.exploreIconNameTop}>
                <Image
                  src={explorecategory?.url!}
                  width={70}
                  height={70}
                  alt={explorecategory?.name!}
                  style={{
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
                <div className={styles.topCollectionName}>
                  {explorecategory?.name}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Card.Img
                  src={explorecategory.url}
                  alt="green iguana"
                  style={{
                    padding: "7% 7% 0 7%",
                    borderRadius: "10%",
                  }}
                />
              </div>
              <Card.Body>
                <div className={styles.exploreCouter}>
                  <CountdownTimer targetDate={new Date(explorecategory.time)} />
                </div>
                <div className={styles.exploreTextBotton}>
                  <div>{explorecategory.nameNft}</div>
                  <div>
                    {explorecategory.totalSupply}/{explorecategory.maxTotal}
                  </div>
                </div>
                <div className={styles.exploreDescription}>
                  <Card.Text>{explorecategory.description}</Card.Text>
                </div>
                <div className={styles.explorePrice}>
                  <div className={styles.price}>
                    Bid {explorecategory.price} ETH
                  </div>
                  <Button variant="success" className={styles.priceSeeAll}>
                    See All
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
