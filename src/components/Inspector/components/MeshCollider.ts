import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";


@InspectorComponent.Component
export default class MeshCollider extends MonoBehaviour{
    Start(): void {
        this.gameObject.rigidBodyProps.current.colliders="hull"
    }
    Update(): void {
        // state: any, delta: any
    }




    // @InspectorComponent.SerializableField({x:0,y:0,z:0})
    // public center!:{x:number,y:number,z:number};

    @InspectorComponent.SerializableField(2)
    public meshCollider!:number;
}


