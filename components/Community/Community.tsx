import Image from "next/image";
import community from "../../public/images/community_cleanup.png";
import styles from "./Community.module.css";
import { Button } from "react-bootstrap";
export const Community = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Text}>
        <div className={styles.Tittle}>Join the Community</div>
        <div className={styles.Content}>
          We have a large scale group to support easth other in this game. Join
          ua to get the news as soon as possible and follow our latest
          announcements
        </div>
        <div className={styles.button}>
          <Button variant="success">Join Our Community</Button>
        </div>
      </div>
    </div>
  );
};
