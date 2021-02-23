import React, { useContext } from 'react'
import ExperienceBar from '../../src/presentation/components/molecules/ExperienceBar'
import Profile from '../../src/presentation/components/molecules/Profile'
import TwoColumnContainer from '../../src/presentation/components/organisms/TwoColumnContainer'
import PageContainer from '../../src/presentation/components/templates/PageContainer'
import { AuthContext } from '../../src/usecases/contexts/auth'

const Home = () => {
    const { id, logged } = useContext(AuthContext)

    console.log(id, logged)

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
