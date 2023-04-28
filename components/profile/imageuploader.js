import Head from "next/head";
import React, { useState, useEffect } from "react";
import Login from "../login/login";
import fileManager from "../../utils/fileManager";
import firebaseAuth from "../../firebase/firebase_auth.js";
import firebaseManage from "../../firebase/firebase_manage.js";
import Image from 'next/image';


import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Button,
  Card,
  Row,
  Label,
  Input,
  TabPane,
  Col,
} from "reactstrap";

export default function Imageuploader() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState();

  function getUrlLoginType() {
    const params = new URLSearchParams(window.location.search);
    const loginType = params.get("loginType");
    return loginType == null ? "login" : loginType;
  }

  useEffect(() => {
    setLoginType(getUrlLoginType());
  }, []);

  useEffect(() => {
    const userFnc = (user) => {
      if (user) {
        setIsLogin(true);
        getAllImages(user);
      } else {
        console.log("user invalid");
        setIsLogin(false);
      }
    };

    firebaseAuth.authState(userFnc);
  }, [isLogin]);

  const getAllImages = async (user) => {
    const allImages = await firebaseManage.getImage(user.uid);

    const setImagesAux = [];
    allImages.forEach((element) => {
      setImagesAux.push(fileManager.base64toBlob(element.image));
    });
    setImages(setImagesAux);
  };

  const handleAddImage = async (e) => {
    if (imageInput) {
      if (imageInput.size > 1000000) {
        alert("El tamaño de la imagen es muy grande");
      } else {
        const base64 = await fileManager.getBase64(imageInput);
        const user = firebaseAuth.getCurrentUser();

        if (user) {
          // obtiene la información del usuario de la base de datos
          const userData = await firebaseManage.getUserData(user.uid);
          const userName = userData?.displayName || userData?.name;

          if (user.email && userName) {
            firebaseManage.addImage(base64, user.uid, user.email, userName);
          } else {
            alert(
              "No se pudo obtener el correo electrónico o el nombre del usuario."
            );
          }
        } else {
          alert("Debe iniciar sesión antes de agregar una imagen.");
        }

        images.push(imageInput);
      }
    } else {
      alert("No se ha seleccionado ninguna imagen");
    }
    setImageInput(null);
  };

  return isLogin ? (
    <>
      <Container>
        <Label for="exampleFile"> Subir una imagen </Label>
        <Input
          type="file"
          onChange={(e) => setImageInput(e.target.files[0])}
          accept="image/png, image/gif, image/jpeg"
        />

        <br />
        <Button color="primary" onClick={handleAddImage}>
          Agregar imagen seleccionada
        </Button>
        <br />
        <Row>
          {" "}
          {images && images.length > 0
            ? images.map((image, index) => {
                return (
                  <Col key={index} sm="6">
                    <Card body style={{ margin: "15px 0" }}>
                      <Image alt={image.name} src={URL.createObjectURL(image)} width={600} height={300} />
                    </Card>
                  </Col>
                );
              })
            : null}{" "}
        </Row>
      </Container>


      
    </>
  ) : loginType != null ? (
    <Login loginType={loginType} />
  ) : null;
}
