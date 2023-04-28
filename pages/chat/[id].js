import Head from "next/head";
import styles from "../../styles/chats.module.css";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import getOtherEmail from "../../utils/getOtherEmail";
import Listchats from "../../components/chat/listchats";
import Topbar from "../../components/chat/topbar";
import Bottombar from "../../components/chat/bottombar";
import { useRef, useEffect } from "react";
import { Box, Text } from "@material-ui/core";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender !== user.email;
      return (
        <Box
          key={Math.random()}
          className={`${styles.message} ${
            sender ? styles.messageReceiver : styles.messageSender
          }`}
        >
          <text
            style={{
              wordBreak: "break-word",
              maxWidth: "450px",
            }}
          >
            {msg.text}
          </text>
        </Box>
      );
    });

  useEffect(() => {
    const scroll = () => {
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
    requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(scroll);
  }, [messages]);

  return (
    <div>
      <title>Chat Page</title>
      <link rel="icon" href="/favicon.ico" />

      <div className={styles.container}>
        <Listchats />

        <div className={styles.chat}>
          <Topbar email={getOtherEmail(chat?.users, user)} />

          <div className={styles.messagesContainer}>
            {getMessages()}
            <div ref={bottomOfChat}></div>
          </div>

          <Bottombar id={id} user={user} />
        </div>
      </div>
    </div>
  );
}
