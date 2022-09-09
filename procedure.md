# Content:
- What is the MERN stack?
- Server setup with Express.js and Node.js  
- Database management with MongoDB  
- Building RESTful APIs with the MERN stack  
- Building the frontend  
- Setting up Create React App  
- Initial project structure  
- Frontend tasks and features  
- Adding feature components  
- Connecting the frontend and backend  
- Running the frontend and backend  
- Testing our MERN stack app in the browser  

# What is the MERN stack?  
The phrase MERN stack refers to the following technologies:  

- MongoDB, a cross-platform document-oriented database program  
- Express.js, a web application framework for Node.js  
- React, a JavaScript library for building user interfaces  
- Node.js, an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser  

# Server setup with Express.js and Node.js:  
- You’ll also need any version of Node.js greater than 8.10 and any version of npm greater than 5.6 installed on your local development machine.  
## npm package initialization  
- create a folder for backend(server) and enter the following command in terminal(make sure you are inside the folder in terminal)  
`npm init -y`  
> Here `y` represents yes to everything, hence it is optional  
- if you didn't given `y` in above code, click **Enter** in each step  
![npm init](https://blog.logrocket.com/wp-content/uploads/2019/07/npm-package.json-file-e1562600260796.png)  
  
- You can see that `package.json` file would have been created  

## Installing dependencies
- Let's install the following dependencies in server. Type the following command in `server` terminal:   
`npm i express mongoose body-parser bcryptjs validation config nodemon`  
![dependencies](https://blog.logrocket.com/wp-content/uploads/2019/07/adding-project-file-dependencies-e1562600284195.png)  
**bcryptjs** is a password hashing function designed by Niels Provos and David Mazières
-- **body-parser** allows us to get the data throughout the request
-- **express** is our main framework
-- **mongoose** is used to connect/interact with MongoDB
-- **validation** (as its name implies) is used for validation
-- **config** is for the global variable to run our project.
-- **nodemon** is a utility that will monitor for any changes in your source and automatically restart your server.  
> NOTE:Nodemon can be installed only once, and you can use it in all your future projects as well  
- At that point, your package.json should look like this:   
![package.json File With Dependencies](https://blog.logrocket.com/wp-content/uploads/2019/07/package.json-file-dependencies.png)

## Setting the entry point
- Now create a file named `index.js` for our entry point, inside our server folder.   
- Then paste the code below:  

```  
// index.js

import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));  
```
- Type the following code inside `package.json` below `"main" : "index.js`  
```   
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js"
  },
```  
> Note you have to replace the code inside script as well, like given above  
- So, now you can run your project using this command:  
`$ npm run dev`  
- If you get any error at this point, then run the commands below:  
```
 npm install

 npm run dev
```
- You will see the following changes in your terminal if everything goes right:  
![Running Project Successfully](https://blog.logrocket.com/wp-content/uploads/2019/07/running-project-successful.png)  

# Database management with MongoDB  
- our MERN database setup will be in **MongoDB**. For simplicity, we will use **MongoDB Atlas**.  
  
## Creating an account for MongoDB Atlas  
- MongoDB Atlas is a fully managed cloud database developed by the same team that built MongoDB.  
- First, you need an account. Create one and follow the procedure. After creating an account, you will see something like this:  
![MongoDB Atlas Homescreen](https://blog.logrocket.com/wp-content/uploads/2019/07/mongodb-homescreen-e1562599566295.png)  
- Click on the Project 0 section (top left) and you will see a button for creating a new project. Create a project and select the project.  
- Now, click on the Build a Cluster button from the project you have created. It will show you all the information. At the bottom, you will see a section called Cluster Name, click on that and enter a name for the database, then hit the Create Cluster button.  
- After two to three minutes, if everything goes well, you will find something like this:  
![Creating A Cluster In MongoDB Atlas](https://blog.logrocket.com/wp-content/uploads/2019/07/creating-cluster-mongodb.png)  
- Click on the CONNECT button and fill in the username and password form for your database.  
![Setting Up Our Connection](https://blog.logrocket.com/wp-content/uploads/2019/07/setting-up-connection-mongodb-atlas-e1562599847264.png)  
- Now hit the Create MongoDB User button. You can also choose either your current IP address or a different IP address, it’s up to you.  
- Now hit the Create MongoDB User button. You can also choose either your current IP address or a different IP address, it’s up to you.  
- Now, if you follow the CONNECT button or the Choose a connection method button, you will see some different methods. Select accordingly.  
![Connection Methods Options](https://blog.logrocket.com/wp-content/uploads/2019/07/connection-method-options-mongodb-e1562600007239.png)  
- In this case, select the Connect Your Application section.  
- Now you will get your database link, which we will use in our next step.  
[Connection String Output!](https://blog.logrocket.com/wp-content/uploads/2019/07/connection-string-output-mongodb.png)  
- Our database is ready — now we need to add it to our project.  
- Inside the project folder, create another folder named `config` and inside it create two files named `default.json` and `db.js`. Add the following code:  
```
// default.json

{
  "mongoURI":
    "mongodb+srv://mern123:<password>@mernatoz-9kdpd.mongodb.net/test?retryWrites=true&w=majority"
}
 /* Replace <password> with your database password */

/* ------------------------------------------------------------------ */
// db.js

import mongoose from 'mongoose';
import config from 'config';
import db from 'mongoURI';

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
```
- in `index.js` file let's connect to the database. Update your `index.js` with this:
```
// index.js

import express from 'express';
import connectDB from './config/db';

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));  
```  
- Now, you can run the project using the following command:  
`npm run dev`   
![Successfully Connected Server](https://blog.logrocket.com/wp-content/uploads/2019/07/successfully-connected-server.png)  

# Building RESTful APIs with the MERN stack  
- Create a folder named `routes`. In it, create another folder named `api`, which will hold all our APIs.  
- Inside the `api` folder, create a file named `books.js`. We will create some APIs here to show how it works in a moment.  
- Now update your `books.js` with the following code:  

```
// routes/api/books.js

import express from "express";
const router = express.Router();

// Load Book model
import Book from '../../models/Books.js'

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => res.json({ msg: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

export default router;
```
## Database model   
- In order to interact with our database, we need to create a model for each of our resources.  
- So, create a folder called `models` in the root, and inside the `models` folder, create a file called `Book.js` and update it with this:

```
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    published_date: {
      type: Date
    },
    publisher: {
      type: String
    },
    updated_date: {
      type: Date,
      default: Date.now
    }
  });
  
export default mongoose.model('Book', BookSchema);
```
- Run the project to see if everything is fine at this point  
-you can test all the APIs through Postman (note that before testing APIs using Postman, you need to run the project first). [You can download Postman here.](https://www.getpostman.com/)  

# Building the frontend  
- Now that we’ve set up our backend, it’s time to transition to the frontend part of this MERN stack tutorial.  
-  In this section, we’ll use React to build our user interfaces. React is a JavaScript library for building user interfaces.  
- It is maintained by Facebook and a community of individual developers and other companies.  
- We’ll use Create React App to generate our initial file setup. CRA is a comfortable environment for learning React and is the best way to start building applications in React.  
- It offers a modern build setup with no configuration.  
- We’ll also use webpack and Babel to bundle our modules and compile our JavaScript, respectively.  
- If you don’t know webpack or Babel well, no problem; you don’t need to install or configure tools like webpack or Babel.   
- They’re preconfigured and hidden so that you can focus on the code.  
- Just create a project, and you’re good to go.  

# Setting up Create React App  
- open a seperate terminal for frontend  
- make sure you are not inside the server folder in the terminal and type the following command:  
`npx create-react-app <your_client_project_name>`
- replace <your_client_project_name> with client side project name  
> For example, my project name is `client`, and my command is:  
> npx create-react-app client  
- Note: The project name must be in lowercase letters.  
- If everything goes right, then you will see something like the following image, where you will find some instructions along with the commands.  
![Project Successfully Created In Create React App](https://blog.logrocket.com/wp-content/uploads/2019/08/project-created-cra.png)
- Before using any built-in command, we need to go inside the project folder.  
`cd client`  
- Now that we are in the project directory, we can use those available commands.  
- If you’re using Yarn:  
`yarn start`  
- Or, if using npm:  
`npm start`  
- To run the app in development mode, you can use any of the above commands, and you will see the following message in your terminal.  
![Running App In Development Mode](https://blog.logrocket.com/wp-content/uploads/2019/08/run-app-development-mode.png)  
- you will be automatically redirected to your default browser  
- If not, open http://localhost:3000 to view it in the browser  
![Viewing Our App In The Browser](https://blog.logrocket.com/wp-content/uploads/2019/08/viewing-app-in-browser.png)  

# Initial project structure  
Inside the project directory, our initial file structure should look like this:  
![Our Initial Project Structure](https://blog.logrocket.com/wp-content/uploads/2019/08/initial-project-structure.png)  
## Adding Bootstrap and Font Awesome to your React app  
- We have got our initial setup file for the front-end part.  
- Now we can start integrating our back end with our front end.  
- Before that, though, I want to add Bootstrap and Font Awesome’s CDN to our project.  
- Open the file called `index.html`, which is in the public folder `client/public/index.html`, and replace everything with the following code:  
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app"/>
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!-- bootstrap css cdn -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- fontawesome cdn -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <title>Books | MERN</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!-- bootstrap JS cdn -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
```  

# Frontend tasks and features  
- We will work with five different features:  
-- Add, create or save a new book  
-- Show all the books we have stored in the database  
-- Show a single book  
-- Update a book  
-- Delete a book  

## Dependencies packages installation  
- Now, use the following command to add some necessary dependencies:  
```
npm install --save react-router-dom
npm install --save axios
```
- Axios is a lightweight HTTP client based similar to a Fetch API.  
- Axios is a promise-based async/await library for readable asynchronous code.  
- We can easily integrate with React, and it is effortless to use in any front-end framework.  
- We’ll call our APIs through Axios.  

## Package.json file  
- At this point, our `package.json` file should be similar to this;  
- versions may differ though  
```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.27.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
## Creating the component file  
- Inside the `src` folder `(client/src/)`, create another folder called `components`, and inside it, create five different files:  
-- CreateBook.js
-- ShowBookList.js
-- BookCard.js
-- ShowBookDetails.js
-- UpdateBookInfo.js  
- We will work with these five files a bit later.  
## Setup route  
- Open the folder called `App.js` inside the `src` folder `(client/src/App.js)`, and replace it with the following code:  
```
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';

class App extends Component {
  render () {
    return (
      <Router>
        <div>
        <Route exact path='/' component={ShowBookList} />
        <Route exact path='/create-book' component={CreateBook} />
        <Route exact path='/edit-book/:id' component={UpdateBookInfo} />
        <Route exact path='/show-book/:id' component={ShowBookDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
```  
- Here, we define all the routes.  
- For a specific path definition, its corresponding component will be rendered.  
- We have not implemented these files/components yet — just completed the path setup.  

## Updating the CSS file  
- Update a CSS file called App.css in the src folder with the following code:  
```
.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.CreateBook {
  background-color: #2c3e50;
  min-height: 100vh;
  color: white;
}

.ShowBookDetails {
  background-color: #2c3e50;
  min-height: 100vh;
  color: white;
}

.UpdateBookInfo {
  background-color: #2c3e50;
  min-height: 100vh;
  color: white;
}

.ShowBookList {
  background-color: #2c3e50;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100px;
  color: white;
}


/* BookList Styles */
.list {
  display: grid;
  margin: 20px 0 50px 0;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 2em;
}

.card-container {
  width: 250px;
  border: 1px solid rgba(0,0,.125);
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
}

.desc {
  height: 130px;
  padding: 10px;
}

.desc h2 {
  font-size: 1em;
  font-weight: 400;
}

.desc h3, p {
  font-weight: 300;
}

.desc h3 {
  color: #6c757d;
  font-size: 1em;
  padding: 10px 0 10px 0;
}
```

# Adding feature components  
- Now it’s time to add feature components to our MERN stack project.  
## Create a new book  
- Our `CreateBook.js` file is responsible for adding, creating, or saving a new book or a book’s info. So, update `CreateBook.js` with the following code:  
```
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateBook extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isbn:'',
      author:'',
      description:'',
      published_date:'',
      publisher:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher
    };

    axios
      .post('http://localhost:8082/api/books', data)
      .then(res => {
        this.setState({
          title: '',
          isbn:'',
          author:'',
          description:'',
          published_date:'',
          publisher:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateBook!");
      })
  };

  render() {
    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">
                  Create new book
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of the Book'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='ISBN'
                    name='isbn'
                    className='form-control'
                    value={this.state.isbn}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Describe this book'
                    name='description'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='published_date'
                    name='published_date'
                    className='form-control'
                    value={this.state.published_date}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Publisher of this Book'
                    name='publisher'
                    className='form-control'
                    value={this.state.publisher}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;
```
## Show all books
- The `ShowBookList.js` component will be responsible for showing all the books we already have stored in our database.  
- Update `ShowBookList.js` with this code:   
```
import React from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

class ShowBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/books')
      .then(res => {
        this.setState({
          books: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
  };


  render() {
    const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if(!books) {
      bookList = "there is no book record!";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Books List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-book" className="btn btn-outline-warning float-right">
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {bookList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;
```
## Creating a card for each book
- Here we use a functional component called `BookCard.js`, which takes a book’s info from `ShowBookList.js` and makes a card for each book.  
- Write the following code to update your `BookCard.js` file:  
```
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = (props) => {
    const  book  = props.book;

    return(
        <div className="card-container">
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-book/${book._id}`}>
                        { book.title }
                    </Link>
                </h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
            </div>
        </div>
    )
};

export default BookCard;
```
## Show a book’s info
- The `ShowBookDetails` component has one task: it shows all the info we have about any book.  
- We have both delete and edit buttons here to get access.  
```
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showBookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/books/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
          book: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowBookDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/books/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };


  render() {

    const book = this.state.book;
    let BookItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ book.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ book.author }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{ book.isbn }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{ book.publisher }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{ book.published_date }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{ book.description }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Book List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Book's Record</h1>
              <p className="lead text-center">
                  View Book's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { BookItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,book._id)}>Delete Book</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-book/${book._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Book
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

        </div>
      </div>
    );
  }
}

export default showBookDetails;
```
## Update a book’s info
- `UpdateBookInfo.js`, as its name indicates, is responsible for updating a book’s info.  
- An Edit Book button will trigger this component to perform.  
- After clicking Edit Book, we will see a form with the old info, which we will be able to edit or replace.  
```
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateBookInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isbn: '',
      author: '',
      description: '',
      published_date: '',
      publisher: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/books/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher
        })
      })
      .catch(err => {
        console.log("Error from UpdateBookInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher
    };

    axios
      .put('http://localhost:8082/api/books/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-book/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">
                  Update Book's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="isbn">ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={this.state.isbn}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={this.state.author}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this book'
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Published Date</label>
              <input
                type='date'
                placeholder='published_date'
                name='published_date'
                className='form-control'
                value={this.state.published_date}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">Publisher</label>
              <input
                type='text'
                placeholder='Publisher of this Book'
                name='publisher'
                className='form-control'
                value={this.state.publisher}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateBookInfo;
```
# Connecting the frontend and backend   
- We just implemented all of our components! Now we need a little change in our server-side (back-end) project.  
## Changes required on the backend  
- If we try to call our back-end API from the front-end part, it gets an error that says: “Access to XMLHttpRequest at ‘http://localhost:8082/api/books&#8217; from origin ‘http://localhost:3000&#8217; has been blocked by CORS policy: Response to preflight request doesn’t pass access control check: No ‘Access-Control-Allow-Origin’ header is present on the requested resource.”  
- To solve this, we need to install cors in our back-end (server-side) project.  
- Go to the project folder (e.g., MERN_A_to_Z) and run:  
`npm install cors`  
- Now, update `index.js` (the back end’s entry point) with the following code:
```
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
```

# Running the frontend and backend  
- Follow the steps below to run both the frontend and backend of our MERN stack example.  

## Run the server  
- In a seperate terminal, `cd server` and type the following:  
`npm run dev`
- If you get any error, then follow the commands below (inside the project folder):
```
npm install
npm run dev
```
## Run the client  
From the front-end project directory `cd client`, run the command below:  
`npm start`  
- If you get an error, again, follow the same commands below:
```
npm install
npm start
```
# Testing our MERN stack app in the browser  
