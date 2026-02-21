import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User } from '@/types';

interface UserContextType {
  user: User | null;
  registeredUsers: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loginError: string | null;
  registerError: string | null;
  clearErrors: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Ключ для localStorage
const USERS_STORAGE_KEY = 'silentpath_users';
const CURRENT_USER_KEY = 'silentpath_current_user';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Загружаем данные при инициализации
  useEffect(() => {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const savedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);
    
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error('Error parsing users:', e);
      }
    }
    
    if (savedCurrentUser) {
      try {
        setUser(JSON.parse(savedCurrentUser));
      } catch (e) {
        console.error('Error parsing current user:', e);
      }
    }
  }, []);

  // Сохраняем пользователей при изменении
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Сохраняем текущего пользователя при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const clearErrors = useCallback(() => {
    setLoginError(null);
    setRegisterError(null);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    clearErrors();
    
    // Ищем пользователя по email
    const foundUser = registeredUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setLoginError('Пользователь с таким email не найден. Зарегистрируйтесь.');
      return false;
    }
    
    // Проверяем пароль (в реальном приложении здесь была бы хеш-проверка)
    const userWithPassword = registeredUsers.find(
      u => u.email === email && (u as any).password === password
    );
    
    if (!userWithPassword) {
      setLoginError('Неверный пароль. Попробуйте снова.');
      return false;
    }
    
    setUser({
      id: userWithPassword.id,
      email: userWithPassword.email,
      name: userWithPassword.name,
    });
    return true;
  }, [registeredUsers, clearErrors]);

  const register = useCallback(async (email: string, name: string, password: string): Promise<boolean> => {
    clearErrors();
    
    // Проверяем, не существует ли уже пользователь с таким email
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (existingUser) {
      setRegisterError('Пользователь с таким email уже существует. Войдите в аккаунт.');
      return false;
    }
    
    // Проверяем валидность данных
    if (!email || !name || !password) {
      setRegisterError('Заполните все поля.');
      return false;
    }
    
    if (password.length < 6) {
      setRegisterError('Пароль должен быть не менее 6 символов.');
      return false;
    }
    
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      name,
      password, // В реальном приложении пароль должен быть захеширован
    };
    
    setRegisteredUsers(prev => [...prev, newUser]);
    setUser({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });
    return true;
  }, [registeredUsers, clearErrors]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        registeredUsers,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loginError,
        registerError,
        clearErrors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
