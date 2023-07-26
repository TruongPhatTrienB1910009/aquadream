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
/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbart() {
  const address = useAddress();

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
              <Navbar.Brand href="/">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEthereum}
                    style={{
                      padding: "10px 15px 10px 15px",
                      backgroundColor: "#c0ff3e",
                      borderRadius: "10px",
                      fontSize: "25px",
                    }}
                  />
                  <span className={styles.navbarTittleNfts}>AquaDream</span>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-sm`}
                aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                placement="end"
                style={{ width: "75%" }}
              >
                <Offcanvas.Header closeButton className="justify-content-end">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Nav>
                      <Nav.Link href="/">
                      <FontAwesomeIcon
                        icon={faEthereum}
                        style={{
                          padding: "10px 15px 10px 15px",
                          backgroundColor: "#c0ff3e",
                          borderRadius: "10px",
                          fontSize: "25px",
                        }}
                      />
                      <span className={styles.navbarTittleNfts}>AquaDream</span>
                      </Nav.Link>
                    </Nav>
                  </div>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles.headerCenter}>
                  <Nav className="justify-content-start flex-grow-1 pe-3">
                    <Nav.Link
                      style={{
                        color: "black",
                        fontWeight: "550",
                        fontSize: "20px",
                      }}
                      href="/buy"
                    >
                      <div className={styles.headerLink}>
                        <div className={styles.headerIcon}>
                          <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <span>Buy</span>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      style={{
                        color: "black",
                        fontWeight: "550",
                        fontSize: "20px",
                      }}
                      href="/sell"
                    >
                      <div className={styles.headerLink}>
                        <div className={styles.headerIcon}>
                          <FontAwesomeIcon icon={faShop} />
                        </div>
                        <span>Sell</span>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      style={{
                        color: "black",
                        fontWeight: "550",
                        fontSize: "20px",
                      }}
                      href="/minigame"
                    >
                      <div className={styles.headerLink}>
                        <div className={styles.headerIcon}>
                          <FontAwesomeIcon icon={faGamepad} />
                        </div>
                        <span>Mini Game</span>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      style={{
                        color: "black",
                        fontWeight: "550",
                        fontSize: "20px",
                      }}
                      href="/"
                      disabled
                    >
                      <div className={styles.headerLink}>
                        <div className={styles.headerIcon}>
                          <FontAwesomeIcon icon={faGamepad} />
                        </div>
                        <span>Launchpad</span>
                        <div className={styles.headerSoon}>(SOON)</div>
                      </div>
                    </Nav.Link>
                  </Nav>

                  <div className={styles.navRight}>
                    <div className={styles.navRewards}>
                      <Image src={reward} alt="reward" width={42} height={42} />
                      <div>Rewards</div>
                      <div className={styles.headerSoon}>(SOON)</div>
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
