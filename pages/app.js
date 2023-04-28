import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import Menu from "../components/home/menu";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Index() {

  return (
    <>
      <Head>
        <title>Imbander-Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.contenedor}>
        <Box className={styles.elementoIzquierda}>
          <Menu />
        </Box>
        <Box className={styles.elementoDerecha}>
          <h1>
            Elemento de la derecha aqui se mostrara las imagenes de los perfiles
          </h1>
        </Box>
      </Box>
    </>
  );
}
