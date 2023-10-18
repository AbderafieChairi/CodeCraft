import React, { useState } from "react"
import "./Component.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InspectorComponent from "../Inspector/components/InspectorComponent";
import { useEditor } from "../../context/EditorContext";
import CropFreeIcon from '@mui/icons-material/CropFree';

export default function Component({component}:{component:any}) {
    const [collapsed, setCollapsed] = useState(false)
    const {updateSo} = useEditor()
    const update =(key:string,value:any)=>{
        const type = InspectorComponent.ui[component.constructor.name][key].type;
        console.log(type)
        // console.log(component,key,value)
        if (["String","Color","Array"].includes(type)) eval(`component.${key}="${value}"`)
        else if (type ==="Object") {
            const a = JSON.stringify(value) 
            console.log(a)
            eval(`component.${key}=${JSON.stringify(value)}`)
        }
        else eval(`component.${key}=${value}`)
        updateSo()
    }

    return (
        <div className="componentUI">
            <div className="componentUI-header">
                <div className="row">
                    <div><input type="checkbox" /></div>
                    <div>{component.constructor.name}</div>
                </div>
                <div style={{cursor:"pointer",transform:collapsed?"rotate(-90deg)":"rotate(0deg)"}}>
                    <ExpandMoreIcon onClick={()=>{setCollapsed(!collapsed)}}/>
                </div>
            </div>
            {!collapsed&&<div className="componentUI-body">
                {Object.keys(InspectorComponent.ui[component.constructor.name]).map((k,k_)=>{
                    return <Line key={k_} 
                        key_={k} 
                        component={component}
                        value={eval(`component.${k}`)} 
                        setValue={(v)=>{update(k,v)}}/>
                })}
            </div>}

        </div>
    )
}

interface lineProps {
    component:any,
    key_:string,
    value:any,
    setValue:React.Dispatch<React.SetStateAction<any>>
}

function Line(props:lineProps){

    // React.useEffect(()=>{
        // console.log(InspectorComponent.ui[props.component.constructor.name][props.key_].type)
    // },[])
    const type = InspectorComponent.ui[props.component.constructor.name][props.key_].type;
    const default_ = InspectorComponent.ui[props.component.constructor.name][props.key_].default;
    return(
        <div className="component-line">
            <div className="component-line-key">{props.key_}</div>
            <div className="component-line-value">
                {/* {
                typeof props.value === "boolean" ? 
                <div className="component-sub-line">
                        <input type="checkbox" checked={props.value} onChange={()=>{props.setValue(!props.value)}}/>
                </div>:
                typeof props.value === "object" ? 
                    typeof props.value?.uuid === "string"?
                    <div className="component-sub-line">
                        <div className="componentUI-body-target" onDragOver={handleDragOver} 
                            onDrop={handleOnDrop}
                        >{name}</div>
                    </div>
                :Object.keys(props.value).map((k)=>{
                    return <div key={k} className="component-sub-line">
                                <div>{k}</div>
                                <div className="component-sub-line-inp">
                                    <input value={props.value[k]}/>
                                </div>
                            </div>
                }):
                <div><input value={props.value} onChange={(e)=>{props.setValue(e.target.value)}}/></div>
                } */}
                {type==='Object'?
                    <ObjectValue value={props.value} setValue={props.setValue}/>
                :type==='Array'?
                    <ListValue value={props.value} values={default_} setValue={props.setValue}/>
                :type==='String'?
                    <TextValue value={props.value} setValue={props.setValue}/>
                :type==='Number'?
                    <NumberValue value={props.value} setValue={props.setValue}/>
                :type==='Color'?
                    <ColorValue value={props.value} setValue={props.setValue}/>
                :type==='Boolean'?
                    <BooleanValue value={props.value} setValue={props.setValue}/>
                :type==='GameObject'?
                    <GameObjectValue value={props.value} setValue={props.setValue}/>
                :<></>}
            </div>

        </div>
    )
}
function ListValue(props:{values:any[],value:any,setValue:any}){
    return (
        <div>   
            <select value={props.value} onChange={e=>props.setValue(e.target.value)}>
                {
                    props.values.map((v,k)=>{
                        return <option key={k}>{v}</option>
                    })
                }
            </select>
        </div>
    )
}
function ColorValue(props:{value:any,setValue:any}){
    return (
        <div>
            <input type="color" value={props.value} onChange={(e)=>{props.setValue(e.target.value)}}/>
        </div>
    )
}
function TextValue(props:{value:any,setValue:any}){
    return (
        <div>
            <input type="text" value={props.value} onChange={(e)=>{props.setValue(e.target.value)}}/>
        </div>
    )
}
function NumberValue(props:{value:any,setValue:any}){
    return (
        <div>
            <input type="number" value={props.value} onChange={(e)=>{props.setValue(e.target.value)}}/>
        </div>
    )
}
function BooleanValue(props:{value:any,setValue:any}){
    return (
        <div>
            <input type="checkbox" checked={props.value} onChange={()=>{props.setValue(!props.value)}}/>
        </div>
    )
}

function ObjectValue(props:{value:any,setValue:any}){
    return Object.keys(props.value).map((k)=>{
                    return <div key={k} className="component-sub-line">
                                <div>{k}</div>
                                <div className="component-sub-line-inp">
                                    <input value={props.value[k]} onChange={e=>{
                                        props.setValue({
                                            ...props.value,
                                            [k]:parseFloat(e.target.value)
                                        })
                                    }}/>
                                </div>
                            </div>
                })
    
}

function GameObjectValue(props:{value:any,setValue:any}){
    const [name, setName] = useState("...")
    function handleDragOver(event: React.DragEvent): void {
        event.preventDefault();
    }
    function handleOnDrop(event: React.DragEvent): void {
        console.log(event.dataTransfer.getData("uuid"))
        setName(event.dataTransfer.getData("name"))
    }
    return (
        <div className="component-sub-line">
            <div className="componentUI-body-target row" onDragOver={handleDragOver} 
                onDrop={handleOnDrop}
            >{name!=="..."&&<CropFreeIcon />}
                <div>{name}</div>
            </div>
        </div>
    )
}