import React from 'react'
import ExperienceBar from '../../src/presentation/components/molecules/ExperienceBar'
import Profile from '../../src/presentation/components/molecules/Profile'
import TwoColumnContainer from '../../src/presentation/components/organisms/TwoColumnContainer'
import PageContainer from '../../src/presentation/components/templates/PageContainer'

const Home = () => {
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
