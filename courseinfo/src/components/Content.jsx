import { Part } from './Part.jsx'

export const Content = ({ contents }) => {
  return contents.map(content => <Part key={content.id} name={content.name} exercises={content.exercises} />)

}