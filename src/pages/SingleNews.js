import {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import { trackPromise } from 'react-promise-tracker'
import Item from "../components/Item"
import Comment from "../components/Comment"
import {nanoid} from "nanoid"

function SingleNews() {
    const [item, setItem] = useState({});
    const [comments, setComments] = useState([]);
    const {newsId} = useParams();
    const history = useHistory();

    useEffect(() => {
        let interval;
        trackPromise(
            fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    setItem(data);
                    updateComments(data.kids);
                    interval = setInterval(() => {updateComments(data.kids)}, 1000 * 60);
                })
        )
        return () => {
            clearInterval(interval);
        }
    }, []);


    function updateComments(ids) {
        if (!ids) return;
        setComments([]);
        ids.forEach(id => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    if (!data.dead) {
                        setComments(oldComms => [...oldComms, <Comment text={data.text}
                                                                        author={data.by}
                                                                        time={data.time}
                                                                        kids={data.kids}
                                                                        parent={data.parent}
                                                                        key={nanoid()}
                                                                        marginLeft={0}
                                                                />])
                    }
                })
        })
    }

    return (
        <section className="single-news">
            <button onClick={() => {history.goBack()}}>Go back</button>
            <div className="item">
                <Item author={item.by}
                        title={item.title}
                        score={item.score}
                        time={item.time}
                        url={item.url}
                        key={nanoid()}
                        id={item.id}
                />
            </div>
            <h5>Comments</h5>
            <button onClick={() => {updateComments(item.kids)}}>Update comments</button>
            {comments}
        </section>
    )
}


export default SingleNews;