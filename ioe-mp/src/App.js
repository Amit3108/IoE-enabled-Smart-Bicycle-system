import React from "react";
import Analysis from "./components/Analysis";
import Navbar from "./components/Navbar";
import TableData from "./components/TableData";
import './App.css';
function App() {
  return (
    <div className="body">
      <Navbar />
      <div className="main-content" >
        <div className="tabledata" style={{marginTop: "8vh"}}><TableData /></div>
        <div className="analysis" style={{marginTop: "8vh"}}><Analysis /></div>
      </div>
    </div>
  );
}

export default App;
