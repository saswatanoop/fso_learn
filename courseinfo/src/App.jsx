const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
      
  
  const Header = ({course}) => {
    return <h1>{course}</h1>
  }
  const Content = ({contents}) => {
    return contents.map(content=> <Part key={content.part} part={content.part} exercises={content.exercises} />)
    
  }
  const Part = ({part, exercises}) => {
    return (<p>{part} {exercises}</p>
    )
  }
  const Total = ({exercises}) => {
    return <p>Number of exercises {exercises}</p>}

  return (
    <div>
      <Header course={course} />
      <Content contents={[{part: part1, exercises: exercises1}, {part: part2, exercises: exercises2}, {part: part3, exercises: exercises3}]} />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App