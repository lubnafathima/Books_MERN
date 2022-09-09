import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CreateBook from './components/CreateBook';
import ShowBookDetails from './components/ShowBookDetails';
import ShowBookList from './components/ShowBookList';
import UpdateBookInfo from './components/UpdateBookInfo';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path='/' element={ShowBookList} />
        <Route exact path='/create-book' element={CreateBook} />
        <Route exact path='/edit-book/:id' element={UpdateBookInfo} />
        <Route exact path='/show-book/:id' element={ShowBookDetails} />
      </div>
    );
  }
}

export default App;