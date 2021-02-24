import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { fetchServer } from '../../src/external/http-client'
import Logo from '../../src/presentation/components/atoms/Logo'

import BoxContainer from '../../src/presentation/components/molecules/BoxContainer'
import CustomInput from '../../src/presentation/components/molecules/CustomInput'
import ExperienceBar from '../../src/presentation/components/molecules/ExperienceBar'
import Profile from '../../src/presentation/components/molecules/Profile'
import TimerContainer from '../../src/presentation/components/molecules/TimerContainer'
import TwoColumnContainer from '../../src/presentation/components/organisms/TwoColumnContainer'
import PageContainer from '../../src/presentation/components/templates/PageContainer'
import { AuthContext } from '../../src/usecases/contexts/auth'

interface Task {
    _id: string
    completed: boolean
    description: string
    dev: string
    durationInSeconds: number
}

interface Props {
    data: {
        dev: {
            avatar: string
            github: string
            name: string
            _id: string
        }
        tasks?: Task[]
    }
}

const Home = ({ data }: Props) => {
    const { logged } = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        !logged && router.push('/')
    }, [])

    const { name, avatar } = data.dev

    const [screenState, setScreenState] = useState<
        'initial' | 'during' | 'after' | 'shame' | 'congratulations'
    >('initial')

    const [experiencePerTask] = useState(1000)
    const [initialTime] = useState(10 * 1)
    const [timer, setTimer] = useState(initialTime)
    const [turnOnTimer, setTurnOnTimer] = useState(false)

    const [score, setScore] = useState(0)
    console.log('score', score)

    const [task, setTask] = useState('')

    function handleStartTimer() {
        setTurnOnTimer(true)
        setScreenState('during')
    }

    function handleShameScreen() {
        setScreenState('shame')
    }

    function handleInitialScreen() {
        setScreenState('initial')
        setTurnOnTimer(false)
        setTimer(initialTime)
        setTask('')
    }

    async function handleSubmitTask(e: any) {
        e.preventDefault()
        setScreenState('congratulations')
        try {
            const { data: responseData, status } = await fetchServer.post(
                `/devs/${data.dev._id}/tasks`,
                {
                    description: task,
                    completed: true,
                    duration: score
                },
                {
                    headers: {
                        auth: data.dev._id
                    }
                }
            )
            console.log('success', responseData)
        } catch (err) {
            alert('Falhar ao cadastrar Task :(')
        }
    }

    useEffect(() => {
        if (turnOnTimer === true && timer > 0) {
            setTimeout(() => setTimer((prevTime) => prevTime - 1), 1000)
        }
    }, [turnOnTimer, timer])

    useEffect(() => {
        if (timer === 0) {
            setScreenState('after')
        }
    }, [timer])

    return (
        <PageContainer>
            <ExperienceBar
                maxExp={experiencePerTask}
                currentTime={timer}
                initialTime={initialTime}
                score={score}
                setScore={setScore}
            />
            <TwoColumnContainer>
                <div>
                    <Profile name={name} avatar={avatar} />
                    <TimerContainer timeInSeconds={timer} />
                </div>
                <div>
                    <BoxContainer fixed>
                        <Logo />
                        {screenState === 'initial' && (
                            <>
                                <p className="DefaultWarning">
                                    Descreva a tarefa que você pretende realizar
                                    pelos próximos 25 minutos.
                                </p>
                                <CustomInput
                                    label="Descrição da tarefa (no mínimo 15 caracteres)"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />
                                {task.length > 15 && (
                                    <div>
                                        <button
                                            className="DefaultButton"
                                            onClick={handleStartTimer}
                                        >
                                            Start Count
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {screenState === 'during' && (
                            <>
                                <p className="DefaultWarning">
                                    Sua tarefa é {task}.
                                </p>
                                <p className="DefaultWarning">
                                    Manda a ver, {name}!
                                </p>
                            </>
                        )}

                        {screenState === 'after' && (
                            <>
                                <h2>O tempo acabou</h2>
                                <p className="DefaultWarning">
                                    Você conseguiu terminar a task?
                                </p>
                                <div>
                                    <button
                                        onClick={handleSubmitTask}
                                        className="DefaultButton"
                                    >
                                        Sim
                                    </button>
                                    <button
                                        onClick={handleShameScreen}
                                        className="DefaultButton"
                                    >
                                        Não
                                    </button>
                                </div>
                            </>
                        )}

                        {screenState === 'shame' && (
                            <>
                                <h2>Que pena!</h2>
                                <p className="DefaultWarning">
                                    Você não completou a Task e não ganhará {''}
                                    {experiencePerTask} pontos de experiência
                                    desta vez.
                                </p>
                                <button
                                    className="DefaultButton"
                                    onClick={handleInitialScreen}
                                >
                                    Recomeçar
                                </button>
                            </>
                        )}

                        {screenState === 'congratulations' && (
                            <>
                                <h2>Que massa!</h2>
                                <p className="DefaultWarning">
                                    Você completou a Task ganhou {''}
                                    {experiencePerTask} pontos de experiência.
                                </p>
                                <button
                                    className="DefaultButton"
                                    onClick={handleInitialScreen}
                                >
                                    Recomeçar
                                </button>
                            </>
                        )}
                    </BoxContainer>
                </div>
            </TwoColumnContainer>
        </PageContainer>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { github } = context.query

    try {
        const { data } = await fetchServer(`/devs/${github}`)

        return {
            props: {
                data
            }
        }
    } catch (err) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}
