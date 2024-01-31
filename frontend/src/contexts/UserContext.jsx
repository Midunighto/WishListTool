import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext(null);
export const useStoredUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [storedUser, setStoredUser] = useState(false);

  const value = useMemo(() => {
    return { storedUser, setStoredUser };
  }, [storedUser, setStoredUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
