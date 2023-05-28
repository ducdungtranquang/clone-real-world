import Header from "../components/Header"
import Footer from "../components/Footer"
import LoginContext from "../context/LoginContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react"
import { port } from "../constant"
export default function RegisPage() {
    const { accessToken, setAccessToken } = useContext(LoginContext);
    const navigate = useNavigate();

    const nameVal = useRef('');
    const emailVal = useRef('');
    const passVal = useRef('');
    const err = useRef('');

    const regisApi = async (data) => {
        const res = await fetch(`${port}/users`, {
            method: "POST",
            // headers: { authorization: `Bearer ${accessTokens}` },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dat = await res.json();
        // console.log(dat);
        return dat;
    }

    const handleRegis = async (e) => {
        e.preventDefault();
        const data = {
            "user": {
                "username": nameVal.current.value,
                "email": emailVal.current.value,
                "password": passVal.current.value
            }
        }
        //   console.log(data);
        const dat = await regisApi(data);
        if(dat.errors){
            err.current.innerHTML = "That email or name is already taken"
            err.current.parentNode.style.display = "block"
        }
        else{
            console.log(data);
            setAccessToken(dat.user.token)
            localStorage.setItem("accessToken",dat.user.token)
            navigate("/", {replace:true})
        }
    }
    return (
        <div>
            {/* <Header active="signup"/> */}
            <div class="auth-page">
                <div class="container page">
                    <div class="row">

                        <div class="col-md-6 offset-md-3 col-xs-12">
                            <h1 class="text-xs-center">Sign up</h1>
                            <p class="text-xs-center">
                                <Link to="/login">Have an account?</Link>
                            </p>

                            <ul class="error-messages" style={{display:"none"}}>
                                <li ref={err}></li>
                            </ul>

                            <form onSubmit={handleRegis}>
                                <fieldset class="form-group">
                                    <input ref={nameVal} class="form-control form-control-lg" type="text" placeholder="Your Name" required />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input ref={emailVal} class="form-control form-control-lg" type="email" placeholder="Email" required />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input ref={passVal} class="form-control form-control-lg" type="password" placeholder="Password" required />
                                </fieldset>
                                <button class="btn btn-lg btn-primary pull-xs-right">
                                    Sign up
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}