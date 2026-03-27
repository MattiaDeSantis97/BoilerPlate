/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const register = (email, password, name) => {
    const userExists = registeredUsers.find(u => u.email === email);
    if (userExists) return { success: false, message: 'Email già registrata.' };

    const newUser = { email, password, name, role: 'user' };
    setRegisteredUsers([...registeredUsers, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: 'Mail o password errati.' };
  };

  const updateUser = (newName, newPassword) => {
    if (!user) return { success: false };
    
    const updatedUser = { ...user, name: newName };
    if (newPassword) updatedUser.password = newPassword;

    const updatedList = registeredUsers.map(u => 
      u.email === user.email ? { ...u, name: newName, password: newPassword || u.password } : u
    );
    
    setRegisteredUsers(updatedList);
    setUser(updatedUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, login, register, updateUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};