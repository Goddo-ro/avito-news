import {useContext} from "react"
import {Context} from "../NewsContext"
import Item from "../components/Item"


function News() {
    const {news} = useContext(Context);

    const newsItems = news.map(item => <div key={item.id} className="item">
                                            <Item author={item.by}
                                                title={item.title}
                                                score={item.score}
                                                time={item.time}
                                                id={item.id}
                                                index={news.indexOf(item) + 1}/>
                                        </div>
                                )

    return (
        <section className="news">
            <ol className="news-container">
                {newsItems}
            </ol>
        </section>
    )
}

export default News;