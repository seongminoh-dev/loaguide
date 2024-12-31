"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { validateKey, getKey } from "@/services/APIKey";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiCallsRemaining, setApiCallsRemaining] = useState(100);
  const [lastApiCallTime, setLastApiCallTime] = useState(null);
  const [timer, setTimer] = useState(null);

  // 인증 상태 초기화
  useEffect(() => {
    const initializeAuth = async () => {
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
    };

    initializeAuth();
  }, []);

  const setAuthState = (state) => {
    setIsAuthenticated(state);
  };

  // API 호출 시 상태 업데이트
  const handleApiCall = () => {
    if (apiCallsRemaining > 0) {
      setApiCallsRemaining((prev) => prev - 1);
      setLastApiCallTime(Date.now());

      // 타이머 리셋 및 초기화
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          setApiCallsRemaining(100);
        }, 60000)
      );
    } else {
      console.warn("API 요청 한도를 초과했습니다.");
    }
  };

  // 인증 상태 관리 함수
  const refreshAuth = async () => {
    const apiKey = await getKey();
    if (apiKey) {
      const isValid = await validateKey(apiKey);
      if (!isValid) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        apiCallsRemaining,
        lastApiCallTime,
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
