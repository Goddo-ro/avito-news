import React from "react"
import {Context} from "../NewsContext"


function Header() {
    const {updateNews} = React.useContext(Context);

    return (
        <header>
            <h2>News by Kirill</h2>
            <button onClick={updateNews}>Update News</button>
        </header>
    )
}


export default Header;