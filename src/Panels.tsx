import { Panel, PanelGroup } from "react-resizable-panels";
import "./index.css"
import React, { useState } from "react";
import ResizeHandle from "./ResizeHandle";
import Scene from "./components/Scene/Scene";
import Inspector from "./components/Inspector/Inspector";
import Hierarchy from "./components/Hierarchy/Hierarchy";
import Console from "./components/Console/Console";


type orientation = "horizontal" | "vertical";
interface Panel_{
    name:string,
    elements:{name:string,content:any,isActive:boolean}[],
    defaultSize:number
}
interface GroupPanel{
    id:string,
    name:string,
    type:orientation,
    items:(Panel_ | GroupPanel)[],
}


export default function Panels() {
    const [panels] = useState<GroupPanel>({
        id:'group1',
        name:'group',
        type:'horizontal',
        items:[
            {
                id:'group1-1',
                name:"group",
                type:'vertical',
                items:[
                    {
                        id:'group1-1-1',
                        name:"group",
                        type:'horizontal',
                        items:[
                            {
                                name:"panel",
                                elements:[
                                    {
                                        name:"Hierarchy",
                                        content:()=><Hierarchy />,
                                        isActive:true
                                    }
                                ],
                                defaultSize:200
                            },
                            {
                                name:"panel",
                                elements:[
                                    {
                                        name:"Scene",
                                        content:()=><Scene/>,
                                        isActive:true
                                    },
                                    {
                                        name:"Game",
                                        content:()=><div>hello</div>,
                                        isActive:true
                                    },
                                    {
                                        name:"Animations",
                                        content:()=><div>hello</div>,
                                        isActive:true
                                    },
                                ],
                                defaultSize:700
                            },
                        ]
                    },
                    {
                        name:"panel",
                        elements:[
                            {
                                name:"Console",
                                content:()=><Console/>,
                                isActive:true
                            },
                            {
                                name:"Project",
                                content:()=><div>hello</div>,
                                isActive:true
                            },
                        ],
                        defaultSize:300
                    },
                ]
            },
            {
                name:"panel",
                elements:[
                    {
                        name:"Inspector",
                        content:()=><Inspector/>,
                        isActive:true
                    }
                ],
                defaultSize:300
            },
        ]
    })
  return (
    <div className={"Container"}>
        <MyPanelGroup panelGroup={panels}/>
    </div>
  );
}

function MyPanelGroup({panelGroup}:{panelGroup:GroupPanel}){
    return(
        <PanelGroup autoSaveId={panelGroup.id} direction={panelGroup.type}>
            {panelGroup.items.map((i,k_pg)=>(
                <React.Fragment key={k_pg}>
                <Panel order={k_pg}>
                    {i.name==="panel"&&<div className="panel-header">
                        {i.name==="panel"&&(i as Panel_).elements.map((e,k)=>(
                                <div key={k} draggable={true}>{e.name}</div>
                        ))}
                    </div>}
                    {i.name==="panel"&&(i as Panel_).elements.filter(e=>e.isActive).map((e,k)=>(
                            <div className="PanelContent" key={k} >
                                {e.content()}
                            </div>
                    ))}
                    {i?.name==="group"&&<MyPanelGroup key={k_pg} panelGroup={i as unknown as  GroupPanel}/>}
                </Panel>
                {k_pg!==panelGroup.items.length-1&&<ResizeHandle />}
                </React.Fragment>
            ))}
        </PanelGroup>
    )
}