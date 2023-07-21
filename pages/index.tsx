import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { TopSeller } from "../components/TopSeller/TopSeller";
import { HeaderBig } from "../components/HeaderBig/HeaderBig";
import { TopCollection } from "../components/TopCollection/TopCollection";
import { TopCreator } from "../components/TopCreator/TopCreator";
import { ExploreCategories } from "../components/ExploreCategories/ExploreCategories";
import { NFT101 } from "../components/NFT101/NFT101";
import { Community } from "../components/Community/Community";
const Home: NextPage = () => {
  return (
    <>
      <HeaderBig />
      <TopCollection />
      <TopSeller />
      <TopCreator />
      <ExploreCategories />
      <NFT101 />
      <Community />
    </>
  );
};

export default Home;
