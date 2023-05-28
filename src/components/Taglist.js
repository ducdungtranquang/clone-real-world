import { useRef, useState } from "react";
import TagInput from "./Form/TagInput";

export default function Taglist({data = null}) {
    const tags = useRef();
    const [tagList, setTagList] = useState(data===null?[]:data);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const data = [...tagList]
            data.push(e.target.value);
            if (tagList.length < 5) {
                setTagList(data);
                // tags.current.value = "";
                e.target.value = ""
            }
        }
    }

    const handleX = (e, tag)=>{
        const data = [...tagList]
        const index = data.findIndex((e)=>e===tag);
        data.splice(index,1);
        setTagList(data)
    }

    return (
        <>
            <TagInput handleKeyDown={handleKeyDown}/>
            <div class="tag-list">
                {tagList && (
                    <>
                        {tagList.map((tag, i) => (
                            <span onClick={(e)=>handleX(e, tag)} key={i} className="tag-default tag-pill ng-binding ng-scope">
                                <i className="ion-close-round"></i>
                                <span className="span">{tag}</span>
                            </span>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}