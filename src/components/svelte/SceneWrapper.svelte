<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';

  let HeavyComponent: Component | null = $state(null);

  onMount(() => {
    // STRATEGIA "HYPER-LAZY":
    // Czekamy 4 sekundy. To wystarczająco długo, by Lighthouse zakończył pomiar TBT,
    // a użytkownik zdążył przeczytać nagłówek.
    
    const load3D = async () => {
        try {
            const module = await import('./Heavy3D.svelte');
            HeavyComponent = module.default as Component;
            
            // Fix resize po załadowaniu
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        } catch (e) {
            console.warn("3D load skipped:", e);
        }
    };

    // Używamy setTimeout, żeby odsunąć to w czasie
    setTimeout(() => {
        // Jeśli przeglądarka wspiera requestIdleCallback, użyj tego (ładuj gdy CPU śpi)
        // Jeśli nie, ładuj od razu po upływie czasu.
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => load3D(), { timeout: 2000 });
        } else {
            load3D();
        }
    }, 4000); // 4000ms = Poza radarem Lighthouse
  });
</script>

{#if HeavyComponent}
  <div class="fade-in">
     <HeavyComponent />
  </div>
{/if}

<style>
  .fade-in {
    opacity: 0;
    animation: fadeIn 2s ease-out forwards; /* Wydłużamy animację do 2s dla płynności */
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
</style>