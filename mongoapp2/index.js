const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/books', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=> console.log('Connected to DB ....'))
  .catch((error)=> console.error(error));


  const asc =   new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description:{
      type: String,
      required:true
  },
  age:{
      type: Number,
      required:true
  }
})
  const Author = mongoose.model('Author', asc);

  const Book = mongoose.model('Book', 
  new mongoose.Schema({
      name: {
          type: String,
          required:true
      },
      description:{
        type: String,
        required:true
    },
    author:[asc]
    // author:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Author' 
    // } 
  })
  );

 async function createAuthor(name ,description , age) {
      const author = Author({
        name ,description , age
      })
      const result = await author.save();
      console.log(result);
  }

  async function createBook(name ,description , author) {
    const book = Book({
      name ,description , author
    })
    const result = await book.save();
    console.log(result);
}

async function getBooks() {
    const books = await Book.find()
    .populate('author', 'name age -_id') 
    .select('name description -_id')
    console.log(books);
}


// createAuthor('Ahmed Osama' ,'Network Engineer' , 34) ;

//  createBook('Node JS' ,'Node JS ES6 API' , '5edfba13ad6ce653db1b536b') 

//getBooks()

createBook('Python Data' ,'Using Python in Data analysis' , 
[new Author({name: 'Fahad Taha',
description:'Python developer', age:23}),
new Author({name: 'Marwan Jalal',
description:'Python Engineer', age:30}),
new Author({name: 'Osama Ismail',
description:'Python Web developer', age:40})]


) 