import { useQuery } from "@apollo/client/react";
import { ALL_AUTHORS } from "../queries";
import YearForm from "./YearForm";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return <p>Loading...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <YearForm />
      </div>
    </div>
  );
};

export default Authors;
