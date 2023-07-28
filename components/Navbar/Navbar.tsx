import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGamepad,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/images/logo.png";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import reward from "../../public/images/Navbar/reward-removebg-preview.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbart() {
  const address = useAddress();
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleRouteChange = (url: String) => {
      if (typeof window !== undefined && window.screen.width <= 991.98) { // change the width value according to your navbar breakpoint
        const navbar = document.getElementById("navbar-toggler");
        if (navbar !== null && !navbar.classList.contains('collapsed')) navbar.click();
        setShowDropdown(false);
      } else
        if (typeof window !== undefined && window.screen.width > 991.98) {
          setShowDropdown(false);
        }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
  }, [router.events])
  return (
    <>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <Navbar
            style={{ width: "100%", backgroundColor: "#ececec !important" }}
            expand="xl"
            className="bg-body-tertiary"
          >
            <Container fluid>
              <Link href="/" style={{ color: "black", textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image style={{
                    marginLeft: '10px'
                  }} width={70} height={70} src={logo} alt="logo" />
                  <span className={styles.navbarTittleNfts}>AquaDream</span>
                </div>
              </Link>
              <Navbar.Toggle id="navbar-toggler" aria-controls={`offcanvasNavbar-expand-sm`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-sm`}
                aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                placement="end"
                style={{ width: "75%" }}

              >
                <Offcanvas.Header closeButton className="justify-content-space-between">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Nav>
                      <Link href="/" style={{ color: "black", textDecoration: "none", display: "flex", alignItems: "center" }}>
                        <Image style={{
                          marginLeft: '10px'
                        }} width={70} height={70} src={logo} alt="logo" />
                      </Link>
                    </Nav>
                  </div>
                </Offcanvas.Header>
                <Offcanvas.Body className={`${styles.headerCenter}`}>
                  <Nav className={`justify-content-start flex-grow-1 pe-3`}>
                    <Link
                      style={{
                        color: "black",
                        fontWeight: "550",
                        fontSize: "20px",
                        textDecoration: "none"
                      }}
                      href="/minigame"
                    >
                      <div className={styles.headerLink}>
                        <div className={styles.headerIcon}>
                          <FontAwesomeIcon icon={faGamepad} />
                        </div>
                        <span>Mini Game</span>
                      </div>
                    </Link>
                    <div style={{ display: "flex" }}>
                      <div className={styles.headerIcon} style={{ color: "black", fontSize: "22px" }}>
                        <FontAwesomeIcon icon={faCartShopping} />
                      </div>
                      <NavDropdown
                        title="Marketplace"
                        className={styles.navDropdown}
                        show={showDropdown}
                        onMouseLeave={() => setShowDropdown(false)}
                        onMouseOver={() => setShowDropdown(true)}
                        onClick={() => setShowDropdown(!showDropdown)}
                        id="dropdown-toggler"
                      >
                        <div>

                          <Link
                            className={styles.linkDropdown}
                            href="/buy"

                          >
                            <div className={styles.headerLinkDropdown}>
                              <div className={styles.headerIcon}>
                                <FontAwesomeIcon icon={faCartShopping} />
                              </div>
                              <span>Buy</span>
                            </div>
                          </Link>
                        </div>
                        <div>
                          <Link
                            className={styles.linkDropdown}
                            href="/sell"
                          >
                            <div className={styles.headerLinkDropdown}>
                              <div className={styles.headerIcon}>
                                <FontAwesomeIcon icon={faShop} />
                              </div>
                              <span>Sell</span>
                            </div>
                          </Link>
                        </div>
                      </NavDropdown>
                    </div>


                    <Link
                      style={{
                        color: "black",
                        fontWeight: "550",
                        fontSize: "20px",
                        textDecoration: "none"
                      }}
                      href="/"
                    >
                      <div className={styles.headerLink}>
                        <div className={styles.headerIcon}>
                          <FontAwesomeIcon icon={faGamepad} />
                        </div>
                        <span>INO</span>
                        <div className={styles.headerSoon}>(SOON)</div>
                      </div>
                    </Link>
                  </Nav>

                  <div className={styles.navRight}>
                    <div className={styles.navRewards}>
                      <Image src={reward} alt="reward" width={42} height={42} />
                      <div>Rewards</div>
                      <span className={styles.headerSoon}>(SOON)</span>
                    </div>
                    <div className={styles.navIconWallet}>
                      <div className={styles.navConnect}>
                        <ConnectWallet
                          style={{ backgroundColor: "black", color: "white" }}
                          theme="dark"
                          btnTitle="Connect Wallet"
                        />
                      </div>

                      {address ? (
                        <Link
                          className={styles.link}
                          href={`/profile/${address}`}
                        >
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
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </nav>
      </div>
    </>
  );
}