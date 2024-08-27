import { createContext, useState, useReducer } from 'react';
// import authReducer from './reducers/authReducer';
// import { authState } from './state/authState';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState('initial');

    return (
        <AuthContext.Provider value={{ state }}>
            {children}
        </AuthContext.Provider>
    );
};
