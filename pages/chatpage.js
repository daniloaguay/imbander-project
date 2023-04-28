import React, { useEffect, useState } from "react";
import Listchats from "../components/chat/listchats";

export default function Chatpage() {

  return (
    <>
      <title>Imbander-Chats</title>
      <link rel="icon" href="/favicon.ico" />

      <Listchats />
    </>
  );
}
