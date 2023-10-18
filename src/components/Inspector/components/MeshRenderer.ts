import { MeshBasicMaterial } from "three";
import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";
import {Color} from "three"

@InspectorComponent.Component
export default class MeshRenderer extends MonoBehaviour{
    material : MeshBasicMaterial=new MeshBasicMaterial();
    editorChange(): void {
        this.material.color=new Color(this.color);
        this.material.transparent=this.transparent;
        this.gameObject.gameobjectProps.current.material=this.material;
    }
    Start(): void {

    }
    Update(): void {
    }

    @InspectorComponent.SerializableField({type:'Color'})
    public color:string="#00ff00";

    @InspectorComponent.SerializableField({type:'Boolean'})
    public transparent:boolean=false;

}


