import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();
  const showMenu = () => {
    document
      .querySelector("#dropdown")
      ?.classList.toggle(`${styles.showDropdowMenu}`);
    document.querySelector("#svgIcon")?.classList.toggle(`${styles.svgRotate}`);
  };
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ color: "black" }}>
              <FontAwesomeIcon
                icon={faEthereum}
                style={{
                  padding: "10px 15px 10px 15px",
                  backgroundColor: "#c0ff3e",
                  borderRadius: "10px",
                  fontSize: "25px",
                }}
              />
            </Link>
            <Link href="/" style={{ textDecoration: "none" }}>
              <span className={styles.navbarTittleNfts}>AquaDream</span>
            </Link>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                padding: "10px 15px 10px 15px",
                backgroundColor: "#e3e5e8",
                borderRadius: "50%",
                WebkitBorderRadius: "50%",
                MozBorderRadius: "50%",
                fontSize: "20px",
                fontWeight: "100",
                marginRight: '1rem'
              }}
            />

            <div className={styles.navMiddle}>
              <Link href="/buy" className={styles.link}>
                Buy
              </Link>
              <Link href="/sell" className={styles.link}>
                Sell
              </Link>
              <Link href="/minigame" style={{}} className={styles.link}>
                Mini Game
              </Link>
            </div>
          </div>

          <div className={styles.dropDownMenu}>
            <div className={styles.dropdown}>
              <span onClick={() => showMenu()} className={styles.menuText}>
                <FontAwesomeIcon
                  style={{ fontSize: "2em", color: "#dad7d7" }}
                  icon={faBars}
                />
              </span>
              <div id="dropdown" className={styles.dropdown_content}>
                <Link href="/buy" className={styles.link}>
                  Buy
                </Link>
                <Link href="/sell" className={styles.link}>
                  Sell
                </Link>
                <Link href="/minigame" className={styles.link}>
                  Mini Game
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet
              style={{ backgroundColor: "black", color: "white" }}
              theme="dark"
              btnTitle="Connect Wallet"
            />
          </div>
          {address ? (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
}
