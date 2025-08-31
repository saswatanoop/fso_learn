const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
      
  
  const Header = ({course}) => {
    return <h1>{course}</h1>
  }
  const Content = ({contents}) => {
    return contents.map(content=> <Part key={content.name} name={content.name} exercises={content.exercises} />)
    
  }
  const Part = ({name, exercises}) => {
    return (<p>{name} {exercises}</p>
    )
  }
  const Total = ({exercises}) => {
    return <p>Number of exercises {exercises}</p>}

  return (
    <div>
      <Header course={course.name} />
      <Content contents={course.parts} />
      <Total exercises={course.parts.map(part=>part.exercises).reduce((acc, curr) => acc + curr, 0)} />
    </div>
  )
}

export default App