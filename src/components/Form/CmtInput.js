import { useState } from "react"

export default function CmtInput() {
    const [des, setDes] = useState("");

    return (
        <>
            <textarea onChange={e => setDes(e.target.value)} class="form-control" rows="3"
                placeholder="Write a comment..." ></textarea>
        </>
    )
}