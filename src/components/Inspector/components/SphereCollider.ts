import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";


@InspectorComponent.Component
export default class SphereCollider extends MonoBehaviour{
    Start(): void {
        this.gameObject.rigidBodyProps.current.colliders="ball"
    }
    Update(): void {
        // state: any, delta: any
    }




    @InspectorComponent.SerializableField({x:0,y:0,z:0})
    public center!:{x:number,y:number,z:number};

    @InspectorComponent.SerializableField(2)
    public radius!:number;
}


