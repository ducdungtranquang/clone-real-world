import { useContext, useEffect, useState } from "react";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import { Link } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";
export default function FeedByTag({ tag, accessToken}) {
    const [data, setData] = useState([]);
    // const { accessToken, setAccessToken } = useContext(LoginContext)

    const getAArticles = async () => {
        const res = await fetch(`${port}/articles?tag=${tag}&limit=20&offset=0`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        const newDat = [];

        let n = dat.articles.length > 10 ? 9 : dat.articles.length
        for (let i = 0; i < n; i++) {
            newDat.push(dat.articles[i])
        }
        console.log(dat.articles);
        setData(newDat);
    }


    useEffect(() => {
        getAArticles();
    }, [tag])
    return (
        <>
            {data !== null && data !== undefined ? <>
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
            </> : <div className="article-preview"> No article here ...</div>}
        </>
    )
}