import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import GenreFilter from "./GenreFilter";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) return <p>Loading...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <div>
        {selectedGenre ? <>in genre <strong>{selectedGenre}</strong></> : null}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <GenreFilter 
          selectedGenre={selectedGenre} 
          setSelectedGenre={setSelectedGenre} 
        />
      </div>
    </div>
  );
};

export default Books;
