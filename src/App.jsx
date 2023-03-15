import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef();

  useEffect(() => {
    //  ================== Basic Setup ==================
    // set the scene size
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene(); // set the scene

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000); // PerspectiveCamera (fov, aspect, near, far)
    camera.position.z = 5; // set the camera position

    const renderer = new THREE.WebGLRenderer({ antialias: true }); // set the renderer
    renderer.setClearColor("#858585"); // set the background color
    renderer.setSize(width, height); // set the size of the renderer

    mountRef.current.appendChild(renderer.domElement);

    //  ================== End Setup ==================

    // const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry (width, height, depth)
    // const material = new THREE.MeshBasicMaterial({ color: "#433F81" }); // MeshBasicMaterial (color)
    // const cube = new THREE.Mesh(geometry, material); // Mesh (geometry, material)
    // scene.add(cube);

    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    // const edges = new THREE.EdgesGeometry(geometry);
    // const line = new THREE.LineSegments(
    //   edges,
    //   new THREE.LineBasicMaterial({ color: 0xffffff })
    // );
    // scene.add(line);

    const geometry = new THREE.SphereGeometry(100, 100, 100);

    const wireframe = new THREE.WireframeGeometry(geometry);

    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;

    scene.add(line);

    const renderScene = () => renderer.render(scene, camera);

    // animation loop
    const animate = () => {
      line.rotation.x += 0.01;
      line.rotation.y += 0.01;
      renderScene();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div style={{ width: "100vw", height: "100vh" }} ref={mountRef} />;
};

export default ThreeScene;
