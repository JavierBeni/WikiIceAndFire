
export class Character {
    url: string;
    name: string;
    gender: string;
    culture: string;
    born: string;
    died: string;
    titles: string[];
    aliases: string[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: string[];
    books: string[];
    povBooks: string[];
    tvSeries: string[];
    playedBy: string[];

    constructor() {
        this.url = '';
        this.name = '';
        this.gender = '';
        this.culture = '';
        this.born = '';
        this.died = '';
        this.titles = [];
        this.aliases = [];
        this.father = '';
        this.mother = '';
        this.spouse = '';
        this.allegiances = [];
        this.books = [];
        this.povBooks = [];
        this.tvSeries = [];
        this.playedBy = [];
    }
}