<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  import { onMount } from 'svelte';

  // Domyślnie wyłączone (TBT = 0ms na starcie)
  let show3D = $state(false);

  onMount(() => {
    // Sprawdzamy czy to Desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop) {
        // Czekamy 1 sekundę aż strona się w pełni załaduje i procesor odpocznie
        setTimeout(() => {
            show3D = true;
        }, 1000);
    }
  });
</script>

{#if show3D}
  <div class="w-full h-full absolute inset-0 fade-in-anim">
    <Canvas>
      <CyberScene />
    </Canvas>
  </div>
{/if}

<style>
  .fade-in-anim {
    opacity: 0;
    animation: fadeIn 1.5s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>