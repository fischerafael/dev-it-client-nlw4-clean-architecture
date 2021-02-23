import React from 'react'
import HeroActions from '../src/presentation/components/atoms/HeroActions'
import HeroImage from '../src/presentation/components/atoms/HeroImage'
import NavBar from '../src/presentation/components/molecules/NavBar'
import Profile from '../src/presentation/components/molecules/Profile'
import TwoColumnContainer from '../src/presentation/components/organisms/TwoColumnContainer'
import PageContainer from '../src/presentation/components/templates/PageContainer'

const Home = () => {
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
        </PageContainer>
    )
}

export default Home
