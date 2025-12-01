<script lang="ts">
  import { onMount } from 'svelte';
  import type { Component } from 'svelte'; // Importujemy typ dla TS

  // FIX TS: Jawnie definiujemy typ zmiennej. 
  // Mówimy: "To będzie Komponent Svelte albo null".
  let HeavyComponent: Component | null = $state(null);

  onMount(() => {
    // Strategia "Lazy Load"
    setTimeout(async () => {
        // Importujemy dynamicznie
        const module = await import('./Heavy3D.svelte');
        
        // Przypisujemy komponent. Dzięki typowaniu wyżej, TS już nie krzyczy.
        HeavyComponent = module.default as Component;
        
        // Trigger resize dla pewności (fix mobile)
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }, 200); 
  });
</script>

{#if HeavyComponent}
  <div class="fade-in">
    <HeavyComponent />  </div>
{/if}

<style>
  .fade-in {
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
</style>