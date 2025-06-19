// all the work experiences are shown in this card, -> fetched from the database and shown here.
// server

import WorkExperienceCard from "./WorkExperienceCard"

export default function WorkExperience() {
  // will get this data from the database
  const data = [{
    position: "Office",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi commodi eos odio est harum qui dicta culpa explicabo. Voluptates, repellendus ut magnam obcaecati consectetur unde cupiditate odit quam numquam beatae quaerat fugit, laborum, veniam doloribus reiciendis. Distinctio ducimus quibusdam ipsam vero nostrum nemo accusamus temporibus quod ea, ullam nihil sunt!",
    skills: ["react","java"],
    duration:"2020-3023"
  }, {
    position: "IT Specialist",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi commodi eos odio est harum qui dicta culpa explicabo. Voluptates, repellendus ut magnam obcaecati consectetur unde cupiditate odit quam numquam beatae quaerat fugit, laborum, veniam doloribus reiciendis. Distinctio ducimus quibusdam ipsam vero nostrum nemo accusamus temporibus quod ea, ullam nihil sunt!",
    skills: ["react","java"],
    duration:"2020-3023"
  }]
  return (
    <div>
      <h1>Work Expericence</h1>
      {data.map((experience) => (
        <WorkExperienceCard key={experience.position} workExperience={experience}/>
      ))}
    </div>
  )
}
