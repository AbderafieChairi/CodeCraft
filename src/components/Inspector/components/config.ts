import PlayerController from "../../../Engine/PlayerController";
import BoxCollider from "./BoxCollider";
import CapsuleCollider from "./CapsuleCollider";
import Mesh from "./Mesh";
import MeshCollider from "./MeshCollider";
import MeshRenderer from "./MeshRenderer";
import RigidBody from "./RigidBody";
import SphereCollider from "./SphereCollider";
import Transform from "./Transform";

const config ={
    "BoxCollider":BoxCollider,
    "SphereCollider":SphereCollider,
    "CapsuleCollider":CapsuleCollider,
    "MeshRenderer":MeshRenderer,
    "Transform":Transform,
    "RigidBody":RigidBody,
    "Mesh":Mesh,
    "MeshCollider":MeshCollider,
    "PlayerController":PlayerController
}




export default config;