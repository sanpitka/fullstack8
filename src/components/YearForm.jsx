import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const YearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  if (result.loading) return <p>Loading...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;
  
  const authors = result.data.allAuthors
  
  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    
    editBirthyear({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select 
            value={name} 
            onChange={({ target }) => setName(target.value)}>
            <option value="">Select author...</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default YearForm