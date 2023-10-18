import { CollisionTarget } from "@react-three/rapier";
import InspectorComponent from "../components/Inspector/components/InspectorComponent";
import MonoBehaviour from "./MonoBehaviour";

@InspectorComponent.Component
export default class PlayerController extends MonoBehaviour{

    @InspectorComponent.SerializableField({type:'Number'})
    public speed:number=0.03 ;

    Start(): void {
        console.log("start player controller !!")

    }
    Update(): void {
        this.gameObject.gameObject.current.rotateY(this.speed);
    }

    onCollisionEnter({ other }: { manifold: any, target: CollisionTarget, other: CollisionTarget }) {
        console.log("onCollisionEnter", other.colliderObject?.name);
    }
}  