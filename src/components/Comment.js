import {useEffect, useState} from "react"
import timeSince from "../timeSince"


function Comment(props) {
    const [kids, setKids] = useState([]);

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
        if (props.kids) {
            props.kids.forEach(id => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(res => res.json())
                    .then(data => setKids(oldKids => [...oldKids, data]))
            })
        }
    }, [])


    const commentsElements = kids.map(comment => <Comment text={comment.text}
                                                            author={comment.by}
                                                            time={comment.time}
                                                            kids={comment.kids}
                                                            parent={comment.parent}
                                                            key={comment.id}
                                                            marginLeft={props.marginLeft + 5}
                                                    />)

    const date = new Date(props.time * 1000);

    return (
        <>
            <div className="comment" style={{marginLeft: `${props.marginLeft * 10}px`}}>
                <div className="upload-info">
                    <p>
                        By {props.author} 
                    </p>
                    <a href="" className="date" title={date.toLocaleDateString()}>
                        {timeSince(date)} ago
                    </a>
                </div>
                <p>{decodeEntities(props.text)}</p>
            </div>
            {commentsElements}
        </>
    )
}


export default Comment;