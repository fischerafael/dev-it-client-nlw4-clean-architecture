import React from 'react'

interface Props {
    description: string
    xp: number
}

const TaskCard = ({ description, xp }: Props) => {
    return (
        <div className="ProfileTasksCard">
            <h2>{description}</h2>
            <p>{xp} xp</p>
        </div>
    )
}

export default TaskCard
