import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, deleteItems } from "../actions/itemAction";

class ShoppingList extends Component {
  static propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }
onDeleteClick = (id) =>{
  console.log(id);
  this.props.deleteItems(id);
}
  render() {
     console.log(this.props.item);
    const { items } = this.props.item;

    return (
      <Container>

       

        <ListGroup>

          {items.map(({ _id, name }) => (
            <ListGroupItem key={_id}>
              { this.props.isAuthenticated ? (
                <Button
                className="remove-btn"
                color="danger"
                size="sm"
                style={{ marginRight: "1rem" }}
                onClick={this.onDeleteClick.bind(this,_id)}
              >
                &times;
              </Button>
               ) : null}
              
              {name}

            </ListGroupItem>
          ))}

        </ListGroup>

      </Container>
    );
  }
}



const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItems }
)(ShoppingList);