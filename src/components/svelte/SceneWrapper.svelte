<script lang="ts">
  import { onMount, onDestroy, mount, unmount } from 'svelte';
  
  // To jest nasz "uchwyt" do elementu w DOM
  let container: HTMLElement | null = null;
  // Tutaj przechowamy instancję aplikacji 3D, żeby móc ją zniszczyć przy wyjściu
  let appInstance: any = null;

  onMount(() => {
    const init = async () => {
      // 1. Mobile Guard: Jeśli to telefon, przerywamy. Nie pobieramy 3D.
      if (window.matchMedia("(max-width: 768px)").matches) return;
      
      // Jeśli kontener z jakiegoś powodu nie istnieje, też kończymy
      if (!container) return;

      try {
        // 2. Pobieramy plik. To jest moment, w którym leci request sieciowy.
        const module = await import('./CyberSystem.svelte');
        const Component = module.default;

        // 3. MANUAL MOUNT (To jest klucz do sukcesu)
        // Zamiast wrzucać komponent do HTML-a poniżej, montujemy go ręcznie funkcją JS.
        // Dzięki temu Svelte/Vite nie wtrąca się w to, czym jest "Component".
        appInstance = mount(Component, {
          target: container,
        });

      } catch (e) {
        console.error("3D Load Error:", e);
      }
    };

    // Smart Idle Strategy
    if ('requestIdleCallback' in window) {
      // Rzutowanie (window as any) żeby TS nie krzyczał
      (window as any).requestIdleCallback(init, { timeout: 4000 });
    } else {
      setTimeout(init, 1500);
    }
  });

  onDestroy(() => {
    // Sprzątamy pamięć (WebGL Context) przy zmianie strony
    if (appInstance) {
      unmount(appInstance);
    }
  });
</script>

<div bind:this={container} class="absolute inset-0 w-full h-full animate-in fade-in duration-1000"></div>