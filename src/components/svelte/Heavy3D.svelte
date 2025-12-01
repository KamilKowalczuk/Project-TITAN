<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
</script>

<div class="absolute inset-0 w-full h-100dvh" style="pointer-events: none;">
  <Canvas>
    <CyberScene />
  </Canvas>
</div>