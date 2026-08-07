// React
import React, { Component } from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Actions
import { loadUser } from './actions/authAction';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

// Components
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/shopping-list';
import ItemModal from './components/itemModal';

// CSS
import './App.css';

 

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
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