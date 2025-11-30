<script lang="ts">
  import * as THREE from 'three';
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';

  /**
   * HACK SYSTEMOWY:
   * Definiujemy konfigurację jako luźny obiekt, aby ominąć 
   * niekompletne definicje typów w wersji beta Threlte.
   * * Runtime (przeglądarka) to zrozumie i zastosuje przezroczystość,
   * a TypeScript przestanie blokować builda.
   */
  const canvasOptions = {
    toneMapping: THREE.NoToneMapping,
    rendererParameters: {
      alpha: true,                 // Kluczowe dla widoczności wideo
      antialias: true,             // Kluczowe dla gładkich linii
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    }
  };
</script>

<div class="absolute inset-0 w-full h-full">
  <Canvas {...canvasOptions}>
    <CyberScene />
  </Canvas>
</div>