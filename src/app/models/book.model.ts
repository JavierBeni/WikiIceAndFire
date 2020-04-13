
export class Book {
    url: string;
    name: string;
    isbn: string;
    authors: string[];
    numberOfPages: number;
    publisher: string;
    country: string;
    mediaType: string;
    released: string;
    characters: string[];
    povCharacters: string[];

    constructor() {
        this.url = '';
        this.name = '';
        this.isbn = '';
        this.authors = [];
        this.numberOfPages = 0;
        this.publisher = '';
        this.country = '';
        this.mediaType = '';
        this.released = '';
        this.characters = [];
        this.povCharacters = [];
    }
}

