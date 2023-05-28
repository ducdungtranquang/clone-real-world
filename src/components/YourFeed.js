import { memo, useContext, useEffect, useState } from "react";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import HeartIcon from "./HeartIcon";
import { Link } from "react-router-dom";
export default memo (function YourFeed() {
    const [data, setData] = useState([]);
    const { accessToken, setAccessToken } = useContext(LoginContext)
    const [loading, setLoading] = useState(true)

    const getAArticles = async () => {
        const res = await fetch(`${port}/articles/feed?limit=${9}&offset=${0}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        console.log(dat.articles);
        setData(dat.articles);
    }


    useEffect(() => {
        // setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },1500)
        getAArticles();
    }, [])
    return (
        <>
            {data !== null && loading===false > 0 ? <>
                <>
                    {data.length > 0 ? (
                        <>
                            {data.map((dat, index) => (
                                <>
                                    <div key={index} className="article-preview">
                                        <div className="article-meta">
                                            <Link to={`/profile/${dat.author.username}`} ><img src={dat.author.image} /></Link>
                                            <div className="info">
                                                <Link to={`/profile/${dat.author.username}`} className="author">{dat.author.username}</Link>
                                                <span className="date">January 20th</span>
                                            </div>
                                            <HeartIcon dat={dat} accessToken = {accessToken} />
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
                    ) : <div className="article-preview"> No articles are here... yet.</div>}
                </>
            </> : <div ></div>}

            {loading&&<div className="article-preview"> Loading...</div>}
        </>
    )
})