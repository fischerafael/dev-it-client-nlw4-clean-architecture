import { createContext, useEffect, useState } from 'react'

interface Props {
    logged: boolean
    id: string
    setLogged(e: any): void
    setId(e: any): void
}

const AuthContext = createContext({} as Props)

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(false)
    const [id, setId] = useState<string>('')

    return (
        <AuthContext.Provider value={{ logged, id, setLogged, setId }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
