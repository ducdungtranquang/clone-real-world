import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { port } from "../constant";
import { useNavigate } from "react-router-dom";

export default function Favorite({ currentCount, check, slug, accessToken }) {
    const count = useRef();
    const [current, setCurrent] = useState(currentCount)
    const [checked, setChecked] = useState(check)
    const navigate = useNavigate();

    const editHeartApi = async (data) => {
        const res = await fetch(`${port}/articles/${data}/favorite`, {
            method: "POST",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json()
        console.log(dta);
        return dta.article.favoritesCount
    }

    const delHeartApi = async (data) => {
        const res = await fetch(`${port}/articles/${data}/favorite`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json()
        
        console.log(dta);
        return dta.article.favoritesCount
    }

    const handleHeart = e => {
        // to={accessToken !== "" ? "" : "/register"}
        if (accessToken !== "") {
            if (checked) {
                setCurrent(current - 1);
                setChecked(false)
                delHeartApi(slug)
            }
            else {
                setCurrent(current + 1);
                setChecked(true)
                editHeartApi(slug)
            }
        }
        else {
            navigate("/register", {replace:true})
        }
    }

    useEffect(()=>{
        // setChecked(check)
        // setCurrent(currentCount)
    }, [checked, current])

    return (
        <>
            {current !== "" && current !== undefined ? (
                <>
                    {checked ? (
                        <button onClick={handleHeart} className="btn btn-sm btn-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Unfavorite Post <span ref={count} className="counter">({current})</span>
                        </button>
                    ) : (
                        <button onClick={handleHeart} className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span ref={count} className="counter">({current})</span>
                        </button>
                    )}
                </>
            ) : <div></div>}
        </>
    )
}