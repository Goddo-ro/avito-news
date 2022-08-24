import React, { useEffect, useState } from "react";

const Context = React.createContext();


function ContextProvider({children}) {
    const [news, setNews] = useState([]);

    useEffect(() => {
       updateNews();
       const interval = setInterval(() => {updateNews()}, 1000 * 60);
       return () => {
        clearInterval(interval);
       }
    }, [])


    function updateNews() {
        setNews([]);
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
    }


    return (
        <Context.Provider value={{news, updateNews}}>
            {children}
        </Context.Provider>
    )
}


export {ContextProvider, Context}