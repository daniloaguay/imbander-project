import React, { useState, useEffect } from "react";
import styles from "../styles/button.module.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { IconButton } from "@mui/material";
import { db, collection } from "../firebase/firebase";

function BotonesSwipe() {
  return (
    <div className={styles.botonesSwipe}>
      <IconButton className={styles.botonesSwipe__replay}>
        <ReplayIcon />
      </IconButton>

      <IconButton className={styles.botonesSwipe__close}>
        <CloseIcon />
      </IconButton>

      <IconButton className={styles.botonesSwipe__star}>
        <StarIcon />
      </IconButton>

      <IconButton className={styles.botonesSwipe__fav}>
        <FavoriteIcon />
      </IconButton>

      <IconButton className={styles.botonesSwipe__flash}>
        <FlashOnIcon />
      </IconButton>
    </div>
  );
}

export default BotonesSwipe;
