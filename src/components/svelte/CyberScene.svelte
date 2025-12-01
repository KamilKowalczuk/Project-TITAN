<script lang="ts">
  import * as THREE from 'three';
  import { T, useTask } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  
  let zPosition = $state(0);
  const SPEED = 3; 
  const CELL_SIZE = 2;      
  const SECTION_SIZE = 20;  

  // Wykrywanie mobile tylko dla optymalizacji GEOMETRII (ilość linii), a nie wyłączania
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Mobile: Siatka 30x30 (lżej). Desktop: 60x60 (ładniej).
  const currentGridSize = (isMobile ? [30, 30] : [60, 60]) as [number, number];

  useTask((delta: number) => {
    // USUNIĘTO BLOKADĘ: if (isMobile) return; 
    // Teraz animacja działa wszędzie!
    zPosition = (zPosition + delta * SPEED) % SECTION_SIZE;
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 2, 12]}
  fov={80}
  oncreate={(ref: THREE.PerspectiveCamera) => {
    ref.lookAt(0, -2, -30);
  }}
/>

<T.Fog args={['#000000', 5, 30]} />

<T.Group position={[0, -4, 0]}> 
  <Grid
    position.z={zPosition}
    gridSize={currentGridSize}
    cellSize={CELL_SIZE}
    sectionSize={SECTION_SIZE}
    cellColor="#0a1a0a"     
    sectionColor="#3a4d00"   
    cellThickness={1}
    sectionThickness={1.5}
    fadeDistance={25} 
    infiniteGrid
  />
</T.Group>

<T.PointLight position={[0, 2, 5]} intensity={1} color="#CCFF00" distance={15} decay={2} />