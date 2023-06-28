import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  AuthError,
  AuthErrorCodes
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  collection,
  writeBatch,
  DocumentSnapshot
} from 'firebase/firestore';
import { Category } from '../../store/reducers/categories/types';

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

export type AdditionalData = {
  displayName?: string,
};

export type UserDocument = {
  displayName?: string,
  email?: string,
  createdAt?: Date,
};

const createUserDocumentFromAuth = async (userAuth: User, additionalData = {} as AdditionalData): Promise<void | DocumentSnapshot<UserDocument>> => {
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
    } catch (error: any) {
      console.log('error creating user', error.message);
    }
  }
  return userSnapShot as DocumentSnapshot<UserDocument>;
};

const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      alert('Email already in use');
      return;
    } else {
      console.log(error);
      return;
    }
  }
};

const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error: any) {
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

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

const signOutAuthUser = async () => await signOut(auth);

type Document = {
  title: string
}

const addCollectionAndDocuments = async <T extends Document>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

const getCollectionAndDocuments = async (collectionKey: string): Promise<Category[]> => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Category);
};

export {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signOutAuthUser,
  addCollectionAndDocuments,
  getCollectionAndDocuments
};
