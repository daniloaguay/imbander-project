import { useState } from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import styles from "../styles/chats.module.css";

export default function Bottombar({ id, user }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <Box
      component="form"
      style={{
        display: "flex",
        position: "fixed",
        height: "40px",
        width: "75%",
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "40px",
        flexGrow: "1",
        backgroundColor: '#e0e0e0',
      }}
      onSubmit={sendMessage}
    >
      <TextField
        type="text"
        placeholder="Escribe tu mensaje..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
        style={{
          flexGrow: 1,
          height: "30px",
          width: "100%",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          margin: "10px",
          padding: "15px",
          height: "45px",
          width: "110px",
          marginLeft: "auto",
          backgroundColor: '#39d169',
        }}
      >
        Enviar
      </Button>
    </Box>
  );
}
