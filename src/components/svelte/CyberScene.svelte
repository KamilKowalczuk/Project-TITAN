<script lang="ts">
  import * as THREE from 'three';
  import { T, useTask } from '@threlte/core';
  import { Grid } from '@threlte/extras';
  
  let zPosition = $state(0);
  const SPEED = 3; 
  const CELL_SIZE = 2;      
  const SECTION_SIZE = 20;  

  // Bezpieczne sprawdzanie mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  // Optymalizacja siatki (zachowujemy to, bo jest dobre)
  const currentGridSize = (isMobile ? [30, 30] : [60, 60]) as [number, number];

  useTask((delta: number) => {
    // Na mobile nie liczymy pozycji (chociaż i tak komponent nie powinien być zamontowany przez SceneWrapper)
    if (isMobile) return;
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

<T.Fog args={['#000000', 1, 25]} />

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