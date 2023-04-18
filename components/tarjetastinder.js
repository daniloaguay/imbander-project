import React, { useState, useEffect } from 'react';
import styles from "../styles/tinder.module.css";
import TinderCard from "react-tinder-card";

import Login from "../components/login";
import fileManager from "../utils/fileManager";
import firebaseAuth from "../firebase/firebase_auth.js";
import firebaseManage from "../firebase/firebase_manage.js";

export default function Tarjetastinder() {

  const [isLogin, setIsLogin] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [people, setPeople] = useState([]);
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
  }, []);  

  const getAllImages = async (user) => {
    const allImages = await firebaseManage.getAllImage(user.uid);

    const setPeopleAux = [];
    allImages.forEach((element) => {
      setPeopleAux.push({
        user_name: element.user_name,
        image: fileManager.base64toBlob(element.image),
      });
    });
    setPeople(setPeopleAux);
  };
  
  return (
    <>
      <div className="tarjetastinder">
        <div className={styles.tarjetastin}>
          {people.map((person, index) => (
            <TinderCard
              className={styles.swipe}
              key={index}
              preventSwipe={["up", "down", "right"]}
            >
              <div
                className={styles.tarjeta}
                style={{ backgroundImage: `url(${URL.createObjectURL(person.image)})` }}
              >
                <h2>{person.user_name}</h2>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </>
  );
}
