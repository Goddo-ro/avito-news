import {useContext} from "react"
import {Context} from "../NewsContext"
import Item from "../components/Item"


function News() {
    const {news, updateNews} = useContext(Context);

    const newsItems = news.map(item => <li key={item.id}>
                                            <Item author={item.by}
                                                title={item.title}
                                                score={item.score}
                                                time={item.time}
                                                id={item.id}/>
                                        </li>
                                )

    return (
        <section className="news">
            <button onClick={updateNews}>Update news</button>
            <ol className="news-container">
                {newsItems}
            </ol>
        </section>
    )
}

export default News;