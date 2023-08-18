import * as THREE from 'three';

export function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
  
  return color;
}

// Helper function to generate a random position vector within given ranges
interface Range {
    fromX: number;
    toX: number;
    fromY: number;
    toY: number;
    fromZ: number;
    toZ: number;
  }

interface RandomVectorParams {
    xRange: { fromX: number; toX: number };
    yRange: { fromY: number; toY: number };
    zRange: { fromZ: number; toZ: number };
  }

interface RandomRotationParams {
    xRange: { fromX: number; toX: number };
    yRange: { fromY: number; toY: number };
    zRange: { fromZ: number; toZ: number };
  }

// Helper function to generate a random number within a range
function randomInRange(min:number, max:number):number {
    return Math.random() * (max - min) + min;
  }
  
  export function randomVector({ xRange, yRange, zRange }: RandomVectorParams): THREE.Vector3 {
    const x = randomInRange(xRange.fromX, xRange.toX);
    const y = randomInRange(yRange.fromY, yRange.toY);
    const z = randomInRange(zRange.fromZ, zRange.toZ);
    return new THREE.Vector3(x, y, z);
  }

  export function randomRotation({ xRange, yRange, zRange }: RandomRotationParams): THREE.Euler {
    const x = randomInRange(xRange.fromX, xRange.toX);
    const y = randomInRange(yRange.fromY, yRange.toY);
    const z = randomInRange(zRange.fromZ, zRange.toZ);
    return new THREE.Euler(x, y, z, 'XYZ');
  }

