import { IconContext } from "react-icons";
import {IoMdRefresh} from "react-icons/io"


function refreshButton(props) {
    return (
        <button onClick={props.refresh}>
            <IconContext.Provider value={{ size: "2rem", className: "refresh-icon" }}>
                <div>
                    <IoMdRefresh />
                </div>
            </IconContext.Provider>
        </button>
    )
}


export default refreshButton;