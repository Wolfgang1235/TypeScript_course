export default {
    ratings: (parent:{id:number}, _args:never, {ratings}) => ratings.filter((rating) =>
    rating.bookId === parent.id),
    rating_average: (parent:{id:number}, _args:never, {ratings}) => {
        const ratingsForBook = ratings.filter((rating) => rating.bookId === parent.id);
        if (ratingsForBook.length === 0) {
            return 0;
        }
        const sum = ratingsForBook.reduce((acc, rating) => acc + rating.value, 0);
        return sum / ratingsForBook.length;
    }
};