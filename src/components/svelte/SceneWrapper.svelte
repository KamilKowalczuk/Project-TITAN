<script lang="ts">
  import { onMount } from 'svelte';
  
  // Zmienna z Dużej Litery - Svelte 5 potraktuje ją jako komponent
  let System3D = $state<any>(null);
  let showScene = $state(false);

  onMount(() => {
    const initLoad = async () => {
      // 1. Importujemy SYSTEM (z Canvasem), a nie samą scenę
      // Vite wydzieli to do osobnego pliku .js (code splitting)
      const module = await import('./CyberSystem.svelte');
      
      // 2. Przypisujemy default export do zmiennej
      System3D = module.default;
      showScene = true;
    };

    if ('requestIdleCallback' in window) {
        // Czekamy na luz procesora (max 4 sekundy)
        requestIdleCallback(() => initLoad(), { timeout: 4000 });
    } else {
        setTimeout(initLoad, 1000);
    }
  });
</script>

{#if showScene && System3D}
  <div class="absolute inset-0 w-full h-full animate-in fade-in duration-1000">
    <System3D />
  </div>
{/if}