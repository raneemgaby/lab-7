import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);
const initialState = {
  user: null,
};

function authReducer(state, action) { //manages the authentication state based on dispatched actions
  switch (action.type) {
    case 'LOGGED_IN':
      return { user: action.payload };
    case 'LOGGED_OUT':
      return { user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) { //provides autentication state and functionsn to the component tree
  const [state, dispatch] = useReducer(authReducer, initialState);
  const loginUser = (user) => {
    dispatch({ type: 'LOGGED_IN', payload: user });
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGGED_OUT' });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { //cutome hook to access the authentication context,ensuring it's used within the AuthProvider
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}