/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Vector3 } from "three";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Chassis_1: THREE.Mesh
    Chassis_2: THREE.Mesh
    Wolf3D_Avatar: THREE.Mesh
    Hips: THREE.Bone
  }
  materials: {
    BodyPaint: THREE.MeshStandardMaterial
    BodyPaint_Accent: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['mesh']) {
  const [followCursor] = useState(true);
  const [animation] = useState("idle");

  const armature = useRef();
  const { animations: idle } = useGLTF(`/animations/female/idle.glb`);

  idle[0].name = "idle";

  const { nodes, materials } = useGLTF("/models/female.glb") as GLTFResult;
  const { actions } = useAnimations(idle, armature);

  useEffect(() => {
    actions[animation]?.reset().play();
    return () => {
      actions[animation]?.reset().fadeOut(0.5);
    };
  }, [animation, actions]);

  useFrame((state) => {
    if (followCursor) {
      const headTarget = new Vector3(state.pointer.x * .2, state.pointer.y * .2, 1);
      if (armature.current) {
        armature.current.getObjectByName("Head")?.lookAt(headTarget);
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" ref={armature}>
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="Wolf3D_Avatar"
            geometry={nodes.Wolf3D_Avatar.geometry}
            material={materials.Wolf3D_Avatar}
            skeleton={nodes.Wolf3D_Avatar.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

export default function Avatar() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 30, zoom: 2.5 }}>
      <Environment preset="apartment" />
      <ambientLight intensity={.2} />
      <Model castShadow position={[0, -1.3, 0]} />
    </Canvas>
  );
}


useGLTF.preload("/models/female.glb");
