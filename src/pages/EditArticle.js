import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header"
import Taglist from "../components/Taglist";
import { port } from "../constant";
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Description from "../components/Form/Description";
import Body from "../components/Form/Body";
import Title from "../components/Form/Title";
export default function EditArticle() {
    const navigate = useNavigate()
    const { slug } = useParams();
    const { accessToken, setAccessToken } = useContext(LoginContext)
    const [data, setData] = useState();
    const [name, setName] = useState("");
    const title = useRef();
    const description = useRef();
    const tags = useRef();
    const about = useRef();

    const postArticlesApi = async (data) => {
        const res = await fetch(`${port}/articles/${slug}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        })
        console.log(res);
        const dat = await res.json();

        return dat.article;
    }

    const getAnArticle = async () => {
        const res = await fetch(`${port}/articles/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${accessToken}`
            },
        })
        const dat = await res.json();
        setData(dat.article);
        return dat.article;
    }

    const handleCreate = async (e) => {
        e.preventDefault();

        const tagList = tags.current.querySelector("div").querySelectorAll('.span');
        const list = []
        tagList.forEach(e => {
            list.push(e.innerHTML)
        })

        // console.log(list);

        const data = {
            "article": {
                "title": title.current.querySelector('input').value,
                "description": description.current.querySelector('textarea').value,
                "body": about.current.querySelector('input').value,
                "tagList": list
            }
        }

        console.log(data);

        const slug = await postArticlesApi(data);
        navigate(`/article/${slug.slug}`, { replace: true })
    }

    useEffect(()=>{
        getAnArticle();
    },[])

    return (
        <div>
            {/* <Header active="article" accessToken={accessToken} name={name} /> */}

            <div class="editor-page">
                <div class="container page">
                    <div class="row">

                        <div class="col-md-10 offset-md-1 col-xs-12">
                            {data !== undefined && (
                                <form>
                                    <fieldset>
                                        <fieldset ref={title} class="form-group">
                                            <Title users={data} />
                                        </fieldset>
                                        <fieldset ref={about} class="form-group">
                                            <Body users={data} />
                                        </fieldset>
                                        <fieldset ref={description} class="form-group">
                                            <Description users={data} />
                                        </fieldset>
                                        <fieldset class="form-group" ref={tags}>
                                            <Taglist data={data.tagList} />
                                        </fieldset>
                                        <button onClick={handleCreate} class="btn btn-lg pull-xs-right btn-primary" type="button">
                                            Publish Article
                                        </button>
                                    </fieldset>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}