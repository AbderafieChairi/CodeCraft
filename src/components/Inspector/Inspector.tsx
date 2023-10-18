import React, { useState } from "react";
import { useEditor } from "../../context/EditorContext"
import Component from "../Component/Component";
import { Button, Menu, MenuItem } from "@mui/material";
import './Inspector.css'
import InspectorComponent from "./components/InspectorComponent";
import config from './components/config'
export default function Inspector() {
    const {selectedObject,soState} = useEditor();
    const [components, setComponents] = useState<any[]>([])
    React.useEffect(()=>{
        if (selectedObject.current?.gameObject.current.components)
        setComponents(selectedObject.current?.gameObject.current.components)
    },[soState])
  return (
    <div>
        <div>
            <div className="insp-name">{selectedObject.current?.gameObject.current.name}</div>
        </div>
        {components.map((component:any,k:number)=>{
            return <Component key={k} component={component} />
        })}
        <AddComponent_ />
    </div>
  )
}



function AddComponent_(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [components, setComponents] = React.useState<any []>([])
    const {AddComponent,soState} = useEditor()
    React.useEffect(()=>{
        const h = config;
        h
        setComponents(InspectorComponent.ComponentsList)
    },[soState])


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {selectedObject} = useEditor();
    return (
        <div className="center">
            {selectedObject.current?.gameObject.current.name!==undefined&&<Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >Add Component</Button>}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {components.map((i,k)=>(
                    <MenuItem onClick={()=>{
                        AddComponent(i)
                        handleClose()
                    }} key={k}>{i}</MenuItem>
                ))}
                
            </Menu>
        </div>
    )
}
