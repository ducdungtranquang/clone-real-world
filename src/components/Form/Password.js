import { useState } from "react"

export default function Password() {
    const [pass, setPass] = useState("");

    return (
        <>
            <input onChange={e => setPass(e.target.value)} class="form-control form-control-lg" type="password" placeholder="Password" />
        </>
    )
}