import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from "@fortawesome/free-solid-svg-icons"
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
              width={45}
              height={45}
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
                <FontAwesomeIcon style={{fontSize: '2em', color: '#dad7d7'}} icon={faBars}/>
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
          ) :<div className={styles.navConnect}>
          <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
        </div> }
        </div>
      </nav>
    </div >
  );
}
