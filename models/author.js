const mongoose = require("mongoose");
const Book = require("./book");
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//setting constraing to how delet an author in database
// without deleting the books or items it has with his name inside the database
authorSchema.pre("remove", function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(
        new Error(
          "This author has books still, remove all book from this author before deleting author"
        )
      );
    } else {
      next();
    }
  });
});
module.exports = mongoose.model("Author", authorSchema);
