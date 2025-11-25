const DataLoader = require('dataloader')
const Book = require('./models/book')

const bookCountLoader = new DataLoader(async (authorIds) => {
    const books = await Book.find({ author: { $in: authorIds } })
    const bookCountByAuthor = {}
    books.forEach(book => {
        const authorId = book.author.toString()
        bookCountByAuthor[authorId] = (bookCountByAuthor[authorId] || 0) + 1
    });
    return authorIds.map(authorId => bookCountByAuthor[authorId.toString()] || 0)
})

module.exports = {
    bookCountLoader
}