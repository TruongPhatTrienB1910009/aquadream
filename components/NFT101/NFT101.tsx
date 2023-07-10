import { Button, Card } from "react-bootstrap";
import styles from "./NFT101.module.css";
import imageIcon from "../../public/images/TopCollection/iconName.png";
import iconFish from "../../public/images/TopCollection/iconFish.png";
import iconCat from "../../public/images/TopCollection/iconCat.png";
import iconLinh from "../../public/images/TopCollection/iconLinh.png";
import iconMask from "../../public/images/TopCollection/iconMask.png";
import Image from "next/image";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
export const NFT101 = () => {
  const nfts101 = [
    {
      url: imageIcon.src,
      title: "What is an NFT?",
    },
    {
      url: iconFish.src,
      title: "How to buy an NFT?",
    },
    {
      url: iconCat.src,
      title: "What is minting?",
    },
    {
      url: iconLinh.src,
      title: "How to stay protected in web3?",
    },
    {
      url: iconMask.src,
      title: "How to create an NFT on OpenSea?",
    },
  ];
  return (
    <div className={styles.Container}>
      <div className={styles.nftTittleTop}>
        <div className={styles.nftTittle}>NFT 101</div>
        <div>
          {" "}
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
      <div className={styles.nftCard}>
        {nfts101.map((nft101, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              display: "flex",
              flexWrap: "wrap",
              width: "18%",
            }}
          >
            <Card
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "5%",
                width: "100%",
              }}
            >
              <div style={{ display: "flex" }}>
                <Card.Img
                  src={nft101.url}
                  alt="green iguana"
                  style={{
                    padding: "7% 7% 0 7%",
                    borderRadius: "10%",
                  }}
                />
              </div>
              <Card.Body>
                <div className={styles.nftQuestion}>{nft101.title}</div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
