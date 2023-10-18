import { CollisionTarget } from "@react-three/rapier";
import { IGameObject } from "../components/Scene/GameObject/GameObject";

export default abstract class MonoBehaviour {

    gameObject !:IGameObject  ;

    constructor(go:IGameObject) {
        this.gameObject = go;
        // this.gameObject.addEventListener('click', this.onClick)
        this.gameObject.rigidBodyProps.current.onCollisionEnter=(({ manifold, target, other })=>{
            this.onCollisionEnter({ manifold, target, other })
        })
        
    }
    onCollisionEnter({  }: { manifold: any, target: CollisionTarget, other: CollisionTarget }) {
    }
    // abstract onClick(e:any):void;
    editorChange():void{
        
    }

    abstract Start():void;
    abstract Update(state:any,delta:any):void;

}