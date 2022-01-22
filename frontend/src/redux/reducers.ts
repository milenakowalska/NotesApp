import { ACTIONS } from "../consts/redux";
import { IState, IAction } from "../types/redux";
import { combineReducers } from "redux";

const initialState: IState = {
  isLoading: false,
  isError: null,
  data: {},
};

const notesReducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case ACTIONS.GET_NOTES_STARTED:
    case ACTIONS.CREATE_NOTE_STARTED:
    case ACTIONS.EDIT_NOTE_STARTED:
    case ACTIONS.DELETE_NOTE_STARTED:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };

    case ACTIONS.GET_NOTES_ERROR:
    case ACTIONS.CREATE_NOTE_ERROR:
    case ACTIONS.EDIT_NOTE_ERROR:
    case ACTIONS.DELETE_NOTE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };

    case ACTIONS.GET_NOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        data: action.payload,
      };

    case ACTIONS.CREATE_NOTE_SUCCESS:
    case ACTIONS.EDIT_NOTE_SUCCESS:
    case ACTIONS.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: null,
      };

    default:
      return state;
  }
};

export const reducer = combineReducers({ notes: notesReducer });
