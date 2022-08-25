import { nanoid } from "nanoid";
import {useEffect, useState} from "react"
import { trackPromise } from 'react-promise-tracker'
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

    function updateKids() {
        if (!props.kids) return;
        setShowingKids(true);
        props.kids.forEach(id => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    if (!data.deleted) {
                        setComments(oldComments => [...oldComments, 
                                                    <Comment text={data.text}
                                                            author={data.by}
                                                            time={data.time}
                                                            kids={data.kids}
                                                            parent={data.parent}
                                                            key={nanoid()}
                                                            marginLeft={50}
                                                    />]
                                    );
                    }
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
                    <a className="date" title={date.toString()}>
                        {timeSince(date)} ago
                    </a>
                </div>
                <p>{decodeEntities(props.text)}</p>
                {isShowingKids 
                    ? comments
                    : props.kids && <a className="show-replies" 
                                        onClick={() => {updateKids(true)}}>
                                            Show replies
                                    </a>}
            </div>
        </>
    )
}


export default Comment;