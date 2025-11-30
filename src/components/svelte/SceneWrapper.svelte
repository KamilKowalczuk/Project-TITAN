<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  import { onMount } from 'svelte';

  // State: Domyślnie false
  let isDesktop = $state(false);
  let isMounted = $state(false);

  onMount(() => {
    // Sprawdzamy środowisko
    isDesktop = window.matchMedia('(min-width: 768px)').matches;
    // Oznaczamy, że komponent zamontowany (pozwala na renderowanie po stronie klienta)
    isMounted = true;
  });
</script>

{#if isMounted && isDesktop}
  <div class="absolute inset-0 w-full h-full fade-in">
    <Canvas>
      <CyberScene />
    </Canvas>
  </div>
{/if}

<style>
  /* Prosta, niezawodna animacja CSS */
  .fade-in {
    opacity: 0;
    animation: fadeIn 1.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>