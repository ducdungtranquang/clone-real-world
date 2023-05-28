import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCallback, useRef, useState, useContext, useEffect } from "react"
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
export default function LoginPage() {
    const { accessToken, setAccessToken } = useContext(LoginContext);
    const navigate = useNavigate();

    const emailVal = useRef('')
    const passVal = useRef('')
    const err = useRef('')

    const loginApi = async (data) => {
        const res = await fetch(`${port}/users/login`, {
            method: "POST",
            // headers: { authorization: `Bearer ${accessTokens}` },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dat = await res.json();
        return dat;
        // setAccessToken(dat.user.token);
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const data = {
            "user": {
                "email": emailVal.current.value,
                "password": passVal.current.value
            }
        }
        const dat = await loginApi(data)
        console.log(dat);
        if (dat.errors) {
            err.current.innerHTML = "email or password is invalid"
            err.current.parentNode.style.display = "inline-block"
        }
        else {
            setAccessToken(dat.user.token);
            localStorage.setItem("accessToken",dat.user.token)
            // console.log(accessToken);
            navigate("/", { replace: true })
        }
    }

    // useEffect(()=>{
    //     if(accessToken!==""&&accessToken!==undefined){
    //         redirect("/")
    //     }
    // },[])

    return (
        <div>
            {/* <Header active="signin" /> */}
            <div class="auth-page">
                <div class="container page">
                    <div class="row">

                        <div class="col-md-6 offset-md-3 col-xs-12">
                            <h1 class="text-xs-center">Sign in</h1>
                            <p class="text-xs-center">
                                <Link to="/register">Need an account?</Link>
                            </p>

                            <ul style={{ display: "none" }} class="error-messages" >
                                <li ref={err}></li>
                            </ul>

                            <form onSubmit={handleSignIn}>
                                <fieldset class="form-group">
                                    <input ref={emailVal} class="form-control form-control-lg" type="email" placeholder="Email" required />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input ref={passVal} class="form-control form-control-lg" type="password" placeholder="Password" required />
                                </fieldset>

                                {/* <Link to={accessToken!==""?"/":"#"}  style = {{color:"white"}}> */}
                                <button class="btn btn-lg btn-primary pull-xs-right">
                                    Sign in
                                </button>
                                {/* </Link> */}
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}