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

    const [initialTime] = useState(10 * 1)
    const [timer, setTimer] = useState(initialTime)
    const [turnOnTimer, setTurnOnTimer] = useState(false)

    const [score, setScore] = useState(0)

    const [task, setTask] = useState('')

    console.log(task)

    function handleStartTimer() {
        setTurnOnTimer(true)
    }

    useEffect(() => {
        if (turnOnTimer && timer > 0) {
            setTimeout(() => setTimer((prevTime) => prevTime - 1), 1000)
        }
    }, [turnOnTimer, timer])

    return (
        <PageContainer>
            <ExperienceBar
                maxExp={600}
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
                    <BoxContainer>
                        <Logo />
                        <CustomInput
                            label="Defina uma Task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />

                        <div>
                            <button onClick={handleStartTimer}>
                                Start Count
                            </button>
                        </div>
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
