import { useEffect } from 'react';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase';
import { getRedirectResult } from 'firebase/auth';

import './sign-in.scss';

const SignIn = () => {

  useEffect(() => {
    (async function getRedirectData() {
      const response = await getRedirectResult(auth);
      if (response) {
        const userRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
    </div>
  );
};

export default SignIn;