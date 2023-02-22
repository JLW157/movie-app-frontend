import { useEffect, useState } from 'react';
import './App.css';
import AuthContext from './auth/auth-context';
import { claim } from './auth/auth-models';
import { getClaims } from './auth/handleJwt';
import configureValidations from './forms/Validation';
import MyRouter from './router/router-config';
import configureInterceptor from './utils/httpInterceptors';

configureValidations();
configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    console.log(getClaims());
    setClaims(getClaims());
  }, []);

  const onUpdate = (claims: claim[]) => {
    setClaims(claims);
  };


  return (
    <AuthContext.Provider value={{
      claims: claims,
      update: onUpdate,
    }}>
      <MyRouter />
    </AuthContext.Provider>
  );
}

export default App;
