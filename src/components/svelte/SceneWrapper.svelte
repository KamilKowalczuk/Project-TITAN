<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  import { onMount } from 'svelte';

  // Flaga do montowania komponentu (ciężka operacja)
  let show3D = $state(false);
  // Flaga do widoczności (lekka operacja CSS)
  let isVisible = $state(false);

  onMount(() => {
    // 1. Sprawdzamy Mobile/Desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop) {
        // Zwiększamy delay do 1000ms. Niech strona najpierw stanie się w pełni interaktywna.
        setTimeout(() => {
            // Faza 1: Montujemy Canvas (procesor pracuje)
            show3D = true;
            
            // Faza 2: Po krótkiej chwili włączamy opacity (GPU pracuje)
            // requestAnimationFrame daje pewność, że Canvas już jest w DOM
            requestAnimationFrame(() => {
                setTimeout(() => {
                    isVisible = true;
                }, 100); 
            });
        }, 1000); 
    }
  });
</script>

{#if show3D}
  <div 
    class="w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out"
    class:opacity-0={!isVisible}
    class:opacity-100={isVisible}
  >
    <Canvas>
      <CyberScene />
    </Canvas>
  </div>
{/if}