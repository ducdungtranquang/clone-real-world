import { useEffect, useState, useContext, useRef } from "react";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import { Link } from "react-router-dom";
import EachCmt from "./EachCmt";
import CmtInput from "./Form/CmtInput";
export default function Comment({ slug, user }) {
    const { accessToken, setAccessToken } = useContext(LoginContext)
    // const [user, setUser] = useState({})
    const [comment, setComment] = useState([]);
    const cmt = useRef();

    const getUser = async () => {
        const res = await fetch(`${port}/user`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        // setUser(dat.user);
    }

    const getComment = async () => {
        const res = await fetch(`${port}/articles/${slug}/comments`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        setComment(dat.comments);
        console.log(dat);
    }

    const postCmtApi = async (data) => {
        const res = await fetch(`${port}/articles/${slug}/comments`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const dat = await res.json();
        // console.log(dat);
    }

    const handlePostCmt = async (e) => {
        e.preventDefault();
        const data = {
            comment: {
                body: cmt.current.querySelector("textarea").value,
            }
        }
        await postCmtApi(data);
        // console.log(data);
        await getComment()
        cmt.current.querySelector("textarea").value = '';

    }

    useEffect(() => {
        // if (accessToken !== "") {
        //     getUser();
        // }
        getComment();
        console.log(user);
    }, [])

    return (
        <>
            {accessToken !== "" && accessToken !== undefined ? (
                <form onSubmit={handlePostCmt} className="card comment-form">
                    <div className="card-block" ref={cmt}>
                        <CmtInput />
                    </div>
                    {comment !== "" && comment !== undefined ? (
                        <div className="card-footer">
                            {comment.author !== null && comment.author !== undefined ? <img src={comment.author.image} className="comment-author-img" />
                                : null}
                            <button type="submit" className="btn btn-sm btn-primary">
                                Post Comment
                            </button>
                        </div>
                    ):<></>}
                </form>
            ) : (
                <p show-authed="false" style={{ display: "inherit" }}>
                    <Link to="/login">Sign in</Link>
                    <span> or </span>
                    <Link to="/register">Sign up</Link>
                    <span> to add comments on this article.</span>
                </p>
            )}

            {comment !== "" && comment !== undefined ? (
                <>
                    {comment.length > 0 ? (
                        <>
                            {comment.map((item, i) => (
                                <EachCmt item={item} i={i} user={user} slug={slug} accessToken={accessToken} />
                            ))}
                        </>
                    ) : <div>No comment</div>}
                </>
            ) : null}
        </>
    )
}

{/* <div key={i} className="card">
                                    <div className="card-block">
                                        <p className="card-text">{item.body}</p>
                                    </div>
                                    {item.author !== undefined && (
                                        <div className="card-footer">
                                            <Link to='' className="comment-author">
                                                <img src={item.author.image} className="comment-author-img" />
                                            </Link>
                                            &nbsp;
                                            <Link to='' className="comment-author">{item.author.username}</Link>
                                            <span className="date-posted">Dec 29th</span>
                                            <span className="mod-options">
                                                <i className="ion-trash-a"></i>
                                            </span>
                                        </div>
                                    )}

                                </div> */}