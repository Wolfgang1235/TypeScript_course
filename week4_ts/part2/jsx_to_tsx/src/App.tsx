import React from "react";
import "./App.css";
import ButtonComponent from "./buttonComponent.js";

const App: React.FC = (): JSX.Element =>{
    return (
        <div>
            <ButtonComponent initialCount={7} changeFactor={2} />
        </div>
    );
}

export default App;
