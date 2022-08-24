import React, {useContext} from "react"
import {Context} from "../../NewsContext"
import owl from "../../images/owl.png"
import "./Header.css"


function Header() {
    const {updateNews} = useContext(Context);

    return (
        <header>
            <div>
                <img src={owl} />
                <h2>News by <span>K</span>irill</h2>
            </div>
            <button onClick={updateNews}>Update news</button>
        </header>
    )
}


export default Header;