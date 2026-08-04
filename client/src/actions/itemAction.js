import axios from 'axios';
import { DELETE_ITEM, GET_ITEMS, ADD_ITEM, ITEMS_LOADING } from "./type";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
   .get('./api/item')
   .then(res => 
     dispatch({
      type: GET_ITEMS,
      payload: res.data

    })
  );
};
export const addItem = (item ) => dispatch => {
 axios  
    .post('./api/item', item)
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    );
};
export const deleteItems = (id) => dispatch => {
 axios
  .delete(`./api/item/${id}`)
  .then(res => 
   dispatch({
     type: DELETE_ITEM,
     payload: id
  })
  );
};



export const setItemsLoading =() => {
  return{
    type: ITEMS_LOADING
  }
}