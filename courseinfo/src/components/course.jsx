
import { Total } from "./Total.jsx"
import { Content } from "./Content.jsx"
import { Header } from "./Header.jsx"


export const Course = ({ course }) => {
    return <>
        <Header course={course.name} />
        <Content contents={course.parts} />
        <Total exercises={course.parts.map(part => part.exercises).reduce((acc, curr) => acc + curr, 0)} />
    </>
}

