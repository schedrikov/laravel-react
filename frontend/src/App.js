import React from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import RoutesContent from "./components/RoutesContent/RoutesContent";

function App() {
    return (
      <BrowserRouter>
        <div className="container">
            <RoutesContent />
        </div>
      </BrowserRouter>
  );
}

export default App;
