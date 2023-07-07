import styles from "./TopCreator.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, styled } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import Button, { ButtonProps } from "@mui/material/Button";
import imageIcon from "../../public/images/TopCollection/iconName.png";
import Image from "next/image";
export const TopCreator = () => {
  return (
    <div>
      <div className={styles.topCreatorContainer}>
        <div className={styles.topCreatorTittle}>Top Creator</div>
        <div className={styles.topCreatorRight}>
          <ColorButton>See All</ColorButton>
        </div>
      </div>
      <div>
        <div className={styles.topCreatorCard}>
        <Card
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "5%",
            marginRight: "3.5rem",
          }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
        <Card
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "5%",
            marginRight: "3.5rem",
          }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
        <Card
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "5%",
            marginRight: "3.5rem",
          }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
        <Card
          style={{ backgroundColor: "#f7f7f7", borderRadius: "5%" }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className={styles.topCreatorCard}>
        <Card
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "5%",
            marginRight: "3.5rem",
          }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
        <Card
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "5%",
            marginRight: "3.5rem",
          }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
        <Card
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "5%",
            marginRight: "3.5rem",
          }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
        <Card
          style={{ backgroundColor: "#f7f7f7", borderRadius: "5%" }}
          sx={{ maxWidth: 250, maxHeight: 350 }}
        >
          <CardActionArea style={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="160"
              width="40"
              src={imageIcon.src}
              alt="green iguana"
              style={{ padding: "0.5rem", borderRadius: "15%" }}
            />
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                width="40"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
              <CardMedia
                component="img"
                height="80"
                width="30"
                src={imageIcon.src}
                alt="green iguana"
                style={{ padding: "0.5rem", borderRadius: "15%" }}
              />
            </CardActionArea>
          </CardActionArea>
          <CardContent>
            <Typography
              className={styles.topCollectionName}
              gutterBottom
              variant="h5"
              component="div"
            >
              Dang khoa
            </Typography>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(lightGreen[400]),
  backgroundColor: lightGreen[400],
  "&:hover": {
    backgroundColor: lightGreen[700],
  },
}));
