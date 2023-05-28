import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
export default function Follow({ data, check, accessToken, user }) {
    const navigate = useNavigate();
    const { slug } = useParams();
    // const [data, setData] = useState([])
    const [checked, setChecked] = useState(check)

    const delFollowApi = async (user) => {
        const res = await fetch(`${port}/profiles/${user}/follow`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        console.log(dta);
    }

    const getFollowApi = async (user) => {
        const res = await fetch(`${port}/profiles/${user}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        console.log(dta);
        setChecked(dta.profile.following);
    }

    const postFollowApi = async (user) => {
        const res = await fetch(`${port}/profiles/${user}/follow`, {
            method: "POST",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json();
        console.log(dta)
    }

    const handleFollow = (e) => {
        // to={accessToken !== "" ? "" : "/register"}
        if (accessToken !== "") {
            if (checked) {
                e.currentTarget.className = "btn btn-sm btn-outline-secondary action-btn"
                e.currentTarget.innerHTML = `+ Follow ${data.username}`
                setChecked(false)
                delFollowApi(data.username);
            }
            else {
                e.currentTarget.className = "btn btn-sm action-btn ng-binding btn-secondary"
                e.currentTarget.innerHTML = `+ Unfollow ${data.username}`
                setChecked(true)
                postFollowApi(data.username);
            }
        }
        else {
            navigate("/register", { replace: true })
        }
    }

    useEffect(() => {
        
        if (check !== undefined && data.length!==0) {
            setChecked(check)
            getFollowApi(data.username);
        }
        // setChecked(data.following)
    },[])
    return (
        <>
            {data !== undefined ? (
                <>
                    {checked  ? (
                        <>
                            <button onClick={(e) => handleFollow(e)} className="btn btn-sm action-btn ng-binding btn-secondary">
                                <i className="ion-plus-round"></i>
                                &nbsp;
                                Unfollow {data.username}
                            </button>
                        </>
                    ) : <>
                        <>
                            <button onClick={(e) => handleFollow(e, data.username)} className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                &nbsp;
                                Follow {data.username}
                            </button>
                        </>
                    </>}
                </>
            ) : <>Loading...</>}
        </>
    )
}