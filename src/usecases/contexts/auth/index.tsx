import { createContext } from 'react'

interface Props {
    logged: boolean
    id: string
}

const AuthContext = createContext({} as Props)

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{ logged: false, id: 'rs' }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
