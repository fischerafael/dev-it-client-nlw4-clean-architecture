import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { fetchServer } from '../../../external/http-client'
import { AuthContext } from '../../contexts/auth'

const useLogin = () => {
    const router = useRouter()
    const { state } = router.query

    const [type, setType] = useState<'login' | 'register'>(
        state as 'login' | 'register'
    )
    const [loading, setLoading] = useState(false)

    const [loginInput, setLoginInput] = useState('')
    const [registerInput, setRegisterInput] = useState('')

    const [userData, setUserData] = useState({})

    const { setId, setLogged } = useContext(AuthContext)

    async function handleRegister(e: any) {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await fetchServer.post('/devs', {
                github: registerInput
            })

            setUserData(data)

            setId(data._id)
            setLogged(true)

            router.push(`/newtask?github=${data.github}`)
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
            const { data } = await fetchServer.post('/sessions', {
                github: loginInput
            })

            setUserData(data)

            setId(data._id)
            setLogged(true)

            router.push(`/newtask?github=${data.github}`)
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
