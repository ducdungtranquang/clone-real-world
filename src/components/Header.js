import { Link } from "react-router-dom"
import { memo, useContext, useEffect, useState } from "react"
import LoginContext from "../context/LoginContext"
import { port } from "../constant"
export default memo(function Header() {
    
    const { accessToken, setAccessToken } = useContext(LoginContext);
    const [name, setName] = useState("");
    const [active, setActive] = useState("")

    const getUser = async () => {
        const res = await fetch(`${port}/user`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        setName(dat.user);
    }

    useEffect(() => {
        if (accessToken !== "") {
            getUser();
        }
    }, [accessToken])

    useEffect(()=>{
        // console.log(window.location.pathname);
        // setActive(window.location.pathname);
    },[window.location.href])

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand" href="index.html">conduit</Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* <!-- Add "active" class when you're on that page" --> */}
                        <Link to="/" className={`nav-link ${active === "/home" ? "active" : null}`} href="">Home</Link>
                    </li>

                    {accessToken !== "" && accessToken !== undefined ? (
                        <>
                            <li className="nav-item">
                                <Link to="/new-article" className={`nav-link ${active === "/new-article" ? "active" : null}`} href="">
                                    <i className="ion-compose"></i>&nbsp;New Article
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/setting" className={`nav-link ${active === "/setting" ? "active" : null}`} href="">
                                    <i className="ion-gear-a"></i>&nbsp;Settings
                                </Link>
                            </li>
                            <li className="nav-item">
                                {name && <Link to={name!==undefined?`/profile/${name.username}`:null} className={`nav-link ${active === "/profile" ? "active" : null}`} href="">
                                    <img style={{ borderRadius: "50%", width: "26px", height: "26px", marginRight: "5px" }} src={name.image || ""} />
                                    {name.username}
                                </Link>}

                            </li>
                        </>
                    ) : null}

                    {accessToken === "" || accessToken === undefined ? (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className={`nav-link ${active === "/signin" ? "active" : null}`} href="">Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className={`nav-link ${active === "/signup" ? "active" : null}`} href="">Sign up</Link>
                            </li>
                        </>
                    ) : null}
                </ul>
            </div>
        </nav>
    )
})