import { useState } from "react"

export default function ImageInput({ users }) {
    const [user, setUser] = useState(users !== undefined ? users.image : "");

    return (
        <>
            <input onChange={e => setUser(e.target.value)} class="form-control" type="text" placeholder="URL of profile picture" defaultValue={user} required />
        </>
    )
}