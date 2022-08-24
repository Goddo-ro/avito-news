import React, { useEffect, useState } from "react";

const Context = React.createContext();


function ContextProvider({children}) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 100; i++) {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)
                .then(res => res.json())          
                .then(data => {
                setNews(oldNews => [...oldNews, data])
            });
            }
        });
    }, [])


    return (
        <Context.Provider value={{news}}>
            {children}
        </Context.Provider>
    )
}


export {ContextProvider, Context}