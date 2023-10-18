import { Button } from "@mui/material";
import { useEditor } from "../../context/EditorContext";

export default function Console() {
    const {scene,setPlay,play,selectedObject} = useEditor()
    const show=()=>{
        console.log(scene)
    }
    return (
    <div>
        <Button onClick={show}>show scene</Button>
        <Button onClick={()=>setPlay(!play)}>{play?"pause":"play"}</Button>
        <Button onClick={()=>console.log(selectedObject.current)}>selectedObject</Button>
        <Button onClick={()=>console.log(JSON.parse(localStorage.getItem("scene") as NonNullable<string>).children)}>storage</Button>
    </div>
    )
}
