import React from "react";
import styles from "../Footer/Footer.module.css";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faEthereum,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className={styles.footerContainer}>
        {/* <hr /> */}
        <div className={styles.footerWidget}>
          {/* <div className={styles.footerRow}>
            <div className={styles.footerItemsIcon}>
              <div className={styles.footer}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link href="/" style={{ color: "black" }}>
                    <Image width={80} height={80} src={logo} alt="logo" />
                  </Link>
                </div>
                <div className={styles.footerJoinNfts}>Join NFTs Community</div>
                <div className={styles.footerIconCenter}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{
                      padding: "5px 15px 5px 15px",
                      backgroundColor: "#E8E8E8",
                      borderRadius: "10px",
                      fontSize: "20px",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faDiscord}
                    style={{
                      padding: "5px 15px 5px 15px",
                      backgroundColor: "#E8E8E8",
                      borderRadius: "10px",
                      fontSize: "20px",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.footerItems}>
              <div className={styles.footerWidget}>
                <div className={styles.footerTittle}>
                  Marketplace
                  <li>
                    <Link style={{ textDecoration: "none" }} href="/buy">
                      Buy
                    </Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: "none" }} href="/sell">
                      Sell
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div> */}
          <div className={styles.copyright}>
            <span>&copy; 2023. Aquadream. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
