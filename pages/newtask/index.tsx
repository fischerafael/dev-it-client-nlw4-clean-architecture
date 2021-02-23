import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { fetchServer } from '../../src/external/http-client'
import ExperienceBar from '../../src/presentation/components/molecules/ExperienceBar'
import Profile from '../../src/presentation/components/molecules/Profile'
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
    console.log(data.tasks.filter((task) => task.completed === false))

    const { logged } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        !logged && router.push('/')
    }, [])

    return (
        <PageContainer>
            <ExperienceBar />
            <TwoColumnContainer>
                <div>
                    <Profile />
                </div>
                <div>
                    <Profile />
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
