class Book {
  constructor(id, title, aurthor) {
    this.id = id;
    this.title = title;
    this.author = this.author;
  }
}
module.exports = Book;
const books = [
  { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];

class Book {
  contrusctor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
  static async getAllBooks() {
    return books;
  }
  static async getBookById(id) {
    const books = await this.getAllBooks();
    const book = books.find((book) => book.id === id);
    return book;
  }
  static async createBook(newBookData) {
    const books = await this.getAllBooks();
    const newBook = new Book(
      books.length + 1,
      newBookData.title,
      newBookData.author
    );
    book.push(newBook);
    return newBook;
  }
}
