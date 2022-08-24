import {Link} from "react-router-dom"


function Item(props) {
    const date = new Date(props.time * 1000);


    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }


    return (
        <li className="news-item">
            <Link to={`news/${props.id}`}>
                <h3>{props.title}</h3>
            </Link>
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
        </li>
    )   
}


export default Item;