<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  
  // Tutaj Canvas tworzy ciężki kontekst WebGL.
  // Ten plik waży najwięcej przez import @threlte/core i three.js
</script>

<div class="absolute inset-0 w-full h-full">
  <Canvas>
    <CyberScene />
  </Canvas>
</div>