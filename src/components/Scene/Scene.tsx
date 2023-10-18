import { Canvas, useFrame, useThree } from '@react-three/fiber'
import "./Scene.css"
import { CameraControls, Stars} from '@react-three/drei'
import { useEditor } from '../../context/EditorContext'
import GameObjectComponent from './GameObject/GameObject'
import React from 'react'
import { Physics } from '@react-three/rapier'


export default function SceneManager() {
  const {play} = useEditor();
  return (
    
    <Canvas>
      <Physics colliders={false} 
      paused={!play}
      >
        <Scene/>
      </Physics>
    </Canvas>
  )
}


export function Scene(){
  const {fixedCam,setScene,goList} = useEditor();
  const {scene} = useThree()
  React.useEffect(()=>{
    setScene(scene)
  },[scene.children.length])


  useFrame(() => {
    for (let ch of scene.children){
      if (ch?.components!==undefined)
      for (let component of ch?.components){
        component.editorChange();
      }
    }
  })


  return (
    <>
      <ambientLight />
      <Stars/>
      <pointLight position={[10, 10, 10]} />
      {!fixedCam && <CameraControls />}
      {goList.map((go:any,k:number)=><GameObjectComponent key={k} name={go} />)}
    </>
  )
}