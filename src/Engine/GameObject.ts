import {Mesh} from "three";
import MonoBehaviour from "./MonoBehaviour";


export default class GameObject extends Mesh{
    components: MonoBehaviour[]=[];


    logg(){
        console.log("loggin from gameobject class !!!!")
    }
}