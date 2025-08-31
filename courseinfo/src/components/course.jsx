
const Header = ({ course }) => {
    return <h1>{course}</h1>
}
const Content = ({ contents }) => {
    return contents.map(content => <Part key={content.id} name={content.name} exercises={content.exercises} />)

}
const Part = ({ name, exercises }) => {
    return (<p>{name} {exercises}</p>
    )
}
const Total = ({ exercises }) => {
    return <p><b> Total of {exercises} exercises </b></p>
}

const Course = ({ course }) => {
    return <>
        <Header course={course.name} />
        <Content contents={course.parts} />
        <Total exercises={course.parts.map(part => part.exercises).reduce((acc, curr) => acc + curr, 0)} />
    </>
}

export default Course;