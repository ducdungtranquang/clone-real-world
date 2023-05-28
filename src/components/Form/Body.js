import { useState } from "react"

export default function Body({ users }) {
    const [user, setUser] = useState(users !== undefined ? users.body : "");

    return (
        <>
            <input class="form-control" onChange={e => setUser(e.target.value)} type="text" placeholder="What's this article about?" defaultValue={user} required />
        </>
    )
}