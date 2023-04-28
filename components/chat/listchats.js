import React, { useState, useEffect } from "react";
import styles from "../../styles/chats.module.css";
import { Button, Avatar, IconButton } from "@material-ui/core";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import getOtherEmail from "../../utils/getOtherEmail";
import { useRouter } from "next/router";

export default function Listchats() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const [usersSnapshot, usersLoading, usersError] = useCollection(
    collection(db, "users")
  );
  const currentUser = usersSnapshot?.docs.find(
    (doc) => doc.data().email === user.email
  )?.data();
  

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Ingrese el email para iniciar un nuevo chat");
    if (!chatExists(input) && input != user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };

  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <div
          key={chat.id} // Agregar la propiedad 'key' con el valor del 'id' del chat
          className={styles.chatlist}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" />
          <text className={styles.text__typography}>
            {getOtherEmail(chat.users, user)}
          </text>
        </div>
      ));
  };  

  return (
    <div className={styles.listchats}>
      <div className={styles.hader__chats}>
        <div className={styles.chatperf}>
          <Avatar src={user.photoURL} />
          <text className={styles.text__typography}>
          {currentUser ? currentUser.user_name : user.displayName}
          </text>
        </div>
        <IconButton size="small" href="/app">
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton size="small" isRound onClick={() => signOut(auth)}>
          <LogoutIcon />
        </IconButton>
      </div>
      <Button
        variant="contained"
        color="grey"
        style={{ margin: "25px", padding: "15px" }}
        onClick={() => newChat()}
      >
        Nuevo Chat
      </Button>
      <div className={styles.contenedorchatslist}>{chatList()}</div>
    </div>
  );
}
