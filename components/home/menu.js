import React, { useState } from "react";
import styles from "../../styles/Home.module.css";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import getOtherEmail from "../../utils/getOtherEmail";
import { useRouter } from "next/router";

import { Box, Avatar, IconButton, Button } from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ShieldIcon from "@mui/icons-material/Shield";
import LogoutIcon from "@mui/icons-material/Logout";
import { rgbToHex } from "@material-ui/core";

export default function Menu() {
  const [user] = useAuthState(auth);

  const [usersSnapshot, usersLoading, usersError] = useCollection(
    collection(db, "users")
  );
  const currentUser = usersSnapshot?.docs
    .find((doc) => doc.data().email === user.email)
    ?.data();

  const [showMatches, setShowMatches] = useState("matches");
  const handleButtonClick = (value) => {
    setShowMatches(value);
  };

  return (
    <Box>
      <Box className={styles.header}>
        <Box className={styles.perfil}>
          <Button>
            <Avatar
              src={user.photoURL}
              className={styles.avatar}
              sx={{ width: 35, height: 35 }}
            />
            <Box className={styles.username}>
              {currentUser ? currentUser.user_name : user.displayName}
            </Box>
          </Button>
        </Box>

        <Box className={styles.headericons}>
          <Box className={styles.headericon}>
            <IconButton sx={{ color: "white" }}>
              <FindInPageIcon />
            </IconButton>
          </Box>
          <Box className={styles.headericon}>
            <IconButton sx={{ color: "white" }}>
              <BusinessCenterIcon />
            </IconButton>
          </Box>
          <Box className={styles.headericon}>
            <IconButton sx={{ color: "white" }}>
              <ShieldIcon />
            </IconButton>
          </Box>
          <Box className={styles.headericon}>
            <IconButton sx={{ color: "white" }} onClick={() => signOut(auth)}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box className={styles.listbody}>
        <Box className={styles.bodybuttons}>
          <Button
            className={showMatches === "matches" ? "selected" : ""}
            sx={{
              textTransform: "none",
              mr: 2,
              boxShadow: showMatches === "matches" ? "0px 4px 0px 0px red" : "",
            }}
            color="inherit"
            style={{ fontWeight: "bold", fontSize: "12px" }}
            onClick={() => handleButtonClick("matches")}
          >
            Matches
          </Button>

          <Button
            className={showMatches === "messages" ? "selected" : ""}
            sx={{
              textTransform: "none",
              boxShadow:
                showMatches === "messages" ? "0px 4px 0px 0px red" : "",
            }}
            color="inherit"
            style={{ fontWeight: "bold", fontSize: "12px" }}
            onClick={() => handleButtonClick("messages")}
          >
            Mensajes
          </Button>
        </Box>

        {showMatches === "matches" && (
          <Box className={styles.containerusers}>
            <Box className={styles.buttonusers}>
              <Button style={{ width: "100%", justifyContent: "flex-start" }}>
                <Avatar className={styles.avatarusers} />
                <Box>
                  <Box className={styles.nameusers}>
                    {currentUser ? currentUser.user_name : user.displayName}
                  </Box>
                  <Box className={styles.mesajeusers}>Este es un match</Box>
                </Box>
              </Button>
            </Box>
          </Box>
        )}
        {showMatches === "messages" && (
          <Box className={styles.containerusers}>
            <Box className={styles.buttonusers}>
              <Button style={{ width: "100%", justifyContent: "flex-start" }}>
                <Avatar className={styles.avatarusers} />
                <Box>
                  <Box className={styles.nameusers}>
                    {currentUser ? currentUser.user_name : user.displayName}
                  </Box>
                  <Box className={styles.mesajeusers}>
                    Este es un mensaje muy largo que se trunca después de un
                    cierto número de caracteres
                  </Box>
                </Box>
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
