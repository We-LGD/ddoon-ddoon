import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const useFirebaseToken = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const getFirebaseToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken(true);
        setUserToken(token);
      } catch (error) {
        console.error('Error fetching Firebase token:', error);
      }
    } else {
      console.error('No user is logged in');
    }
  };

  useEffect(() => {
    getFirebaseToken();
  }, []);

  return userToken;
};

export default useFirebaseToken;
