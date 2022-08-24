import {useContext} from "react"
import {Context} from "../NewsContext"
import Item from "../components/Item"


function News() {
    const news = useContext(Context);

    console.log(news);

    const newsItems = news.map(item => <Item author={item.by}
                                            comments={item.kids}
                                            title={item.title}
                                            score={item.score}
                                            time={item.time}
                                            key={item.id}
                                            id={item.id}
                                />)

    return (
        <ol className="news-container">
            {newsItems}
        </ol>
    )
}

export default News;