
export default class InspectorComponent {
    static ComponentsList :any[]= [];
    constructor(){
        InspectorComponent.ComponentsList.push(this.constructor.name);
    }

    static ui: any = {}; // 'ui' property to store decorated values
    static SerializableField(init:any) {
      return (target:any, propertyKey: string) => {
          InspectorComponent.ui[target.constructor.name]={...InspectorComponent.ui[target.constructor.name]}
          InspectorComponent.ui[target.constructor.name][propertyKey]=init
      };
      }
    static Component(constructor: Function) {
        InspectorComponent.ComponentsList.push(constructor.name);
    }
  
}