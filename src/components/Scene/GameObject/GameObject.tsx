import React,{MutableRefObject, useRef} from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import { useEditor } from '../../../context/EditorContext';
import Transform from '../../Inspector/components/Transform';
import { RapierRigidBody, RigidBody,RigidBodyProps } from '@react-three/rapier';
import GameObject from '../../../Engine/GameObject';

export interface IGameObject{
  gameObject:MutableRefObject<GameObject>,
  gameobjectProps:MutableRefObject<MeshProps>,
  rigidBodyProps:MutableRefObject<RigidBodyProps>,
  rigidBody:MutableRefObject<RapierRigidBody>,
  hasRigidBody:Boolean
}

export default function GameObjectComponent({name}:{name:string}) {
  const meshRef = useRef<any>();
  const rigidBody = useRef<any>();
  const rigidProps = useRef<RigidBodyProps>({
    mass:1,
    type:'dynamic',
    onCollisionEnter:()=>{},
  })
  const meshProps = useRef<MeshProps>({
  })
  const gameobject = useRef<IGameObject>({
    gameObject:meshRef as MutableRefObject<GameObject>,
    gameobjectProps:meshProps,
    rigidBodyProps:rigidProps,
    rigidBody:rigidBody,
    hasRigidBody:true
  });
  const {setSelectedObject,updateSo,play} = useEditor()

  // // Start function
  // React.useEffect(()=>{
  //   if (gameobject.current?.gameobject?.components) {
  //     const comps = gameobject.current?.gameobject?.components as MonoBehaviour[];
  //     for (let component of comps) {
  //       component.gameObject = gameobject.current?.gameobject as THREE.Mesh;
  //       component.Start();
  //     }
  //   }
  //   else gameobject.current?.gameobject.components=[]
  // },[])
  

  // Update function
  useFrame((state, delta) => {
    if (play){

    for (let component of gameobject.current?.gameObject.current.components) {
      component.Update(state, delta);
    }
  }
})
  // Update Editor
  useFrame(() => {
      rigidProps.current.position=meshProps.current.position
      for (let component of gameobject.current?.gameObject.current.components) {
        component.editorChange();
      }
  })


  React.useEffect(()=>{
    const go = gameobject.current.gameObject.current
    go.components=[new Transform(gameobject.current)];
    go.components[0].Start();
    updateSo()
  },[])
  
  const handleClick = () => {
    setSelectedObject(gameobject.current);

  };
  return (
    <RigidBody {...rigidProps.current}  ref={rigidBody}  name={name}>
        <mesh name={name} onClick={handleClick} 
          ref={meshRef}
        {...meshProps.current}>
          <boxGeometry/>
        </mesh>
    </RigidBody>
  );
}