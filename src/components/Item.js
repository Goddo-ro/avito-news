import {Link} from "react-router-dom"


function Item(props) {
    return (
        <Link to={`news/${props.id}`}>
            <li className="news-item">
                <h3>{props.title}</h3>
            </li>
        </Link>
    )   
}


export default Item;