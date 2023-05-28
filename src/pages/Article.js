import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import Comment from "../components/Comment";
export default function Article() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const { slug } = useParams();
    const [data, setData] = useState([])
    const [name, setName] = useState()
    const [user, setUser] = useState([])
    let count = useRef();
    let check = useRef();
    let favor = useRef();
    const follow = useRef();
    const follow1 = useRef();
    const [heart, setHeart] = useState(0)
    const { accessToken, setAccessToken } = useContext(LoginContext)

    const getAnArticle = async () => {
        const res = await fetch(`${port}/articles/${slug}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        });
        const dat = await res.json();
        setData(dat.article);
        // setHeart(dat.article.favoritesCount)
        count.current = dat.article.favoritesCount
        check.current = dat.article.author.following
        favor.current = dat.article.favorited;
        // console.log(dat.article.author.following);
    }

    const delPost = async () => {
        const res = await fetch(`${port}/articles/${slug}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        // const dat = await res.json();
    }

    const getUser = async () => {
        const res = await fetch(`${port}/user`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        setName(dat.user);
    }

    const editHeartApi = async (data) => {
        const res = await fetch(`${port}/articles/${data}/favorite`, {
            method: "POST",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json()
        console.log(dta);
    }

    const delHeartApi = async (data) => {
        const res = await fetch(`${port}/articles/${data}/favorite`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json()
        console.log(dta);
    }

    const postFollowApi = async user => {
        const res = await fetch(`${port}/profiles/${user}/follow`, {
            method: "POST",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        console.log(dta);
    }

    const delFollowApi = async user => {
        const res = await fetch(`${port}/profiles/${user}/follow`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        console.log(dta);
    }

    const handleHeart = e => {
        if (favor.current) {
            count.current = count.current - 1;
            favor.current = false
            delHeartApi(slug)
        }
        else {
            count.current = count.current + 1;
            favor.current = true
            editHeartApi(slug)
        }
    }

    const handleFollow = (e, name) => {
        if (check.current) {
            follow.current.className = "btn btn-sm btn-outline-secondary"
            follow.current.innerHTML = `+ Follow ${data.author.username}`
            follow1.current.className = "btn btn-sm btn-outline-secondary"
            follow1.current.innerHTML = `+ Follow ${data.author.username}`
            check.current = false;
            delFollowApi(name);
        }
        else {
            follow.current.className = "btn btn-sm action-btn ng-binding btn-secondary"
            follow.current.innerHTML = `+ Unfollow ${data.author.username}`
            follow1.current.className = "btn btn-sm action-btn ng-binding btn-secondary"
            follow1.current.innerHTML = `+ Unfollow ${data.author.username}`
            check.current = true
            postFollowApi(name);
        }
    }

    const handleDelPost = async e => {
        await delPost();
        navigate("/", { replace: true });
    }

    useEffect(() => {
        // setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1200)
        getUser()
        getAnArticle()
    }, [accessToken])
    return (
        <>
            {data !== null && data !== undefined && loading === false ? (
                <>
                    {data.author !== undefined ? (
                        <div>

                            <div className="article-page">

                                <div className="banner">
                                    <div className="container">

                                        <h1>{data.title}</h1>

                                        <div className="article-meta">
                                            <Link to={`/profile/${data.author.username}`}><img src={data.author.image} /></Link>
                                            <div className="info">
                                                <Link to={`/profile/${data.author.username}`} className="author">{data.author.username}</Link>
                                                <span className="date">January 20th</span>
                                            </div>

                                            {name !== undefined && (
                                                <>
                                                    {name.username === data.author.username ? (
                                                        <>
                                                            <Link to={`/articles/${slug}`} className="btn btn-outline-secondary btn-sm"><i className="ion-edit"></i> Edit Article</Link>
                                                            <div onClick={handleDelPost} style={{ marginLeft: "8px" }} className="btn btn-outline-danger btn-sm ms-1"><i className="ion-trash-a"></i> Delete Article</div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {accessToken !== "" ? (
                                                                <>
                                                                    {check.current ? (
                                                                        <button onClick={(e) => handleFollow(e, data.author.username)} ref={follow} className="btn btn-sm action-btn ng-binding btn-secondary">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Unfollow {data.author.username}
                                                                        </button>
                                                                    ) : (
                                                                        <button onClick={(e) => handleFollow(e, data.author.username)} ref={follow} className="btn btn-sm btn-outline-secondary">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Follow {data.author.username}
                                                                        </button>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <Link to="/register">
                                                                    <button className="btn btn-sm btn-outline-secondary">
                                                                        <i className="ion-plus-round"></i>
                                                                        &nbsp;
                                                                        {/*  */}
                                                                        Follow {data.author.username} <span className="counter"></span>
                                                                    </button>
                                                                </Link>
                                                            )}

                                                            &nbsp;&nbsp;
                                                            <Link to={accessToken !== "" ? "" : "/register"}>
                                                                {favor.current ? (
                                                                    <button onClick={handleHeart} className="btn btn-sm btn-primary ms-3">
                                                                        <i className="ion-heart"></i>
                                                                        &nbsp;
                                                                        Unfavorite Post <span className="counter">({count.current})</span>
                                                                    </button>
                                                                ) : (
                                                                    <button onClick={handleHeart} className="btn btn-sm btn-outline-primary ms-3 ">
                                                                        <i className="ion-heart"></i>
                                                                        &nbsp;
                                                                        Favorite Post <span className="counter">({count.current})</span>
                                                                    </button>
                                                                )}
                                                            </Link>

                                                        </>
                                                    )}
                                                </>
                                            )}


                                        </div>

                                    </div>
                                </div>

                                <div className="container page">

                                    <div className="row article-content">

                                        <div className="col-md-12">
                                            {/* <p>
                                            {data.description}
                                        </p> */}
                                            {/* <h2 id="introducing-ionic">Introducing RealWorld.</h2> */}
                                            <p>{data.body}</p>
                                        </div>

                                        <ul className="tag-list">
                                            {data.tagList.map((el, i) => (
                                                <>
                                                    <li key={i} className="tag-default tag-pill tag-outline ng-binding ng-scope">{el}</li>
                                                </>
                                            ))}
                                        </ul>
                                    </div>

                                    <hr />

                                    <div className="article-actions">
                                        <div className="article-meta">
                                            <Link to={`/profile/${data.author.username}`}><img src={data.author.image} /></Link>
                                            <div className="info">
                                                <Link to={`/profile/${data.author.username}`} className="author">{data.author.username}</Link>
                                                <span className="date">January 20th</span>
                                            </div>

                                            {name !== undefined && (
                                                <>
                                                    <>
                                                        {name.username === data.author.username ? (
                                                            <>
                                                                <Link to={`/articles/${slug}`} className="btn btn-outline-secondary btn-sm"><i className="ion-edit"></i> Edit Article</Link>
                                                                <Link onClick={handleDelPost} style={{ marginLeft: "8px" }} className="btn btn-outline-danger btn-sm"><i className="ion-trash-a"></i> Delete Article</Link>
                                                            </>
                                                        ) : (<>
                                                            {accessToken !== "" ? (
                                                                <>
                                                                    {check.current ? (
                                                                        <button onClick={(e) => handleFollow(e, data.author.username)} ref={follow1} className="btn btn-sm action-btn ng-binding btn-secondary">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Unfollow {data.author.username}
                                                                        </button>
                                                                    ) : (
                                                                        <button onClick={(e) => handleFollow(e, data.author.username)} ref={follow1} className="btn btn-sm btn-outline-secondary">
                                                                            <i className="ion-plus-round"></i>
                                                                            &nbsp;
                                                                            Follow {data.author.username}
                                                                        </button>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <Link to="/register">
                                                                    <button className="btn btn-sm btn-outline-secondary">
                                                                        <i className="ion-plus-round"></i>
                                                                        &nbsp;
                                                                        Follow {data.author.username}
                                                                    </button>
                                                                </Link>
                                                            )}


                                                            &nbsp;
                                                            <Link to={accessToken !== "" ? "" : "/register"}>
                                                                <>
                                                                    {favor.current ? (
                                                                        <button onClick={handleHeart} className="btn btn-sm btn-primary">
                                                                            <i className="ion-heart"></i>
                                                                            &nbsp;
                                                                            Unfavorite Post <span className="counter">({count.current})</span>
                                                                        </button>
                                                                    ) : (
                                                                        <button onClick={handleHeart} className="btn btn-sm btn-outline-primary">
                                                                            <i className="ion-heart"></i>
                                                                            &nbsp;
                                                                            Favorite Post <span className="counter">({count.current})</span>
                                                                        </button>
                                                                    )}
                                                                </>
                                                            </Link>

                                                        </>)}
                                                    </>


                                                </>
                                            )}

                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-xs-12 col-md-8 offset-md-2">

                                            <Comment slug={slug} user={name} />

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ) : <div className="article-preview ms-5" style={{ marginLeft: "80px" }}>Loading...</div>}
                </>
            ) : <div></div>}

            {loading && <div className="article-preview"> Loading...</div>}
        </>
    )
}