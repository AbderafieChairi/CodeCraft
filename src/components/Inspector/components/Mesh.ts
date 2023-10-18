import { BoxGeometry, SphereGeometry,CapsuleGeometry,PlaneGeometry,CylinderGeometry,BufferGeometry } from "three";
import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";


type mesh = "cube"|"sphere"|"capsule"|"plane"|"cylinder"

@InspectorComponent.Component
export default class Mesh extends MonoBehaviour{
    geometry={
        "cube":new BoxGeometry(),
        "sphere":new SphereGeometry(),
        "capsule":new CapsuleGeometry(),
        "plane":new PlaneGeometry(),
        "cylinder":new CylinderGeometry()

    }

    editorChange(): void {
        this.gameObject.gameobjectProps.current.geometry = this.geometry[this.mesh] as BufferGeometry
    }
    Start(): void {
    }
    Update(): void {
    }

    @InspectorComponent.SerializableField({type:"Array",default:["cube","sphere","capsule","plane","cylinder"]})
    public mesh:mesh="cube";

    @InspectorComponent.SerializableField({type:"Boolean",default:false})
    public transparent:boolean=false;

}


