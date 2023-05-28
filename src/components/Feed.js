import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState, useContext } from "react"
import { port } from "../constant";
import GlobalFeed from "../components/GlobalFeed";
import FeedByTag from "../Layout/FeedByTag";
import LoginContext from "../context/LoginContext";
import YourFeed from "../components/YourFeed";
export default function Feed({accessToken, setaccessToken}) {
    const [tag, setTag] = useState(accessToken !== "" ? "yf" : "");
    const [from, setFrom] = useState(0);
    const [dataG, setDataG] = useState([]);
    const [dataY, setDataY] = useState([]);
    const [dataF, setDataF] = useState([]);
    const filterTaglists = ["implementations", "welcome", "introduction", " codebaseShow", "ipsum", "qui", "et", "quia", "deserunt", "cupiditate"]
    return (
        <>
            <div className="col-md-9">
                <div className="feed-toggle">
                    <ul className="nav nav-pills outline-active">

                        {accessToken !== "" && accessToken !== undefined ? (
                            <li style={{ cursor: "pointer" }} className="nav-item" onClick={() => setTag("yf")}>
                                <div style={{ cursor: "pointer" }} className={`nav-link ${tag === "yf" ? "active" : ""}`} >Your Feed</div>
                            </li>
                        ) : null}

                        <li tyle={{ cursor: "pointer" }} className="nav-item" onClick={() => setTag("")}>
                            <div style={{ cursor: "pointer" }} className={`nav-link ${tag !== '' ? '' : 'active'}`} >Global Feed</div>
                        </li>
                        {tag !== "" && tag !== "yf" ? (
                            <li style={{ cursor: "pointer" }} className="nav-item">
                                <div style={{ cursor: "pointer" }} className={`nav-link ${tag === '' || tag === "yf" ? '' : 'active'}`} >#{tag}</div>
                            </li>
                        ) : null}
                    </ul>
                </div>

                {tag === "" ? <GlobalFeed accessToken={accessToken} /> : tag === "yf" ? <YourFeed accessToken={accessToken} />
                    : <FeedByTag tag={tag} accessToken={accessToken} />}

            </div>

            <div className="col-md-3">
                <div className="sidebar">
                    <p>Popular Tags</p>

                    <div className="tag-list">
                        {filterTaglists.map((tagList, i) => (
                            <a style={{ cursor: "pointer" }} key={i} onClick={(e) => setTag(tagList)} className="tag-pill tag-default">{tagList}</a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}