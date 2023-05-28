import { useEffect, useRef, useState } from "react"
import { port } from "../constant";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

export default function MyPost({ accessToken, user }) {
    const myPost = useRef();
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserPost = async () => {
        const res = await fetch(`${port}/articles?author=${user}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        setArticles(dta.articles);
    }

    useEffect(() => {
        // setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1400)
        getUserPost();
    }, [])
    return (
        <>
            {articles !== null && loading === false ? (
                <div ref={myPost} >
                    {articles.length > 0 ? (
                        <>
                            {articles.map((dat, index) => (
                                <>
                                    <div key={index} className="article-preview">
                                        <div className="article-meta">
                                            <Link to={`/profile/${dat.author.username}`} ><img src={dat.author.image} /></Link>
                                            <div className="info">
                                                <Link to={`/profile/${dat.author.username}`} className="author">{dat.author.username}</Link>
                                                <span className="date">January 20th</span>
                                            </div>
                                            <HeartIcon dat={dat} accessToken={accessToken} />
                                        </div>
                                        <Link to={`/article/${dat.slug}`} className="preview-link">
                                            <h1>{dat.title}</h1>
                                            <p>{dat.description}</p>
                                            <span>Read more...</span>
                                            <ul className="tag-list">
                                                {dat.tagList.map((el, i) => (
                                                    <>
                                                        <li key={i} className="tag-default tag-pill tag-outline ng-binding ng-scope">{el}</li>
                                                    </>
                                                ))}
                                            </ul>
                                        </Link>
                                    </div>


                                </>
                            ))}
                        </>
                    ) : <div className="article-preview">No articles are here... yet.</div>}
                </div>
            ) : <div></div>}

            {loading && <div className="article-preview"> Loading...</div>}
        </>
    )
}