import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ThreeDViewerProps {
  imageUrl: string;
  productName: string;
}

function RotatingBox({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (isHovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={isHovered ? 1.1 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

export const ThreeDViewer = ({ imageUrl, productName }: ThreeDViewerProps) => {
  const [is3DMode, setIs3DMode] = useState(false);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        {is3DMode ? (
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
            />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Environment preset="sunset" />
            <ThreeDModel imageUrl={imageUrl} />
          </Canvas>
        ) : (
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIs3DMode(!is3DMode)}
          className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {is3DMode ? '2D View' : '3D View'}
        </motion.button>
        {is3DMode && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-xs text-gray-600 dark:text-gray-400"
          >
            Drag to rotate • Scroll to zoom
          </motion.div>
        )}
      </div>

      {is3DMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full"
        >
          AR Ready
        </motion.div>
      )}
    </div>
  );
};

function ThreeDModel({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  return <RotatingBox texture={texture} />;
}
