import styles from "./TopSeller.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import cat from "../../public/images/TopSeller/cat.png";
import wolf from "../../public/images/TopSeller/wolf.png";
import people from "../../public/images/TopSeller/people.png";
import Image from "next/image";
export const TopSeller = () => {
  const topSellers = [
    {
      url: cat.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge1",
      information: {
        hightestSale: "444.3",
        floorPrice: "444.3",
        marketCap: "37",
        items: "7.7",
        owners: "5.2",
        totalValue: "74",
      },
    },
    {
      url: wolf.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge2",
      information: {
        hightestSale: "444.3",
        floorPrice: "444.3",
        marketCap: "37",
        items: "7.7",
        owners: "5.2",
        totalValue: "74",
      },
    },
    {
      url: people.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge3",
      information: {
        hightestSale: "444.3",
        floorPrice: "444.3",
        marketCap: "37",
        items: "7.7",
        owners: "5.2",
        totalValue: "74",
      },
    },
  ];
  return (
    <div className={styles.topSellerContainer} style={{ position: "sticky" }}>
      <div className={styles.topSellerTittle}>Top Sellers</div>
      <Container>
        <Row>
          <Col sm={7} className={styles.imagecontainer}>
            {topSellers.map((topSeller, index) => (
              <div key={index} className={styles.topSellerImage}>
                <Image
                  src={topSeller?.url}
                  width={50}
                  height={50}
                  alt={topSeller.tittle}
                  className={`${styles[topSeller.id]} ${styles.image2}`}
                />
              </div>
            ))}
          </Col>
          <Col sm={5}>sm=4</Col>
        </Row>
      </Container>
    </div>
  );
};
