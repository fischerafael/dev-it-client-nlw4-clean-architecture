import React, { useState } from 'react'
import { fetchServer } from '../../src/external/http-client'

import Logo from '../../src/presentation/components/atoms/Logo'
import MainButton from '../../src/presentation/components/atoms/MainButton'
import BoxContainer from '../../src/presentation/components/molecules/BoxContainer'
import CustomInput from '../../src/presentation/components/molecules/CustomInput'
import LoginForm from '../../src/presentation/components/molecules/LoginForm'
import OneColumnContainer from '../../src/presentation/components/organisms/OneColumnContainer'
import PageContainer from '../../src/presentation/components/templates/PageContainer'

const Login = () => {
    const [type, setType] = useState<'login' | 'register'>('register')
    const [loading, setLoading] = useState(false)

    const [loginInput, setLoginInput] = useState('')
    const [registerInput, setRegisterInput] = useState('')

    async function handleRegister(e: any) {
        e.preventDefault()
        setLoading(true)
        try {
            const { data, status } = await fetchServer.post('/devs', {
                github: registerInput
            })
            console.log(data, status)
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
            console.log(data, status)
            setLoading(false)
        } catch (err) {
            alert('Falhar ao acessar conta. Tente novamente.')
            setLoading(false)
            setLoginInput('')
        }
    }

    return (
        <PageContainer>
            <OneColumnContainer>
                {loading && <p>Carregando...</p>}
                {!loading && (
                    <BoxContainer>
                        <Logo />

                        {type === 'register' && (
                            <LoginForm
                                title="Cadastre-se"
                                subTitle="Cadastre-se com seu Github"
                                state={type}
                                setState={setType}
                            >
                                <CustomInput
                                    label="Github"
                                    value={registerInput}
                                    onChange={(e: any) =>
                                        setRegisterInput(e.target.value)
                                    }
                                />
                                <MainButton onClick={handleRegister}>
                                    Finalizar
                                </MainButton>
                            </LoginForm>
                        )}

                        {type === 'login' && (
                            <LoginForm
                                title="Acesse sua conta"
                                subTitle="Insira seu Github"
                                state={type}
                                setState={setType}
                            >
                                <CustomInput
                                    label="Github"
                                    value={loginInput}
                                    onChange={(e: any) =>
                                        setLoginInput(e.target.value)
                                    }
                                />
                                <MainButton onClick={handleLogin}>
                                    Entrar
                                </MainButton>
                            </LoginForm>
                        )}
                    </BoxContainer>
                )}
            </OneColumnContainer>
        </PageContainer>
    )
}

export default Login
