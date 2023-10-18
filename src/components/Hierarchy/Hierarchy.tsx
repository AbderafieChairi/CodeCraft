import { useEditor } from "../../context/EditorContext"
import CropFreeIcon from '@mui/icons-material/CropFree';
import "./Hierarchy.css"
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
export default function Hierarchy() {
    const [elements, setElements] = useState<any []>([])
    const {setGoList}=useEditor()
    const {scene,soState,updateSo} = useEditor()
    React.useEffect(()=>{
      if (scene.isObject3D){
        setElements(scene?.children.map((element:any)=>{
          return {name:element.constructor.name+":"+element.name,origin:element.name}
        }))
      }
    },[scene?.children?.length,soState])
    const handleDragStart = (e:any,name:any)=>{
      e.dataTransfer.setData("name",name)
    }
    return (
     <div className="hierarchy-item">
        {elements.map((element:any,k:number)=>{

            return (
                <div className="row" draggable
                onDragStart={(e)=>handleDragStart(e,element.name)}
                key={k}
                onClick={()=>{
                  
                  // {
                    // setSelectedObject(scene.children.find(i=>i.name===element.origin) as Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>)}
                    // console.log(selectedObject.current)
                }}
                >
                    <CropFreeIcon/>
                    <div>{element.name}</div>
                </div>) 
        })}
        <div onClick={()=>{
          console.log("add object")
          setGoList(golist=>[...golist,'object'+Math.floor(Math.random()*100)])
          updateSo()
        }}>
          <AddIcon />
        </div>
    </div>
  )
}
