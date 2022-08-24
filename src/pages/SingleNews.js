import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Item from "../components/Item"


function SingleNews() {
    const [item, setItem] = useState({})
    const {newsId} = useParams();

    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, []);

    function updateComments() {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
            .then(res => res.json())
            .then(data => setItem(oldItem => ({...oldItem, kids: data.kids})));
    }

    return (
        <Item author={item.by}
                title={item.title}
                score={item.score}
                time={item.time}
                url={item.url}
                key={item.id}
                id={item.id}
        />
    )
}


export default SingleNews;