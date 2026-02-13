import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";

function PiSymbol() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Center>
        <mesh ref={meshRef}>
          <torusGeometry args={[2, 0.08, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Inner torus */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.06, 16, 100]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Central sphere */}
        <mesh>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#a855f7"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
        {/* Outer ring */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#e879f9"
            emissive="#c084fc"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Center>
    </Float>
  );
}

const PiModel = () => {
  return (
    <div className="w-full h-[500px] md:h-[700px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#e879f9" />
        <pointLight position={[0, 0, 8]} intensity={0.3} color="#c084fc" />
        <PiSymbol />
      </Canvas>
    </div>
  );
};

export default PiModel;
