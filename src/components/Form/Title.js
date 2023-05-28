import { useState } from "react"

export default function Title({ users }) {
    const [user, setUser] = useState(users !== undefined ? users.title : "");

    return (
        <>
            <input class="form-control" onChange={e => setUser(e.target.value)} type="text" placeholder="What is your title?" defaultValue={user} required />
        </>
    )
}