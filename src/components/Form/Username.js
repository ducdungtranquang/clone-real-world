import { useState } from "react"

export default function Username({ users }) {
    const [name, setName] = useState(users !== undefined ? users.username : "");

    return (
        <>
            <input onChange={e => setName(e.target.value)} class="form-control form-control-lg" type="text" placeholder="Your Name" defaultValue={name} required />
        </>
    )
}