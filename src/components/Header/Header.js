import React, {useContext} from "react"
import {useLocation, useHistory} from "react-router-dom"
import {Context} from "../../NewsContext"
import RefreshButton from "../RefreshButton"
import { IconContext } from "react-icons";
import {IoMdArrowBack} from "react-icons/io"
import owl from "../../images/owl.png"
import "./Header.css"


function Header() {
    const {updateNews} = useContext(Context);
    const location = useLocation();
    const history = useHistory();

    return (
        <header>
            <div>
                {
                    location.pathname !== "/" &&
                        <button onClick={() => {history.goBack()}}>
                            <IconContext.Provider value={{ size: "2rem" }}>
                                <div>
                                    <IoMdArrowBack />
                                </div>
                            </IconContext.Provider>
                        </button>
                }
                <div className="title">
                    <img src={owl} />
                    <h2>News by <span>K</span>irill</h2>
                </div>
            </div>
            {location.pathname === "/" && <RefreshButton size="2rem" refresh={updateNews} />}
        </header>
    )   
}


export default Header;