import { gql} from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!) {
    addBook(title: $title, author: $author, published: $published) {
      title
      author {
        name
      }
    }
  }
`;

export { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK };
