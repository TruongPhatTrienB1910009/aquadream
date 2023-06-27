import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  const showMenu = () => {
    document.querySelector("#dropdown")?.classList.toggle(`${styles.showDropdowMenu}`)
    document.querySelector("#svgIcon")?.classList.toggle(`${styles.svgRotate}`)
  }

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/images/logo.png"
              width={54}
              height={54}
              alt="NFT marketplace logo"
            />
          </Link>

          <div className={styles.navMiddle}>
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

          <div className={styles.dropDownMenu}>
            <div className={styles.dropdown}>
              <span onClick={() => showMenu()} className={styles.menuText}>
                Menu
              </span>
              <span className={styles.dropdownIcon}>
                <svg id="svgIcon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><style>{`svg{fill:#e7ebf3}`}</style><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
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
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div >
  );
}
