import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel'; // Importa FormControlLabel desde @mui/material
import Switch from '@mui/material/Switch';
import Image from 'next/image';
import styles from "../../styles/tinder.module.css";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { IconButton } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";

export default function Header({ backboton }) {
  const router = useRouter();

  return (
    <div>
      <div className={styles.header}>
        
        <IconButton href="/perfil">
          <PersonIcon className={styles.header_icon} fontSize="large" />
        </IconButton>

        <IconButton href="/app">
          <Image
            src="/logov2.png"
            className={styles.header_logo}
            alt="logo"
            width={300}
            height={100}
          />
        </IconButton>

        <IconButton href="/chatpage">
          <ChatBubbleIcon className={styles.header_icon} fontSize="large" />
        </IconButton>

        <FormControlLabel control={<Switch defaultChecked />} label="Tema" />
      </div>
    </div>
  );
}
