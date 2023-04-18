import BotonesSwipe from "../components/botonesswipe";
import Header from "../components/header";
import Tarjetastinder from "../components/tarjetastinder";
import Head from "next/head";

export default function Index() {

  return (
    <>
    <Head>
      <title>Imbander-Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      <Header />
      <Tarjetastinder />
      <BotonesSwipe />
    </div>
    </>
  );
}
