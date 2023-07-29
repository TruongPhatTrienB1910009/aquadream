import styles from "./ExploreCategories.module.css";
import Button from "react-bootstrap/Button";
import imageIcon from "../../public/images/ExploreCategories/Tiger.jpg";
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
import Link from "next/link";
export const ExploreCategories = () => {
  const exploreCategories = [
    {
      url: imageIcon.src,
      name: "Elon Musk",
      time: "July 31, 2023 14:43:00",
      maxTotal: "10",
      totalSupply: "3",
      description: "Highest bid",
      price: "0",
      nameNft: "Tiger",
      icon: iconMusk.src,
      address: "0xDcedd87033db1BCbCA98050E14D985e53F53659e"
    },
    {
      url: iconFish.src,
      name: "Putin",
      time: "July 30, 2023 14:43:00",
      maxTotal: "7",
      totalSupply: "4",
      description: "Highest bid",
      price: "0",
      nameNft: "Dog",
      icon: iconMask.src,
      address: "0x0f713466914F138a06cDFC361D6096e41bb4EF01"
    },
    {
      url: iconCat.src,
      name: "Biden",
      time: "July 29, 2023 14:43:00",
      maxTotal: "200",
      totalSupply: "2",
      description: "Highest bid",
      nameNft: "Cat",
      price: "0",
      icon: iconLinh.src,
      address: "0xB02AA3E10E5f297061e184aD52416fFa2F73bBc0"
    },
    {
      url: iconCat.src,
      name: "Biden",
      time: "July 28, 2023 14:43:00",
      maxTotal: "200",
      totalSupply: "2",
      description: "Highest bid",
      nameNft: "Shark",
      price: "0",
      icon: iconLinh.src,
      address: "0xB02AA3E10E5f297061e184aD52416fFa2F73bBc0"
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
          <Link style={{textDecoration: 'none'}} key={index} href={`/nftcollections/${explorecategory.address}`} className={styles.topCardItems}>
            <div>
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
          </Link>
        ))}
      </div>
    </div>
  );
};
