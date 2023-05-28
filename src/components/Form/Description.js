import { useState } from "react"

export default function Description({ users }) {
    const [des, setDes] = useState(users !== undefined ? users.description : "");

    return (
        <>
            <textarea onChange={e => setDes(e.target.value)} class="form-control" rows="8"
                placeholder="Write your article (in markdown)" defaultValue={des}></textarea>
        </>
    )
}