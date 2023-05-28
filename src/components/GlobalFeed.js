import { useContext, useEffect, useState } from "react";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "./HeartIcon";
export default function GlobalFeed() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { accessToken, setAccessToken } = useContext(LoginContext)
    const [from, setFrom] = useState(0)
    const [loading, setLoading] = useState(false)
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const getAArticles = async () => {
        const res = await fetch(`${port}/articles?limit=9&offset=${from}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        // console.log(dat.articles);
        setData(dat.articles);
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1400)
        getAArticles();
    }, [from])
    return (
        <>
            {data !== null && loading === false ? (
                <>
                    {data.length > 0 && (
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
                            <list-pagigation className="ng-isolate-scope">
                                <nav>
                                    <ul className="pagination">
                                        {
                                            list.map((e, i) => (
                                                <li onClick={() => setFrom(i * 10)} key={i} className={`page-item ng-scope ${from / 10 === i ? "active" : ""}`} style={{ color: "#5cb85c", cursor: "pointer" }}>
                                                    <Link to="" className="page-link ng-binding">{e}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </list-pagigation>
                        </>
                    )}
                </>
            ) : <div></div>}

            {loading && <div className="article-preview"> Loading...</div>}
        </>
    )
}
