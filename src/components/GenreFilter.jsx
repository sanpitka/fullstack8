import { ALL_GENRES } from "../queries";
import { useQuery } from "@apollo/client/react";

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  const { data, loading, error } = useQuery(ALL_GENRES, {
    fetchPolicy: 'no-cache'
  });
    if (loading) return <p>Loading genres...</p>;
    if (error) return <p>Error loading genres: {error.message}</p>;

  const genres = data.allGenres;

  return (
    <div>
      {genres.map((genre) => (
        <button 
          key={genre} 
          onClick={() => setSelectedGenre(genre)}
          style={{
            fontWeight: genre === selectedGenre ? 'bold' : 'normal'
          }}
        >
          {genre}
        </button>
      ))}
      <button 
        onClick={() => setSelectedGenre(null)}
        style={{
          fontWeight: selectedGenre === null ? 'bold' : 'normal'
        }}>all genres</button>
    </div>
  );
};

export default GenreFilter;