import React, {useContext} from "react"
import {useLocation} from "react-router-dom"
import {Context} from "../../NewsContext"
import RefreshButton from "../RefreshButton"
import owl from "../../images/owl.png"
import "./Header.css"


function Header() {
    const {updateNews} = useContext(Context);
    const location = useLocation();

    return (
        <header>
            <div>
                <img src={owl} />
                <h2>News by <span>K</span>irill</h2>
            </div>
            {location.pathname === "/" && <RefreshButton refresh={updateNews} />}
        </header>
    )   
}


export default Header;