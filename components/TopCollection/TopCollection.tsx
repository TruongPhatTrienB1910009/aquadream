import styles from "./TopCollection.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import imageIcon from "../../public/images/TopCollection/iconName.png";
import iconFish from "../../public/images/TopCollection/iconFish.png"
import iconCat from "../../public/images/TopCollection/iconCat.png"
import iconLinh from "../../public/images/TopCollection/iconLinh.png"
import iconMask from "../../public/images/TopCollection/iconMask.png"
import iconMusk from "../../public/images/TopCollection/iconMusk.png"

import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
export const TopCollection = () => {
  const topCollections = [
    {
      url: imageIcon.src,
      caption: "Elon Musk",
      color: "red",
    },
    {
      url: iconFish.src,
      caption: "Putin",
      color: "navy",
    },
    {
      url: iconCat.src,
      caption: "Biden",
      color: "lime",
    },
    {
      url: iconLinh.src,
      caption: "John",
      color: "silver",
    },
    {
      url: iconMask.src,
      caption: "The Rock",
      color: "yellow",
    },
    {
      url: iconMusk.src,
      caption: "Tomato",
      color: "green",
    },
    {
      url: imageIcon.src,
      caption: "david",
      color: "blue",
    },
  ];
  return (
    <div className={styles.topCollectionContainer}>
      <div className={styles.topCollectionTittle}>Top Collection</div>
      <Slide
       slidesToScroll={6} slidesToShow={6} indicators={true}
      >
        {topCollections.map((topCollection, index) => (
          <div key={index}>
            <Card
              style={{ backgroundColor: "#f7f7f7", borderRadius: '5%' }}
              sx={{ maxWidth: 150, maxHeight: 250 }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  width="50"
                  src={topCollection.url}
                  alt="green iguana"
                  style={{ padding: "13px", borderRadius: "15%" }}
                />
                <CardContent>
                  <Typography
                    className={styles.topCollectionName}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {topCollection.caption}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Slide>
    </div>
  );
};
