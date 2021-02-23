import React, { useState } from 'react'

import Logo from '../../src/presentation/components/atoms/Logo'
import MainButton from '../../src/presentation/components/atoms/MainButton'
import BoxContainer from '../../src/presentation/components/molecules/BoxContainer'
import CustomInput from '../../src/presentation/components/molecules/CustomInput'
import LoginForm from '../../src/presentation/components/molecules/LoginForm'
import OneColumnContainer from '../../src/presentation/components/organisms/OneColumnContainer'
import PageContainer from '../../src/presentation/components/templates/PageContainer'

const Login = () => {
    const [type, setType] = useState<'login' | 'register'>('register')
    const [loginInput, setLoginInput] = useState('')
    const [registerInput, setRegisterInput] = useState('')

    return (
        <PageContainer>
            <OneColumnContainer>
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
                            <MainButton>Finalizar</MainButton>
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
                            <MainButton>Entrar</MainButton>
                        </LoginForm>
                    )}
                </BoxContainer>
            </OneColumnContainer>
        </PageContainer>
    )
}

export default Login
