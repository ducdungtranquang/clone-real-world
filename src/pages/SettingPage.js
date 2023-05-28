import Header from "../components/Header"
import Footer from "../components/Footer"
import { port } from "../constant"
import { useContext, useEffect, useRef, useState } from "react"
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import ImageInput from "../components/Form/ImageInput";
import Username from "../components/Form/Username";
import Bio from "../components/Form/Bio";
import EmailInput from "../components/Form/EmaiInput";
import Password from "../components/Form/Password";
export default function SettingPage() {
    const navigate = useNavigate();
    const { accessToken, setAccessToken } = useContext(LoginContext);
    const [user, setUser] = useState();
    const email = useRef();
    const name = useRef();
    const password = useRef();
    const bio = useRef();
    const image = useRef();

    const getDataApi = async () => {
        const res = await fetch(`${port}/user`, {
            method: "GET",
            headers: { authorization: `Bearer ${accessToken}` },
        })
        const dat = await res.json();
        setUser(dat.user);
    }

    const editDataApi = async (data) => {
        const res = await fetch(`${port}/user`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })
        const dat = await res.json();
        return dat.user
    }

    const updatSetting = async e => {
        e.preventDefault();
        const data = {
            "user": {
                "email": email.current.querySelector('input').value,
                "password": password.current.querySelector('input').value,
                "username": name.current.querySelector('input').value,
                "bio": bio.current.querySelector('textarea').value,
                "image": image.current.querySelector('input').value
            }
        }

        const token = await editDataApi(data)
        setAccessToken(token.token)
        localStorage.setItem("accessToken",token.token)
        navigate(`/profile/${token.username}`, { replace: true })


        // console.log(data);
    }

    const logout = e => {
        setAccessToken("")
        localStorage.setItem("accessToken","")
        navigate("/", { replace: true })
    }

    useEffect(() => {
        getDataApi();
    }, [])

    return (
        <div>
            {/* <Header active="setting" /> */}

            {user !== undefined ? (
                <div class="settings-page">
                    <div class="container page">
                        <div class="row">

                            <div class="col-md-6 offset-md-3 col-xs-12">
                                <h1 style={{ cursor: "pointer" }} class="text-xs-center">Your Settings</h1>

                                <form onSubmit={updatSetting}>
                                    <fieldset>
                                        <fieldset ref={image} class="form-group">
                                            <ImageInput users={user} />
                                        </fieldset>
                                        <fieldset ref={name} class="form-group">
                                            <Username users={user} />
                                        </fieldset>
                                        <fieldset ref={bio} class="form-group">
                                            <Bio users={user} />
                                        </fieldset>
                                        <fieldset ref={email} class="form-group">
                                            <EmailInput users={user} />
                                        </fieldset>
                                        <fieldset ref={password} class="form-group">
                                            <Password />
                                        </fieldset>
                                        <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
                                            Update Settings
                                        </button>
                                    </fieldset>
                                </form>
                                <hr />
                                <button type="button" onClick={logout} class="btn btn-outline-danger">Or click here to logout.</button>
                            </div>

                        </div>
                    </div>
                </div>
            ) : <div>Loading...</div>}

            <Footer />
        </div>
    )
}