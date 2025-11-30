<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  import { onMount } from 'svelte';

  // State: Domyślnie false.
  let shouldRender = $state(false);

  onMount(() => {
    // Proste sprawdzenie. Żadnych timeoutów, żadnych tricków.
    // Jeśli przeglądarka ma > 768px, renderujemy.
    if (window.matchMedia('(min-width: 768px)').matches) {
        shouldRender = true;
    }
  });
</script>

{#if shouldRender}
  <div class="absolute inset-0 w-full h-full" style="pointer-events: none;">
    <Canvas>
      <CyberScene />
    </Canvas>
  </div>
{/if}