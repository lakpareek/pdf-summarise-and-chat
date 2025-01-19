import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [UserAuth, setUserAuth] = useState(true);

  return (
    <AuthContext.Provider value={{ UserAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;