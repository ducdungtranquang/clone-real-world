import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import HeartIcon from "../components/HeartIcon";
import Follow from "../components/Follow";
import MyPost from "../components/MyPost";
import MyFavPost from "../components/MyFavPost";
export default function ProfilePage() {
    const { user } = useParams();
    const [data, setData] = useState([]);
    const [anUser, setAnUser] = useState("default");
    const [articles, setArticles] = useState([]);
    const [favorPost, setFavorPost] = useState([])
    // const [change, setChange] = useState(0)
    const { accessToken, setAccessToken } = useContext(LoginContext)
    const check = useRef();
    const myPost = useRef();
    const favorited = useRef();
    const my = useRef();
    const fav = useRef();
    const [name, setName] = useState('my');

    // const getAnUser = async () => {
    //     const res = await fetch(`${port}/user`, {
    //         method: "GET",
    //         headers: { authorization: `Bearer ${accessToken}` },
    //     })
    //     const dat = await res.json();
    //     setName(dat.user);
    // }

    // useEffect(() => {
    //     if (accessToken !== "") {
    //         getAnUser();
    //     }
    // }, [])

    const getAnUserApi = async () => {
        const res = await fetch(`${port}/profiles/${user}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        setData(dta.profile);
        check.current = dta.profile.following;
        console.log(dta);
    }

    const getUserPost = async () => {
        const res = await fetch(`${port}/articles?author=${user}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        setArticles(dta.articles);
    }

    const getUserFavorite = async () => {
        const res = await fetch(`${port}/articles?favorited=${user}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        setFavorPost(dta.articles);
        console.log(dta.articles);
    }

    const getUser = async () => {
        const res = await fetch(`${port}/user`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
        const dat = await res.json();
        setAnUser(dat.user);
    }

    const postFollowApi = async user => {
        const res = await fetch(`${port}/profiles/${user}/follow`, {
            method: "POST",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        // console.log(dta);
    }

    const delFollowApi = async user => {
        const res = await fetch(`${port}/profiles/${user}/follow`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        // console.log(dta);
    }

    const handleFollow = (e, data) => {
        if (check.current) {
            e.currentTarget.className = "btn btn-sm btn-outline-secondary action-btn"
            e.currentTarget.innerHTML = `+ Follow ${user}`
            check.current = false;
            delFollowApi(user);
        }
        else {
            e.currentTarget.className = "btn btn-sm action-btn ng-binding btn-secondary"
            e.currentTarget.innerHTML = `+ Unfollow ${user}`
            check.current = true
            postFollowApi(user);
        }
    }

    const handlClikNav = e => {
        // setChange(change+1);
        if (e.target.innerHTML === "My Articles") {
            // favorited.current.style.display = "none";
            // myPost.current.style.display = "block";
            // e.target.classList.add('active')
            // fav.current.classList.remove('active')
            setName("my")
        }
        else {
            // myPost.current.style.display = "none";
            // favorited.current.style.display = "block ";
            // e.target.classList.add('active')
            // my.current.classList.remove('active')
            setName("fav")
        }
    }

    useEffect(() => {
        getAnUserApi();
        // getUserFavorite();
        // getUserPost();
        if (accessToken !== "") {
            getUser();
        }
    }, [user])

    return (
        <div>
            {/* <Header active="profile" accessToken = {accessToken} name = {name}/> */}
            {data !== undefined && data.length!==0 && anUser !== undefined ? (
                <div className="profile-page">

                    <div className="user-info">
                        <div className="container">
                            <div className="row">

                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <img src={data.image} className="user-img" />
                                    <h4>{user}</h4>
                                    <p>
                                        {data.bio === 'null' ? "" : data.bio}
                                    </p>

                                    {user !== anUser.username ? (
                                        <Follow data={data} check={check.current} accessToken={accessToken} user={user}/>
                                    ) : (
                                        <Link to="/setting" className="btn btn-sm btn-outline-secondary action-btn">
                                            <i className="ion-gear-a"></i>  Edit Profile Settings
                                        </Link>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                            <div style={{ cursor: "pointer" }} ref={my} onClick={()=>setName("my")} className={`nav-link ${name==="my"?"active":""}`} >My Articles</div>
                                        </li>
                                        <li className="nav-item">
                                            <div style={{ cursor: "pointer" }} ref={fav} onClick={()=>setName("fav")} className={`nav-link ${name==="fav"?"active":""}`}>Favorited Articles</div>
                                        </li>
                                    </ul>
                                </div>


                                {/* My Post */}
                                {name === "my" && (
                                    <MyPost accessToken={accessToken} user={user} name={name}/>
                                )}
                                {/* My favorite */}
                                {name==="fav"&&(<MyFavPost accessToken={accessToken} user={user} name={name}/>)}
                                


                            </div>

                        </div>
                    </div>

                </div>
            ) : <div>Loading...</div>}
            <Footer />
        </div>
    )
}

{/* <>
{check.current ? (
    <Link to={accessToken !== "" ? "" : "/register"}>
        <button onClick={(e) => handleFollow(e, data)} className="btn btn-sm action-btn ng-binding btn-secondary">
            <i className="ion-plus-round"></i>
            &nbsp;
            Unfollow {data.username}
        </button>
    </Link>
) : <>
    <Link to={accessToken !== "" ? "" : "/register"}>
        <button onClick={(e) => handleFollow(e, data.username)} className="btn btn-sm btn-outline-secondary action-btn">
            <i className="ion-plus-round"></i>
            &nbsp;
            Follow {data.username}
        </button>
    </Link>
</>}
</> */}