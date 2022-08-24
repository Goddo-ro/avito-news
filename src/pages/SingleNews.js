import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Item from "../components/Item"
import Comment from "../components/Comment"

function SingleNews() {
    const [item, setItem] = useState({});
    const [comments, setComments] = useState([]);
    const {newsId} = useParams();

    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
            .then(res => res.json())
            .then(data => {
                setItem(data)
                updateComments(data.kids);
                
            });
    }, []);


    function updateComments(ids) {
        if (!ids) return;
        ids.forEach(id => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    setComments(oldComms => [...oldComms, data])
                })
        })
    }

    const commentsElements = comments.map(comment => <Comment text={comment.text}
                                                            author={comment.by}
                                                            time={comment.time}
                                                            kids={comment.kids}
                                                            parent={comment.parent}
                                                            key={comment.id}
                                                            marginLeft={0}
                                        />)

    return (
        <>
            <Item author={item.by}
                    title={item.title}
                    score={item.score}
                    time={item.time}
                    url={item.url}
                    key={item.id}
                    id={item.id}
            />
            {commentsElements}
        </>
    )
}


export default SingleNews;