type Book = {
    id: string;
    title: string;
    author: string;
    rating_average: number;
    url: string;
    description: string;
    category: Category;
}

type Category = {
    id: string;
    name: string;
    books: Book[];
}
type Theme = {
    isLight: boolean;
    light: {
        text: string;
        ui: string;
    };
    dark: {
        text: string;
        ui: string;
    };
    red: {
        text: string;
        ui: string;
    };
    blue: {
        text: string;
        ui: string;
    }
};

export type {Book, Category, Theme}