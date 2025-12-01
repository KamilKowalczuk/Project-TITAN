<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component } from 'svelte';

  let HeavyComponent: Component | null = $state(null);

  onMount(() => {
    // Hyper-Lazy Load (4 sekundy opóźnienia)
    setTimeout(async () => {
        try {
            const module = await import('./Heavy3D.svelte');
            HeavyComponent = module.default as Component;
            
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        } catch (e) {
            console.warn("3D load skipped:", e);
        }
    }, 4000); 
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
    animation: fadeIn 2s ease-out forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
</style>