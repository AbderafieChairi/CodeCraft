import React, { useContext, useRef, useState } from "react";
import { Scene} from "three";
import config from "../components/Inspector/components/config";
import { IGameObject } from "../components/Scene/GameObject/GameObject";
import useLocalStorage from "./useLocalStorage";


interface EditorType{
    selectedObject:React.MutableRefObject<IGameObject | undefined>,
    fixedCam:boolean,
    setFixedCam:React.Dispatch<React.SetStateAction<boolean>>,
    scene:Scene,
    setScene:React.Dispatch<React.SetStateAction<Scene>>,
    AddComponent:(props:any)=>void,
    soState:number,
    setSelectedObject:(so:IGameObject)=>void,
    updateSo:()=>void,
    goList:any[],
    setGoList:React.Dispatch<React.SetStateAction<any[]>>,
    play:boolean,
    setPlay:React.Dispatch<React.SetStateAction<boolean>>,
}
const EditorContext = React.createContext({} as EditorType);


export function useEditor() {
    return useContext(EditorContext);
}


export default function EditorProvider({ children }:{children:any}) {
    const selectedObject = useRef<IGameObject>();
    const [soState, setSoState] = useState(0)
    const [fixedCam, setFixedCam] = useState(false);
    const [scene,setScene] = useState<Scene>({} as Scene);
    const [goList, setGoList] = useLocalStorage('go',[])
    const [play, setPlay] = useState(false)
    const AddComponent=(i:string)=>{
        const c = config as any
        const comp = new c[i](selectedObject.current)
        const go = selectedObject.current?.gameObject.current
        if (go)
        go.components.push(comp);
        comp.Start();
        updateSo();
    }

    function setSelectedObject(so:IGameObject){
        selectedObject.current=so
        setSoState(c=>c+1);
    }
    function updateSo(){
        setSoState(c=>c+1);
    }




    const values:EditorType={
        selectedObject,
        fixedCam,
        setFixedCam,
        scene,
        setScene,
        AddComponent,
        soState,
        setSelectedObject,
        updateSo,
        goList,
        setGoList,
        play,
        setPlay

    }
    return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
    );
}
