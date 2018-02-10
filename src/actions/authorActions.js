import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadlAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS , authors};
}

export function loadAuthors(){
  return function(dispatch){
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadlAuthorSuccess(authors));
    }).catch(err => {
      throw(err);
    });
  };
}
