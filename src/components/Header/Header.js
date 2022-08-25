import React, {useContext} from "react"
import {Context} from "../../NewsContext"
import RefreshButton from "../RefreshButton"
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
            <RefreshButton refresh={updateNews} />
        </header>
    )
}


export default Header;