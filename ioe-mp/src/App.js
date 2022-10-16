import React from "react";
import Analysis from "./components/Analysis";
import Navbar from "./components/Navbar";
import TableData from "./components/TableData";
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="tabledata"><TableData /></div>
        <div className="analysis"><Analysis /></div>
      </div>
    </>
  );
}

export default App;
