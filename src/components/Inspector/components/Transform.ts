import { Euler, Vector3 } from "three";
import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";


@InspectorComponent.Component
export default class Transform extends MonoBehaviour{
    Start(): void {
        console.log("start Transform !!!")

    }
    Update(): void {
    }
    editorChange(): void {
        // const a = this.gameObject.hasRigidBody?this.gameObject.rigidBodyProps.current:this.gameObject.gameobjectProps.current
        this.gameObject.gameobjectProps.current.position=new Vector3(this.position.x,this.position.y,this.position.z)
        this.gameObject.gameobjectProps.current.rotation=new Euler(this.rotation.x*Math.PI/180,this.rotation.y*Math.PI/180,this.rotation.z*Math.PI/180)
        this.gameObject.gameobjectProps.current.scale=new Vector3(this.scale.x,this.scale.y,this.scale.z) 
    }

    @InspectorComponent.SerializableField({type:'Object'})
    public position:{x:number,y:number,z:number} = {x:0,y:0,z:0};

    @InspectorComponent.SerializableField({type:'Object'})
    public rotation:{x:number,y:number,z:number} = {x:0,y:0,z:0};

    @InspectorComponent.SerializableField({type:'Object'})
    public scale:{x:number,y:number,z:number} = {x:1,y:1,z:1};

}


