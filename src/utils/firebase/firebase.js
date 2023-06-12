import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  collection,
  writeBatch
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAINE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;
  const userRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email already in use');
      return;
    } else {
      console.log(error);
      return;
    }
  }
};

const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
        alert('Invalid email');
        break;
      case 'auth/user-not-found':
        alert('User not found');
        break;
      default:
        console.log(error);
    }
  }
};

const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

const signOutAuthUser = async () => await signOut(auth);

const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signOutAuthUser,
  addCollectionAndDocuments,
  getCategoriesAndDocuments
};
