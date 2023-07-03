import React from 'react'
import styles from "../Footer/Footer.module.css"
import Image from "next/image";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'


function Footer() {
    return (
        <>
            <footer className={styles.footerContainer}>
                <hr />
                <div className={styles.footerContent}>
                    <div className={styles.item} >
                        <Image
                            src="/images/logo.png"
                            width={54}
                            height={54}
                            alt="NFT marketplace logo"
                        />
                        <h2>AQUADREAM</h2>
                    </div>
                    <div className={styles.item}>
                        <a className={styles.heading_1} href="">Whitepaper</a>
                        <a href="">Smart Contract</a>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.heading_1}>Contract</span>
                        <a href="">dev@aquadream.xyz</a>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.heading_1}>
                            Follow us
                        </span>

                        <div className={styles.linkSocial}>
                            <a href='https://www.facebook.com'>
                            <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            
                            <FontAwesomeIcon icon={faDiscord}/>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer