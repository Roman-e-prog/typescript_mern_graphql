// UserContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { User } from '../@types/index';

interface UserContextProps {
  user: User | null;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
}
interface Children {
    children:ReactNode,
    // initialUser:User,
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<Children> = ({children}) => {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLogin = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
