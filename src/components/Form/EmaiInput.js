import { useState } from "react"

export default function EmailInput({ users }) {
    const [email, setEmail] = useState(users !== undefined ? users.email : "");

    return (
        <>
            <input onChange={e => setEmail(e.target.value)} class="form-control form-control-lg" type="text" placeholder="Email" defaultValue={email} required />
        </>
    )
}