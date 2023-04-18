import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@material-ui/core";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import firebaseManage from "../firebase/firebase_manage.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

export default function Login({ loginType }) {
  const [showRegistrer, setShowRegistrer] = useState(loginType);

  const [logEmail, setLogEmail] = React.useState("");
  const [logPass, setLogPass] = React.useState("");

  const [regName, setRegName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPass, setRegPass] = React.useState("");

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleLogin = async () => {
    if (logEmail === "" || logPass === "") {
      alert("Debe ingresar su email y contraseña");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        logEmail,
        logPass
      );
      // User is signed in.
    } catch (error) {
      console.log(error);
      alert("Error al iniciar sesión");
    }
  };

  const handleRegistration = async () => {
    if (regEmail === "" || regPass === "") {
      alert("Debe ingresar su email y contraseña");
      return;
    }

    const { user, error } = await createUserWithEmailAndPassword(
      auth,
      regName,
      regEmail,
      regPass
    );

    if (error != null) {
      console.log("error", error);
      alert("error: ", error);
    } else {
      await firebaseManage.addNewUser(user);

      var url = window.location.href;
      if (url.indexOf("?") > -1) {
        url = url.substring(0, url.indexOf("?"));
      }
      url += "?loginType=login";
      window.location.href = url;
    }
  };

  const router = useRouter();

  return (
    <div className={styles.login}>
      {showRegistrer !== "registrer" ? (
        <div>
          <ModalHeader style={{ textAlign: "center" }}>
            Iniciar sesión
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label> Email </Label>
                <Input
                  placeholder="Escribe tu email aqui"
                  type="email"
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label> Password </Label>
                <Input
                  placeholder="Escribe tu password aqui"
                  type="Password"
                  value={logPass}
                  onChange={(e) => setLogPass(e.target.value)}
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={async () => {
                  if (!logEmail || !logPass) {
                    alert(
                      "Por favor ingresa tu correo electrónico y contraseña"
                    );
                    return;
                  }
                  try {
                    const userCredential = await signInWithEmailAndPassword(
                      auth,
                      logEmail,
                      logPass
                    );
                    // User is signed in.
                    router.push("/app");
                  } catch (error) {
                    console.log(error);
                    alert("Error al iniciar sesión");
                  }
                }}
              >
                Enviar
              </Button>{" "}
              <Button onClick={() => setShowRegistrer("registrer")}>
                Registrarse
              </Button>
              {"  "}
              <IconButton
                style={{
                  backgroundColor: "#0d6efd",
                  borderRadius: "8px",
                  height: "38px",
                  width: "70px",
                  color: "white",
                }}
                onClick={() =>
                  signInWithGoogle("", { prompt: "select_account" })
                }
              >
                <GoogleIcon />
              </IconButton>
            </Form>
          </ModalBody>
        </div>
      ) : null}

      {showRegistrer === "registrer" ? (
        <div>
          <ModalHeader>Registrarse con correo</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label> Nombre de Perfil </Label>
                <Input
                  placeholder="Escribe nombre aqui"
                  type="name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label> Email </Label>
                <Input
                  placeholder="Escribe tu email aqui"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label> Password </Label>
                <Input
                  placeholder="Escribe tu password aqui"
                  type="password"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={async () => {
                  if (regPass.length < 6) {
                    alert("La contraseña debe tener al menos 6 caracteres");
                    return;
                  }
                  if (!regName || !regEmail || !regPass) {
                    alert(
                      "Por favor ingresa tu correo electrónico y contraseña"
                    );
                    return;
                  }

                  const { user, error } = await createUserWithEmailAndPassword(
                    auth,
                    regEmail,
                    regPass
                  );
                  if (error != null) {
                    console.log("error", error);
                    alert("error: ", error);
                    return;
                  }

                  // Aquí es donde se guarda el nombre de perfil en la colección users
                  await firebaseManage.addNewUser({
                    uid: user.uid,
                    name: regName,
                    email: regEmail,
                  });

                  router.push("/app");
                }}
              >
                Enviar
              </Button>{" "}
              <Button onClick={() => setShowRegistrer("login")}>
                Iniciar sesion
              </Button>{" "}
              <IconButton
                style={{
                  backgroundColor: "#0d6efd",
                  borderRadius: "8px",
                  height: "38px",
                  width: "70px",
                  color: "white",
                }}
                onClick={() =>
                  signInWithGoogle("", { prompt: "select_account" })
                }
              >
                <GoogleIcon />
              </IconButton>
            </Form>
          </ModalBody>
        </div>
      ) : null}
    </div>
  );
}
