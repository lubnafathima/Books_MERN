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
- Let's install the following dependencies in server. Type the following command in `server terminal`  
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
`$ npm run app`  
- If you get any error at this point, then run the commands below:  
```
 npm install

 npm run app
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
`npm run app`   
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
const Book = require('../../models/Book');

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
  
module.exports = Book = mongoose.model('book', BookSchema);
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


# Adding feature components  
# Connecting the frontend and backend  
# Running the frontend and backend  
# Testing our MERN stack app in the browser  