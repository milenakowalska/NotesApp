import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "./redux/actionsCreator";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  const getNotesState = () => {
    dispatch(getNotes());
    console.log(notes);
  };

  return <div className="App"><button onClick={getNotesState}>get notes</button> </div>;
}

export default App;
