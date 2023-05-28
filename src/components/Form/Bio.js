import { useState } from "react"

export default function Bio({ users }) {
    const [des, setDes] = useState(users !== undefined ? users.bio : "");

    return (
        <>

            <textarea onChange={e => setDes(e.target.value)} class="form-control form-control-lg" rows="8"
                placeholder="Short bio about you" defaultValue={des}></textarea>

        </>
    )
}