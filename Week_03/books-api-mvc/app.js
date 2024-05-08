const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController");

//reqruire is used to import stuff...
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/books", booksController.getAllBooks);
app.post("/books", booksController.createBook);
app.put("/books/:id", BooksController.updateBook);
app.delete("/books/:id", BooksController.deleteBook);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port ${port}");
});

//Step 8
const validateBook = require("./middlewares/validateBook");
app.post("/books", validateBook, booksController.createBook);
app.put("/books/:id", validateBook, booksController.updateBook);
