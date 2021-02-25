import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { getTotalExp } from '../../../../../pages/newtask'
import { getLevel } from '../Profile'

interface Props {
    avatar: string
    name: string
    github: string
    position?: number
    tasks: {
        _id: string
        completed: boolean
        description: string
        durationInSeconds: number
        dev: string
    }[]
}

const RankingCard = ({ avatar, name, github, tasks, position }: Props) => {
    const { totalExp } = getTotalExp(tasks)
    const { level } = getLevel(totalExp)

    const { push } = useRouter()

    return (
        <div className="CardRanking">
            <img src={avatar} alt={name} />
            {position && <span className="CardPosition">{position}</span>}

            <div className="CardTitle">
                <h2>{name}</h2>
                <Link href={`https://github.com/${github}`}>
                    <a target="_blank">
                        <FaGithub />
                    </a>
                </Link>
            </div>
            <div className="CardDetails">
                <span className="CardLevel">Nível {level}</span>
                <span className="CardExp">{totalExp} XP</span>
            </div>
            <p>{tasks.length} tarefas realizadas</p>
            <button
                className="DefaultButton CardButton"
                onClick={() => push(`/${github}`)}
            >
                Ver Perfil
            </button>
        </div>
    )
}

export default RankingCard
