import {books, ratings} from "../data";

export default {
    addBook: (_parent, {input}, _context) => {
        const book = {
            id: books.length + 1,
            title: input.title,
            author: input.author
        }
        books.push(book);
        return book;
    },
    deleteBook: (_parent, {id}, _context) => {
        const book = books.find(book => book.id === parseInt(id));
        books.splice(books.indexOf(book),1);
        return book;
    },
    createRating: (_parent, {input}, _context) => {
        const newRating = {
            id: ratings.length + 1,
            value: input.value,
            title: input.title,
            description: input.description,
            bookId: parseInt(input.bookId),
        };
        ratings.push(newRating);
        return newRating;
    }
}