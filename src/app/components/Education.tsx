// this is a component that fetches educational information from the database and show each education on the browser using the education card component.
//server
import EducationCard from "./EducationCard"
export default function Education() {
  // data to get from the database
  const data = [
    {
      institution: "Rhodes University", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe alias repellendus deserunt velit, corrupti laudantium fugiat officiis quasi, fuga adipisci, quo voluptate praesentium. Fugiat blanditiis nulla nemo perferendis mollitia beatae id, aspernatur, deserunt ipsam maxime enim aliquam tenetur pariatur delectus fuga, consectetur et quisquam? Consectetur error repellat, voluptas iusto dicta veritatis. Quidem earum ipsa perspiciatis dolorum tenetur eum natus odit, repellat dicta? Iste id unde minus veniam necessitatibus adipisci dolores dolore corrupti, magnam libero placeat eaque quam ipsa officia sequi.", duration: "husidh", title: "ehuegfuyegehdi"

    },
  ]

  return (
    <div>
      <h1>Education</h1>
      {data.map((education) => (
        <EducationCard key={education.institution} education={education} />
      ))}
    </div>
  )
}
