import InspectorComponent from "./InspectorComponent";


@InspectorComponent.Component
export default class CapsuleCollider{

    @InspectorComponent.SerializableField({x:0,y:0,z:0})
    public center!:{x:number,y:number,z:number};

    @InspectorComponent.SerializableField(2)
    public radius!:number;

    @InspectorComponent.SerializableField(2)
    public height!:number;
    
}


