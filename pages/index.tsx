import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {TopSeller} from "../components/TopSeller/TopSeller"
import { HeaderBig } from "../components/HeaderBig/HeaderBig";
import { TopCollection } from "../components/TopCollection/TopCollection";
import { TopCreator } from "../components/TopCreator/TopCreator";
const Home: NextPage = () => {
  return (
    <>
      <HeaderBig />
      <TopCollection />
      <TopSeller/>
      <TopCreator/>
    </>
  );
};

export default Home;
