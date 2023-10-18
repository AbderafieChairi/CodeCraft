import { Vector3 } from "three";
import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";


@InspectorComponent.Component



export default class BoxCollider extends MonoBehaviour{
    


    editorChange(): void {
        this.gameObject.rigidBodyProps.current.position=new Vector3(this.center.x,this.center.y,this.center.z)
        this.gameObject.rigidBodyProps.current.scale=new Vector3(this.size.x,this.size.y,this.size.z)
    }


    @InspectorComponent.SerializableField({type:'Object'})
    public center:{x:number,y:number,z:number} = {x:0,y:0,z:0};

    @InspectorComponent.SerializableField({type:'Object'})
    public size:{x:number,y:number,z:number} = {x:1,y:1,z:1};


    Start(): void {
        console.log("start Box Collider !!")
        this.gameObject.rigidBodyProps.current.colliders="cuboid"

    }
    Update(): void {
        // state:any,delta:any
        // console.log("update !!")
    }
}


