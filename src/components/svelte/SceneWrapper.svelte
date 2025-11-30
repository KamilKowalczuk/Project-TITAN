<script lang="ts">
  import { Canvas } from '@threlte/core';
  import CyberScene from './CyberScene.svelte';
  import { onMount } from 'svelte';

  // Flaga 1: Czy w ogóle montować Canvas (CPU load control)
  let mountCanvas = $state(false);
  
  // Flaga 2: Czy pokazać go wizualnie (GPU opacity control)
  let isVisible = $state(false);

  onMount(() => {
    // Sprawdzamy czy to Desktop
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (isDesktop) {
        // KROK 1: Czekamy 1s na załadowanie reszty strony
        setTimeout(() => {
            mountCanvas = true; // Montujemy <Canvas> w DOM (niewidoczny, opacity-0)

            // KROK 2: Dajemy klatkę oddechu, żeby DOM się przeliczył
            requestAnimationFrame(() => {
                // KROK 3: Płynne wejście
                isVisible = true; 
                
                // CRITICAL FIX DLA PRODUKCJI:
                // Czasem Canvas renderuje się jako 0x0px w ukrytym divie.
                // Wysyłamy sztuczny sygnał "resize", żeby Threlte przeliczyło wymiary.
                window.dispatchEvent(new Event('resize'));
            });
        }, 1000);
    }
  });
</script>

{#if mountCanvas}
  <div 
    class="w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity]"
    class:opacity-0={!isVisible}
    class:opacity-100={isVisible}
  >
    <Canvas>
      <CyberScene />
    </Canvas>
  </div>
{/if}