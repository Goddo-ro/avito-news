import { IconContext } from "react-icons";
import {IoMdRefresh} from "react-icons/io"


function refreshButton(props) {
    function refreshContent() {
        props.refresh();
        const provider = document.querySelector(".icon-provider");
        provider.classList.add("refresh-start");
        
        setTimeout(function () {
            provider.classList.remove("refresh-start");
        }, 2000)
    }

    return (
        <button id="refresh-button" onClick={refreshContent}>
            <IconContext.Provider value={{ size: "2rem", className: "icon-provider" }}>
                <div>
                    <IoMdRefresh id="refresh-icon" />
                </div>
            </IconContext.Provider>
        </button>
    )
}


export default refreshButton;