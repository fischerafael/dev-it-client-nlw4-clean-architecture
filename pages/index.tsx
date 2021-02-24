import { GetStaticProps } from 'next'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { fetchServer } from '../src/external/http-client'
import HeroActions from '../src/presentation/components/atoms/HeroActions'
import HeroImage from '../src/presentation/components/atoms/HeroImage'
import NavBar from '../src/presentation/components/molecules/NavBar'
import RankingCard from '../src/presentation/components/molecules/RankingCard'
import OneColumnContainer from '../src/presentation/components/organisms/OneColumnContainer'
import TwoColumnContainer from '../src/presentation/components/organisms/TwoColumnContainer'
import PageContainer from '../src/presentation/components/templates/PageContainer'
import { getTotalExp } from './newtask'

const Home = ({ data }: Props) => {
    const { rankedDevs } = getDevsRanked({ data })

    return (
        <PageContainer>
            <NavBar />
            <TwoColumnContainer>
                <div>
                    <HeroImage />
                </div>
                <div>
                    <HeroActions />
                </div>
            </TwoColumnContainer>
            <div className="RankingContainer">
                <div className="RankingContent">
                    <h1>Top 3</h1>
                    <div className="Top3">
                        <RankingCard
                            avatar={rankedDevs[0].dev.avatar}
                            name={rankedDevs[0].dev.name}
                            github={rankedDevs[0].dev.github}
                            tasks={rankedDevs[0].dev.tasks}
                            position={1}
                        />
                        <RankingCard
                            avatar={rankedDevs[1].dev.avatar}
                            name={rankedDevs[1].dev.name}
                            github={rankedDevs[1].dev.github}
                            tasks={rankedDevs[1].dev.tasks}
                            position={2}
                        />
                        <RankingCard
                            avatar={rankedDevs[2].dev.avatar}
                            name={rankedDevs[2].dev.name}
                            github={rankedDevs[2].dev.github}
                            tasks={rankedDevs[2].dev.tasks}
                            position={3}
                        />
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await fetchServer('/devs')

    return {
        props: {
            data
        }
    }
}

interface Task {
    _id: string
    completed: boolean
    description: string
    dev: string
    durationInSeconds: number
}

interface Props {
    data: {
        avatar: string
        github: string
        name: string
        _id: string

        tasks?: Task[]
    }[]
}

export function getDevsRanked({ data }: Props) {
    const devsWithScore = data.map((dev) => {
        const devData = {
            dev,
            exp: getTotalExp(dev.tasks)
        }
        return devData
    })

    const rankedDevs = devsWithScore.sort(
        (a, b) => b.exp.totalExp - a.exp.totalExp
    )

    return { rankedDevs }
}
