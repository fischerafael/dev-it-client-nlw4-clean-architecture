import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { fetchServer } from '../../src/external/http-client'
import NavBar from '../../src/presentation/components/molecules/NavBar'
import Profile from '../../src/presentation/components/molecules/Profile'
import TaskCard from '../../src/presentation/components/molecules/TaskCard'

const profile = ({ data }: { data: IData }) => {
    const { isFallback } = useRouter()

    if (isFallback)
        return <div className="LoadingPage">Carregando Perfil...</div>

    console.log(data)

    return (
        <div className="DefaultPage">
            <NavBar />
            <div className="SingleColumnPage">
                <div className="ProfilePage">
                    <div className="ProfileHeader">
                        <Profile
                            name={data.dev.name}
                            avatar={data.dev.avatar}
                            tasks={data.tasks}
                        />
                        <Link href={`https://github.com/${data.dev.github}`}>
                            <a target="_blank" className="ProfileGithubLink">
                                <FaGithub />
                            </a>
                        </Link>
                    </div>
                    <div className="ProfileTasks">
                        {data.tasks &&
                            data.tasks.map((task) => (
                                <TaskCard
                                    description={task.description}
                                    xp={task.durationInSeconds}
                                />
                            ))}
                        {data.tasks.length === 0 && (
                            <h2 className="NoTask">
                                Esse dev ainda não tem nenhuma task cadastrada.
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile

export const getStaticPaths: GetStaticPaths = async (context) => {
    const { data } = await fetchServer('/devs')
    const { paths } = formatPaths(data)

    return {
        paths: paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const github = context.params.github as string
        const { data } = await fetchServer(`/devs/${github}`)

        return {
            props: {
                data
            },
            revalidate: 60
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}

interface IDev {
    tasks: any[]
    _id: string
    name: string
    github: string
    avatar: string
}

interface IData {
    tasks: {
        completed: boolean
        description: string
        dev: string
        durationInSeconds: number
    }[]
    dev: {
        avatar: string
        github: string
        name: string
    }
}

export function formatPaths(data: IDev[]) {
    const paths = data.map((dev) => {
        return {
            params: {
                github: dev.github
            }
        }
    })
    return { paths }
}
