import React from "react";
import styles from "../Footer/Footer.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faEthereum,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <footer className={styles.footerContainer}>
        <hr />
        <div className={styles.footerWidget}>
          <div className={styles.footerRow}>
            <div className={styles.footerItemsIcon}>
              <div className={styles.footerWidget}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEthereum}
                    style={{
                      padding: "15px 25px 15px 25px",
                      backgroundColor: "#c0ff3e",
                      borderRadius: "10px",
                      fontSize: "40px",
                    }}
                  />
                  <span className={styles.footerTittleNfts}>AquaDream</span>
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
                  <FontAwesomeIcon
                    icon={faInstagram}
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
                    icon={faLinkedin}
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
                    icon={faGoogle}
                    style={{
                      padding: "5px 15px 5px 15px",
                      backgroundColor: "#E8E8E8",
                      borderRadius: "10px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.footerItems}>
              <div className={styles.footerWidget}>
                <span className={styles.footerTittle}>Comminucate</span>
                <ul className={styles.footerLink}>
                  <li>
                    <a>Abount</a>
                  </li>
                  <li>
                    <a>Abount</a>
                  </li>
                  <li>
                    <a>Abount</a>
                  </li>
                  <li>
                    <a>Abount</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footerItems}>
              <div className={styles.footerWidget}>
                <span className={styles.footerTittle}>Comminucate</span>
                <ul className={styles.footerLink}>
                  <li>
                    <a>Abount</a>
                  </li>
                  <li>
                    <a>Abount</a>
                  </li>
                  <li>
                    <a>Abount</a>
                  </li>
                  <li>
                    <a>Abount</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            <span>&copy; 2022 NFTs @All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
