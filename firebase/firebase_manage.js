import firebase from "./firebaseconfig";
import {
  query,
  where,
  limit,
  getFirestore,
  collection,
  collectionGroup,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const addNewUser = async (user) => {
  const db = getFirestore();

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    user_name: user.name,
    created_date: new Date(),
    updated_date: new Date(),
  });
};

const addImage = async (imageData, uid, email, name) => {
  const db = getFirestore();
  // images/all_user_images/uid/randomIDFirebase/{created_date, updated_date, user_email, user_name}
  const imagesRef = doc(db, "images", "all_user_images");
  await addDoc(collection(imagesRef, uid), {
    image: imageData,
    created_by: uid,
    created_date: new Date(),
    updated_date: new Date(),
    user_email: email,
    user_name: name,
  });
};

const getImage = async (uid) => {
  const result = [];
  const db = getFirestore();
  const queryImages = query(
    collection(db, "images", "all_user_images", uid),
    where("created_by", "==", uid)
  );
  const querySnapshot = await getDocs(queryImages);
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
};

const getAllImage = async (uid) => {
  const result = [];
  const db = getFirestore();
  const allImagesRef = collection(db, "images", "all_user_images", uid);

  const querySnapshot = await getDocs(allImagesRef);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (doc.id !== uid) {
      // omitir imágenes del usuario actual
      result.push({
        user_name: data.user_name,
        image: data.image,
      });
    }
  });

  return result;
};

const getUserData = async (uid) => {
  const db = getFirestore();
  const userDoc = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDoc);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    throw new Error("User does not exist in the database");
  }
};

export default {
  addNewUser,
  addImage,
  getImage,
  getAllImage,
  getUserData,
};
