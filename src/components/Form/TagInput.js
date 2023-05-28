import { useState } from "react"

export default function TagInput({handleKeyDown}) {
    const [tag, setTag] = useState("")
    return (
        <>
            <input onChange={(e)=>setTag(e.target.value)} onKeyDown={handleKeyDown} type="text" class="form-control" placeholder="Enter tags" />
        </>
    )
}