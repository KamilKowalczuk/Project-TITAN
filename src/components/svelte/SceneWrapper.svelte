<script lang="ts">
  import { Canvas } from '@threlte/core'; // Przywracamy Canvas!
  import CyberScene from './CyberScene.svelte';
  import { onMount } from 'svelte';

  let isVisible = $state(false);

  onMount(() => {
    // Subtelny fade-in, żeby scena nie "wskoczyła" nagle
    isVisible = true;
  });
</script>

<div class="w-full h-full absolute inset-0 transition-opacity duration-1000 {isVisible ? 'opacity-100' : 'opacity-0'}">
  <Canvas>
    <CyberScene />
  </Canvas>
</div>