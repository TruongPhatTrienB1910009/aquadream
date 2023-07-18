/* eslint-disable @next/next/no-img-element */
import styles from "./TopSeller.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import cat from "../../public/images/TopSeller/cat.png";
import wolf from "../../public/images/TopSeller/wolf.png";
import people from "../../public/images/TopSeller/people.png";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
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
      <Row className={styles.rowsContainer}>
        <Col sm={7} className={styles.imagecontainer}>
          <Swiper
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
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={styles.swiper_container}
          >
            <SwiperSlide>
              <Image
                src={topSellers[0]?.url}
                width={400}
                height={400}
                alt={topSellers[0]?.tittle}
                style={{ borderRadius: "20px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={topSellers[1]?.url}
                width={400}
                height={400}
                alt={topSellers[1]?.tittle}
                style={{ borderRadius: "20px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={topSellers[2]?.url}
                width={400}
                height={400}
                alt={topSellers[2]?.tittle}
                style={{ borderRadius: "20px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={topSellers[0]?.url}
                width={400}
                height={400}
                alt={topSellers[0]?.tittle}
                style={{ borderRadius: "20px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={topSellers[1]?.url}
                width={400}
                height={400}
                alt={topSellers[1]?.tittle}
                style={{ borderRadius: "20px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={topSellers[2]?.url}
                width={400}
                height={400}
                alt={topSellers[2]?.tittle}
                style={{ borderRadius: "20px" }}
              />
            </SwiperSlide>
          </Swiper>
        </Col>
        <Col sm={5}>
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Highest Sale</div>
            <div className={styles.colTittle}>$443.4k</div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Floor Price</div>
            <div className={styles.colTittle}>$443.4k</div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Market Cap</div>
            <div className={styles.colTittle}>$443.4k</div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Items</div>
            <div className={styles.colTittle}>$443.4k</div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>Owners</div>
            <div className={styles.colTittle}>$443.4k</div>
          </div>
          <hr />
          <div className={styles.colContainer}>
            <div className={styles.colTittle}>TOTAL VOLUME</div>
            <div className={styles.colTittle}>$443.4k</div>
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
