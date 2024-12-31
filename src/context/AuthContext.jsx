"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { validateKey, getKey } from "@/services/APIKey";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiCallsRemaining, setApiCallsRemaining] = useState(100);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true); // 로딩 시작
      const apiKey = await getKey();
      if (apiKey) {
        const isValid = await validateKey(apiKey);
        if (isValid) {
          setIsAuthenticated(true);
          setApiCallsRemaining(100);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false); // 로딩 종료
    };

    initializeAuth();
  }, []);

  const setAuthState = (state) => {
    setIsAuthenticated(state);
  };

  const handleApiCall = () => {
    if (apiCallsRemaining > 0) {
      setApiCallsRemaining((prev) => prev - 1);
    } else {
      console.warn("API 요청 한도를 초과했습니다.");
    }
  };

  const refreshAuth = async () => {
    const apiKey = await getKey();
    if (apiKey) {
      const isValid = await validateKey(apiKey);
      setIsAuthenticated(isValid);
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        apiCallsRemaining,
        isLoading, // 로딩 상태 전달
        setAuthState,
        handleApiCall,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

