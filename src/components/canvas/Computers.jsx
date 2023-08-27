import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = (props) => {
  const { isMobile, isTablet } = props;
  const computer = useGLTF("./desktop_pc/gaming_desktop_pc.glb");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);
  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <hemisphereLight intensity={3} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.4 : isTablet ? 0.55 : 0.75}
        position={
          isMobile
            ? [0.5, -2, -0.5]
            : isTablet
            ? [0.5, -3, -0.7]
            : [0, -3.25, -1.5]
        }
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQueryMobile = window.matchMedia("(max-width: 600px)");
    const mediaQueryTablet = window.matchMedia("(max-width: 900px)");

    // Set the initial value of the `isMobile` and `isTablet` state variables
    setIsMobile(mediaQueryMobile.matches);
    setIsTablet(mediaQueryTablet.matches);

    // Define callback functions to handle changes to the media queries
    const handleMediaQueryMobileChange = (event) => {
      setIsMobile(event.matches);
    };
    const handleMediaQueryTabletChange = (event) => {
      setIsTablet(event.matches);
    };

    // Add the callback functions as listeners for changes to the media queries
    mediaQueryMobile.addEventListener("change", handleMediaQueryMobileChange);
    mediaQueryTablet.addEventListener("change", handleMediaQueryTabletChange);

    // Remove the listeners when the component is unmounted
    return () => {
      mediaQueryMobile.removeEventListener(
        "change",
        handleMediaQueryMobileChange
      );
      mediaQueryTablet.removeEventListener(
        "change",
        handleMediaQueryTabletChange
      );
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 4, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} isTablet={isTablet} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
