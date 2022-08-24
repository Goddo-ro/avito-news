import {useContext} from "react"
import {Context} from "../NewsContext"


function News() {
    const news = useContext(Context);

    return <h1>News</h1>
}

export default News;