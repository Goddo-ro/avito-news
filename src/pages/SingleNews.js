import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import { trackPromise } from 'react-promise-tracker'
import RefreshButton from "../components/RefreshButton"
import Item from "../components/Item"
import Comment from "../components/Comment"
import {nanoid} from "nanoid"

function SingleNews() {
    const [item, setItem] = useState({});
    const [comments, setComments] = useState([]);
    const {newsId} = useParams();

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


    function updateComments(ids = item.kids) {
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
            <div className="comments-title">
                <h5>Comments</h5>
                <RefreshButton refresh={updateComments} size="14px" />
            </div>
            {comments}
        </section>
    )
}


export default SingleNews;