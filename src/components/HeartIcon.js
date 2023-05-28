import { useEffect, useRef, useState, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
export default function HeartIcon({dat, accessToken}) {
    const navigate = useNavigate();
    // const { accessToken, setAccessToken } = useContext(LoginContext)
    const count = useRef(0);
    const [state, setState] = useState(dat.favorited);
    const hearts = useRef();

    const editHeartApi = async (data)=>{
        const res = await fetch(`${port}/articles/${data}/favorite`,{
            method: "POST",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json()
        console.log(dta);
    }

    const delHeartApi = async (data)=>{
        const res = await fetch(`${port}/articles/${data}/favorite`,{
            method: "DELETE",
            headers: { authorization: `Bearer ${accessToken}` }
        })
        const dta = await res.json()
        console.log(dta);
    }

    const handleClickHeartItem = (e)=>{
        if(accessToken===""||accessToken===undefined){
            navigate("/register", { replace: true })
        }
        else{
            setState(!state);
            if(state){
                // setHeart(heart-1)
                hearts.current = hearts.current -1
                count.current.innerHTML = hearts.current
                delHeartApi(dat.slug)
            }
            else{
                // setHeart(heart+1);
                hearts.current = hearts.current +1
                count.current.innerHTML = hearts.current
                editHeartApi(dat.slug);
            }
        }
    }

    useEffect(()=>{
        count.current.innerHTML = `${dat.favoritesCount}`;
        // setHeart(dat.favoritesCount)
        hearts.current = dat.favoritesCount
    },[])
    return (
        <button onClick={handleClickHeartItem} style={{background: state?"#449d44":"white", color:state?"white":"#449d44", borderColor:"#449d44"}} className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> <span ref={count}>{hearts.current}</span>
        </button>
    )
}