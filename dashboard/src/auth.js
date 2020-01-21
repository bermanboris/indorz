import React from "react";

export const AuthContext = React.createContext();

const user = localStorage.getItem("user") || null;
const token = localStorage.getItem("token") || null;
const isAuthenticated = user !== null && token !== null;

const initialState = { isAuthenticated, user, token };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const login = payload => dispatch({ type: "LOGIN", payload });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
