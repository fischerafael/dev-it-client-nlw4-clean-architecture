import { GetServerSideProps } from 'next'
import Link from 'next/link'
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
    const { totalExp } = getTotalExp(data.tasks)

    const [screenState, setScreenState] = useState<
        'initial' | 'during' | 'after' | 'shame' | 'congratulations'
    >('initial')

    const [initialTimeInMinutes] = useState(15)
    const [experiencePerTask] = useState(1000)
    const [initialTime] = useState(60 * initialTimeInMinutes)
    const [timer, setTimer] = useState(initialTime)
    const [turnOnTimer, setTurnOnTimer] = useState(false)

    const [score, setScore] = useState(0)

    const [task, setTask] = useState('')

    function handleStartTimer() {
        setTurnOnTimer(true)
        setScreenState('during')
    }

    async function handleFinishedBeforeTimeOut() {
        setScreenState('after')
        setTurnOnTimer(false)
    }

    function handleShameScreen() {
        setScreenState('shame')
    }

    function handlePauseTask() {
        setTurnOnTimer((prevState) => !prevState)
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
            const { data: resData } = await submitQuestionService(
                data.dev._id,
                task,
                score
            )
            console.log('response data', resData)
        } catch (err) {
            console.log('erro', err)
            alert('Falhar ao cadastrar Task :(')
        }
    }

    async function submitQuestionService(
        devId: string,
        task: string,
        score: number
    ) {
        try {
            const { data, status } = await fetchServer.post(
                `/devs/${devId}/tasks`,
                {
                    description: task,
                    completed: true,
                    duration: score
                },
                {
                    headers: {
                        auth: devId
                    }
                }
            )
            return { data, status }
        } catch (err) {
            return { data: undefined, status: 400 }
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
                    <Profile name={name} avatar={avatar} tasks={data.tasks} />
                    <TimerContainer timeInSeconds={timer} />
                </div>
                <div>
                    <BoxContainer fixed>
                        <Logo />
                        {screenState === 'initial' && (
                            <>
                                <p className="DefaultWarning">
                                    Descreva a tarefa que você pretende realizar
                                    pelos próximos {initialTimeInMinutes}{' '}
                                    minutos.
                                </p>
                                <CustomInput
                                    label="No mínimo 15 caracteres"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />
                                {task.length > 15 && (
                                    <div className="ScreenActions">
                                        <button
                                            className="DefaultButton"
                                            onClick={handleStartTimer}
                                        >
                                            Iniciar tarefa
                                        </button>
                                        <Link href="/">
                                            <a>
                                                <button className="DefaultButton">
                                                    Sair
                                                </button>
                                            </a>
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}

                        {screenState === 'during' && (
                            <>
                                <h2>{task}.</h2>
                                <p className="DefaultWarning">
                                    Manda a ver, {name}!
                                </p>
                                <div className="ScreenActions">
                                    <button
                                        onClick={handleFinishedBeforeTimeOut}
                                        className="DefaultButton"
                                    >
                                        Terminei!
                                    </button>
                                    {turnOnTimer ? (
                                        <button
                                            onClick={handlePauseTask}
                                            className="DefaultButton"
                                        >
                                            Pausar Tarefa
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handlePauseTask}
                                            className="DefaultButton"
                                        >
                                            Retomar Tarefa
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        {screenState === 'after' && (
                            <>
                                <h2>O tempo acabou</h2>
                                <p className="DefaultWarning">
                                    Você conseguiu terminar a task?
                                </p>
                                <div className="ScreenActions">
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
                                    {score} pontos de experiência desta vez.
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
                                    {score} pontos de experiência.
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

export function getTotalExp(tasks: Task[]) {
    const tasksExp = tasks && tasks.map((task) => task.durationInSeconds)
    console.log(tasksExp)
    const expSum =
        tasksExp && tasksExp.reduce((acc, current) => acc + current, 0)

    return {
        totalExp: expSum
    }
}
