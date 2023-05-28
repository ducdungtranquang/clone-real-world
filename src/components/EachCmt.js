import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
export default function EachCmt({ item, i, user, slug}) {
    let cmt = useRef('');
    const {accessToken, setAccessToken} = useContext(LoginContext);
    const delCmtApi = async ()=>{
        const res = await fetch(`${port}/articles/${slug}/comments/${item.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`,
            },
        })
        const dat = await res.json();
        console.log(res);
    }

    const handleDelCmt = async e=>{
        cmt.current.style.display = "none";
        await delCmtApi();
    }
    
    useEffect(()=>{
        console.log(user)
    },[])
    return (
        <>
            <div ref={cmt} key={i} className="card">
                <div className="card-block">
                    <p className="card-text">{item.body}</p>
                </div>
                {item.author !== undefined && user!==undefined && (
                    <div className="card-footer">
                        <Link to='' className="comment-author">
                            <img src={item.author.image} className="comment-author-img" />
                        </Link>
                        &nbsp;
                        <Link to='' className="comment-author">{item.author.username}</Link>
                        <span className="date-posted">Dec 29th</span>
                        <span style={{display: user.username===item.author.username?"inline-block":"none"}} className="mod-options">
                            <i onClick={handleDelCmt} className="ion-trash-a"></i>
                        </span>
                    </div>
                )}

            </div>
        </>
    )
}