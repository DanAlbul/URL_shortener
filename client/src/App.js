import React from 'react';
import { useRoutes } from './routes.js';
import { useAuth } from './hooks/auth.hook.js';
import { AuthContext } from './context/Auth.context.js';
import 'materialize-css';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated,
      }}
    >
      <div>{routes}</div>
    </AuthContext.Provider>
  );
}

export default App;
