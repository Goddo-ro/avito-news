import { nanoid } from "nanoid";
import {useEffect, useState} from "react"
import timeSince from "../timeSince"


function Comment(props) {
    const [comments, setComments] = useState([]);
    const [isShowingKids, setShowingKids] = useState(false);
    const date = new Date(props.time * 1000);

    const decodeEntities = (function() {
        var element = document.createElement('div');
      
        function decodeHTMLEntities (str) {
          if(str && typeof str === 'string') {
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
          }
      
          return str;
        }
      
        return decodeHTMLEntities;
      })();


    useEffect(() => {
        updateKids()
    }, [])


    function updateKids() {
        if (!props.kids) return;
        props.kids.forEach(id => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    setComments(oldComments => [...oldComments, <Comment text={data.text}
                                                                                    author={data.by}
                                                                                    time={data.time}
                                                                                    kids={data.kids}
                                                                                    parent={data.parent}
                                                                                    key={nanoid()}
                                                                                    marginLeft={50}
                                                                            />]
                );
            })
        })
    }

    return (
        <>
            <div className="comment" style={{marginLeft: `${props.marginLeft}px`}}>
                <div className="upload-info">
                    <p>
                        By {props.author} 
                    </p>
                    <a href="" className="date" title={date.toLocaleDateString()}>
                        {timeSince(date)} ago
                    </a>
                </div>
                <p>{decodeEntities(props.text)}</p>
                {isShowingKids 
                    ? comments
                    : props.kids && <a onClick={() => {setShowingKids(true)}}>Show replies</a>}
            </div>
        </>
    )
}


export default Comment;