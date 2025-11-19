import React from 'react'
import AboutMe from '../../components/AboutMe'
import Skills from '../../components/Skills'
import WorkExperience from '../../components/WorkExperience'
import Education from '../../components/Education'
import PageWrapper from '../../components/PageWrapper'

function page() {
    return (
        <PageWrapper>
            <main className="m-10 md:m-35 pb-30 mt-40">
                <AboutMe />
                <br />
                {/* <hr /> */}
                <Skills />
                <br />
                {/* <hr /> */}
                <WorkExperience />
                <br />
                {/* <hr /> */}
                <Education />
            </main>
        </PageWrapper>
    )
}

export default page