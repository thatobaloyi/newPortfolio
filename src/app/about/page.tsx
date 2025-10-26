import React from 'react'
import AboutMe from '../components/AboutMe'
import Skills from '../components/Skills'
import WorkExperience from '../components/WorkExperience'
import Education from '../components/Education'

function page() {
    return (
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
    )
}

export default page