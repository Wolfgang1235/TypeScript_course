import {useContext} from "react";
import {ThemeContext} from "../contexts/ThemeContext";


export default function Content() {
    const {isLight, light, red} = useContext(ThemeContext);
    const theme = isLight ? light : red;
    return (
        <div className="content" style={{background:theme.ui, color: theme.text}}>
            <h1>Content</h1>
        </div>
    )
}