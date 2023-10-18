import MonoBehaviour from "../../../Engine/MonoBehaviour";
import InspectorComponent from "./InspectorComponent";


type type_ = "dynamic" |"fixed" | "kinematicPosition" | "kinematicVelocity"

@InspectorComponent.Component
export default class RigidBody extends MonoBehaviour {

    editorChange(){
        this.gameObject.rigidBodyProps.current.type=this.type;
        this.gameObject.rigidBodyProps.current.gravityScale=this.gravityScale;
    }

    Start(): void {
    }
    Update(): void {
    }

    @InspectorComponent.SerializableField({type:'GameObject'})
    public mass:number=1;

    @InspectorComponent.SerializableField(0)
    public drag:number=0.5;

    @InspectorComponent.SerializableField({type:'Array',default:["dynamic","fixed","kinematicPosition","kinematicVelocity"]})
    public type:type_="dynamic";

    @InspectorComponent.SerializableField({type:'Number'})
    public gravityScale:number=1;

    @InspectorComponent.SerializableField(false)
    public isKinematic:boolean=false;


        



}


