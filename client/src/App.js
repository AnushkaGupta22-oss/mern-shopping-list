import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import './App.css';
import ShoppingList from './components/shopping-list';
import ItemModal from './components/itemModal';
import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

 

class App extends Component{
 render() {
    return (
    <Provider store = {store}>
    <div className="App">
      <AppNavBar />
      <Container>
      <ItemModal />
      <ShoppingList/>
      </Container>
    </div>
    </Provider>
  );
}
}


export default App;