import {Link} from "react-router-dom"
import timeSince from "../timeSince"


function Item(props) {
    const date = new Date(props.time * 1000);

    function getLocation(url) {
      let l = document.createElement("a");
      l.href = url;
      return l.hostname;
    }

    return (
      <>
        <Link to={`news/${props.id}`}>
            <h3>{props.title}</h3>
        </Link>
        {props.url ? <a href={props.url}>{getLocation(props.url)}</a> : ""}
        <div className="upload-info">
            <p>
                {props.score} points by
            </p>
            <p>
                {props.author} 
            </p>
            <a href="" className="date" title={date.toLocaleDateString()}>
                {timeSince(date)} ago
            </a>
        </div>
      </>
    )   
}


export default Item;