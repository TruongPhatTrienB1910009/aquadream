/* eslint-disable @next/next/no-img-element */
import styles from "./TopSeller.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import cat from "../../public/images/TopSeller/cat.png";
import wolf from "../../public/images/TopSeller/wolf.png";
import people from "../../public/images/TopSeller/people.png";
import big3 from "../../public/images/TopCreator/big-3.png";
import big4 from "../../public/images/TopCreator/big-4.png";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper/modules";
import { useState } from "react";
export const TopSeller = () => {
  const topSellers = [
    {
      url: cat.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge1",
      information: {
        hightestSale: "984.3",
        floorPrice: "464.3",
        marketCap: "397",
        items: "7.7",
        owners: "5.2",
        totalValue: "67",
      },
    },
    {
      url: wolf.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge2",
      information: {
        hightestSale: "844.3",
        floorPrice: "484.3",
        marketCap: "97",
        items: "7.7",
        owners: "5.2",
        totalValue: "778",
      },
    },
    {
      url: people.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge3",
      information: {
        hightestSale: "484.3",
        floorPrice: "449.3",
        marketCap: "87",
        items: "7.7",
        owners: "5.2",
        totalValue: "784",
      },
    },
    {
      url: big3.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge2",
      information: {
        hightestSale: "494.3",
        floorPrice: "404.3",
        marketCap: "7",
        items: "7.7",
        owners: "5.2",
        totalValue: "784",
      },
    },
    {
      url: big4.src,
      tittle: "Discover Digital Art Collect",
      id: "iamge2",
      information: {
        hightestSale: "744.3",
        floorPrice: "44.3",
        marketCap: "7",
        items: "7.7",
        owners: "5.2",
        totalValue: "7",
      },
    },
  ];
  const [content, setContent] = useState(topSellers[0]);
  const handleClick = () => {
    const element = document.querySelector(
      "#myElement .swiper-wrapper .swiper-slide-active"
    );
    const className = element?.className;
    const atttribute = element?.getAttribute("data-swiper-slide-index");
    if (atttribute) {
      setContent(topSellers[Number(atttribute)]);
    }
    console.log(className);
    console.log(atttribute);
  };
  return (
    <div className={styles.topSellerContainer} style={{ position: "sticky" }}>
      <div className={styles.topSellerTittle}>Top Sellers</div>
      <Row className={styles.rowsContainer}>
        <Col sm={7} className={styles.imagecontainer}>
          <Swiper
            onBeforeSlideChangeStart={() => handleClick()}
            id="myElement"
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={styles.swiper_container}
          >
            {topSellers?.map((topSeller, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={topSeller.url}
                  width={350}
                  height={400}
                  alt={topSeller.tittle}
                  style={{ borderRadius: "20px" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col sm={5} className={styles.information}>
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Highest Sale</div>
            <div className={styles.colTittle}>
              ${content.information.hightestSale}k
            </div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Floor Price</div>
            <div className={styles.colTittle}>
              ${content.information.floorPrice}k
            </div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Market Cap</div>
            <div className={styles.colTittle}>
              ${content.information.marketCap}k
            </div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Items</div>
            <div className={styles.colTittle}>
              ${content.information.items}k
            </div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Owners</div>
            <div className={styles.colTittle}>
              ${content.information.owners}k
            </div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>TOTAL VOLUME</div>
            <div className={styles.colTittle}>
              ${content.information.totalValue}k
            </div>
          </div>
          <div className={styles.colButton}>
            <Button variant="outline-success">Buy Now</Button>
            <Button variant="outline-success">Details</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
