<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  
  // Opcjonalnie: Przenosimy tu logikę resize, jeśli chcesz być super bezpieczny
  // ale Canvas sam w sobie radzi sobie nieźle wewnątrz kontenera
</script>

<div class="absolute inset-0 w-full h-100dvh" style="pointer-events: none;">
  <Canvas>
    <CyberScene />
  </Canvas>
</div>