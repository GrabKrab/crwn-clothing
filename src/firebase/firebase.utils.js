import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBVQ3vbEDTe4n4KpgM7m098Oi9B6NlFiVQ",
  authDomain: "crwn-e-commerce-db.firebaseapp.com",
  projectId: "crwn-e-commerce-db",
  storageBucket: "crwn-e-commerce-db.appspot.com",
  messagingSenderId: "117545674531",
  appId: "1:117545674531:web:44239097eb1f9c797cce96",
  measurementId: "G-HYDN4N2187"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;