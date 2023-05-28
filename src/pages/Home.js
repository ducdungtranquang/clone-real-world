import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState, useContext } from "react"
import { port } from "../constant";
import GlobalFeed from "../components/GlobalFeed";
import FeedByTag from "../Layout/FeedByTag";
import LoginContext from "../context/LoginContext";
import YourFeed from "../components/YourFeed";
import Feed from "../components/Feed";
export default function Home() {
    const {accessToken, setaccessToken} = useContext(LoginContext);
    const [tag, setTag] = useState(accessToken!==""?"yf":"");
    const [from, setFrom] = useState(0);
    const [dataG, setDataG] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [dataF, setDataF] = useState([]);
    const filterTaglists = ["implementations", "welcome", "introduction", " codebaseShow", "ipsum", "qui", "et", "quia", "deserunt", "cupiditate"]

    const [name, setName] = useState("");

    const getUser = async () => {
        const res = await fetch(`${port}/user`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        setName(dat.user);
    }

    // useEffect(() => {
    //     if (accessToken !== "") {
    //         getUser();
    //     }
    // }, [])

    const getAArticles = async () => {
        const res = await fetch(`${port}/articles?limit=9&offset=${from}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        // console.log(dat.articles);
        setDataG(dat.articles);
    }

    const getFArticles = async () => {
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
        setDataF(newDat);
    }

    const getYArticles = async () => {
        const res = await fetch(`${port}/articles/feed?limit=${9}&offset=${0}`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        // console.log(dat.articles);
        setDataY(dat.articles);
    }

    // useEffect(()=>{
    //     getFArticles();
    // },[tag])

    // useEffect(()=>{
    //     if( accessToken !=="" && accessToken!==undefined){
    //         setTag("yf");
    //         getYArticles()
    //     }      
    // },[])

    // useEffect(()=>{
    //     getAArticles();
    // }, [from])
    return (
        <div>
            {/* <Header name = {name} /> */}
            <div className="home-page">

                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">

                        <Feed accessToken={accessToken} setaccessToken = {setaccessToken}/>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}