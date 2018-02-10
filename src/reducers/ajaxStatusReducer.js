import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypesEndsinSuccess(type){
  return type.substring(type.length-8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress , action){
  if(action.type== types.BEGIN_AJAX_CALL){
    return state +1;
  }else if(actionTypesEndsinSuccess(action.type)){
    return state - 1;
  }
  return state;
}