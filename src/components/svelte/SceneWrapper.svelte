<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  // Dynamiczny import komponentu CyberScene - Code Splitting
  // Astro nie załaduje kodu Three.js dopóki go nie potrzebujemy
  let SceneComponent = $state(null);
  let isMounted = $state(false);

  onMount(() => {
    // Opóźniamy start 3D o 1.5 sekundy po załadowaniu strony
    // To daje procesorowi czas na obsłużenie wideo i animacji CSS
    setTimeout(async () => {
        const module = await import('./CyberScene.svelte'); // Dynamic import
        SceneComponent = module.default;
        isMounted = true;
    }, 1500);
  });
</script>

<div class="w-full h-full absolute inset-0 transition-opacity duration-1000 {isMounted ? 'opacity-100' : 'opacity-0'}">
    {#if SceneComponent}
        <SceneComponent />
    {/if}
</div>