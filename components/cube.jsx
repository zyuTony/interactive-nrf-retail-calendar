"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Cube() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Create multiple cubes
    const cubes = []; // Store cubes for animation
    for (let i = 0; i < 5; i++) {
      // Example: create 5 cubes
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = Math.random() * 5 - 2.5; // Randomize position
      cube.position.y = Math.random() * 5 - 2.5;
      scene.add(cube);
      cubes.push(cube);
    }

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-screen flex justify-center items-center"
    ></div>
  );
}
