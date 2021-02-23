import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { fetchServer } from '../../../src/external/http-client'
import { AuthContext } from '../../../src/usecases/contexts/auth'

const useLogin = () => {
    const router = useRouter()
    const { state } = router.query

    const [type, setType] = useState<'login' | 'register'>(
        state as 'login' | 'register'
    )
    const [loading, setLoading] = useState(false)

    const [loginInput, setLoginInput] = useState('')
    const [registerInput, setRegisterInput] = useState('')

    const { setId, setLogged } = useContext(AuthContext)

    async function handleRegister(e: any) {
        e.preventDefault()
        setLoading(true)
        try {
            const { data, status } = await fetchServer.post('/devs', {
                github: registerInput
            })

            setId(data._id)
            setLogged(true)

            setLoading(false)
        } catch (err) {
            alert('Falhar ao cadastrar usuário. Tente novamente.')
            setLoading(false)
            setRegisterInput('')
        }
    }

    async function handleLogin(e: any) {
        e.preventDefault()
        setLoading(true)
        try {
            const { data, status } = await fetchServer.post('/sessions', {
                github: loginInput
            })

            setId(data._id)
            setLogged(true)

            setLoading(false)
        } catch (err) {
            alert('Falhar ao acessar conta. Tente novamente.')
            setLoading(false)
            setLoginInput('')
        }
    }

    return {
        loading,
        type,
        setType,
        registerInput,
        setRegisterInput,
        loginInput,
        setLoginInput,
        handleLogin,
        handleRegister
    }
}

export default useLogin
