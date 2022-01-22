import { ACTIONS, API } from "../consts/redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const getNotes: any = () => {
  return (dispatch: any) => {
    dispatch({ type: ACTIONS.GET_NOTES_STARTED });
    fetch(API + "/notes")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.GET_NOTES_SUCCESS, payload: data })
      )
      .catch((error) =>
        dispatch({ type: ACTIONS.GET_NOTES_ERROR, payload: error })
      );
  };
};

export const createNote: any = (newNote: any) => {
  return (dispatch: any) => {
    dispatch({ type: ACTIONS.CREATE_NOTE_STARTED });
    fetch(API + "/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((data) =>
        dispatch({ type: ACTIONS.CREATE_NOTE_SUCCESS, payload: data })
      )
      .catch((error) =>
        dispatch({ type: ACTIONS.CREATE_NOTE_ERROR, payload: error })
      );
  };
};

export const getNote: ThunkAction<void, any, unknown, any> = (noteId) => {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: ACTIONS.GET_NOTE_STARTED });
    fetch(API + "/note/" + noteId)
      .then((data) =>
        dispatch({ type: ACTIONS.GET_NOTE_SUCCESS, payload: data })
      )
      .catch((error) =>
        dispatch({ type: ACTIONS.GET_NOTE_ERROR, payload: error })
      );
  };
};

export const editNote: ThunkAction<void, any, unknown, any> = (
  noteId,
  noteData
) => {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: ACTIONS.EDIT_NOTE_STARTED });
    fetch(API + "/note/" + noteId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    })
      .then((data) =>
        dispatch({ type: ACTIONS.EDIT_NOTE_SUCCESS, payload: data })
      )
      .catch((error) =>
        dispatch({ type: ACTIONS.EDIT_NOTE_ERROR, payload: error })
      );
  };
};

export const deleteNote: ThunkAction<void, any, unknown, any> = (
  noteId: any
) => {
  return (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: ACTIONS.DELETE_NOTE_STARTED });
    fetch(API + "/note/" + noteId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: noteId,
    })
      .then((data) =>
        dispatch({ type: ACTIONS.DELETE_NOTE_SUCCESS, payload: data })
      )
      .catch((error) =>
        dispatch({ type: ACTIONS.DELETE_NOTE_ERROR, payload: error })
      );
  };
};
