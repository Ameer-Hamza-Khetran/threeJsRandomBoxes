'use client'

import * as THREE from 'three';
import GUI from 'lil-gui';
import { gsap, random } from "gsap";
import {Box} from '@chakra-ui/react';
import {useEffect, useRef} from "react";
import Stats from 'stats.js';
import {randomColor, randomVector, randomRotation} from '@/app/components/helperFunctions'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function Scene() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if(typeof window !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
            const renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setClearColor(0xffffff);

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            camera.position.z = 5;

            //--------- Floor ---------
            const groundGeometry = new THREE.PlaneGeometry(5,5)
            const groundMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff
            })
            const floor = new THREE.Mesh(groundGeometry, groundMaterial)
            floor.position.set(0, -2, 0)
            floor.rotation.set(Math.PI / -2, 0, 0)
            scene.add(floor);

            //--------- Lights ----------
            const ambientLight = new THREE.AmbientLight(0x666666);
            const directionalLight = new THREE.DirectionalLight(0xaaaaaa);
            scene.add(ambientLight);
            scene.add(directionalLight);

            //---------- Adding Cube -------
            const addCube = (scene:THREE.Scene) => {
                const color = randomColor();
                const position = randomVector({
                    xRange: { fromX: -4, toX: 4 },
                    yRange: { fromY: -3, toY: 3 },
                    zRange: { fromZ: -4, toZ: 4 },
                  });
                const rotation = randomRotation({
                    xRange: { fromX: 0, toX: Math.PI * 2 },
                    yRange: { fromY: 0, toY: Math.PI * 2 },
                    zRange: { fromZ: 0, toZ: Math.PI * 2 },
                  });
                const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                const cubeMaterial = new THREE.MeshStandardMaterial({
                color: color,
                roughness: 0.1,
                metalness: 0.9,
                });
                const cube = new THREE.Mesh(geometry, cubeMaterial);
                cube.position.copy(position);
                cube.rotation.set(rotation.x, rotation.y, rotation.z);
                cube.castShadow = true;
                scene.add(cube);
            };

            const addMultipleCubes = (scene: THREE.Scene, numCubes: number) => {
                for (let i = 0; i < numCubes; i++) {
                  addCube(scene);
                }
              };

            
            addMultipleCubes(scene, 30);

            containerRef.current?.appendChild(renderer.domElement);

            //-------- Orbit Controls --------
            const orbitControls = new OrbitControls(camera, renderer.domElement);

            // ------ Stats -------
            const stats = new Stats();
            stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild( stats.dom );

            const animate = () => {
                stats.update();
                orbitControls.update();
                renderer.render(scene, camera);
                renderer.setAnimationLoop(animate);
            }
            animate();

        }
    },[])
    return(
        <Box ref={containerRef}></Box>
    );
}