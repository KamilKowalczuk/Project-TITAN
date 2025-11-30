<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Logo from './Logo.svelte';

  // State
  let isVisible = $state(true);
  let currentText = $state('>_ SYSTEM_INIT');
  let progress = $state(0);
  let showContent = $state(false);

  const messages = [
    '>_ CONNECTING_NEURAL_NET...',
    '>_ ASSETS_DECRYPTED...',
    '>_ ACCESS_GRANTED.'
  ];

  onMount(() => {
    // 1. SPRAWDZENIE SESJI: Jeśli użytkownik już tu był, nie pokazuj preloadera
    const hasSeenPreloader = sessionStorage.getItem('titan_preloader_seen');

    if (hasSeenPreloader) {
      isVisible = false;
      return; 
    }

    // 2. BLOKADA SCROLLA (tylko jeśli pokazujemy preloader)
    document.body.style.overflow = 'hidden';
    showContent = true;

    // 3. LOGIKA SZYBKIEGO ŁADOWANIA
    // Symulujemy szybki load, ale płynny
    setTimeout(() => { progress = 30; currentText = messages[0]; }, 100);
    setTimeout(() => { progress = 70; currentText = messages[1]; }, 600);
    setTimeout(() => { progress = 100; currentText = messages[2]; }, 1000);

    // 4. KONIEC
    setTimeout(() => {
      isVisible = false;
      document.body.style.overflow = ''; // Przywróć scroll
      sessionStorage.setItem('titan_preloader_seen', 'true'); // Zapisz w sesji
    }, 1400); // Całość trwa 1.4s zamiast 2.5s
  });
</script>

{#if isVisible && showContent}
  <div 
    out:fade={{ duration: 500 }}
    class="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center cursor-wait"
  >
    
    <div class="mb-12 relative">
      <div class="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
        <div class="animate-pulse">
            <Logo class="w-full h-full text-white" />
        </div>
      </div>
      
      <div class="absolute inset-0 bg-lime/10 blur-3xl rounded-full animate-pulse pointer-events-none"></div>
    </div>

    <div class="w-64 h-2px bg-white/10 relative overflow-hidden mb-6">
      <div 
        class="h-full bg-lime shadow-[0_0_15px_rgba(204,255,0,0.8)] transition-all duration-500 ease-out"
        style="width: {progress}%"
      ></div>
    </div>

    <div class="h-6 flex items-center justify-center min-w-[200px]">
      <p class="font-mono text-[10px] md:text-xs text-lime tracking-[0.2em] uppercase">
        {currentText}<span class="animate-pulse">_</span>
      </p>
    </div>

    <div class="absolute bottom-8 text-[10px] font-mono text-white/20 tracking-widest">
      TITAN_OS v1.0
    </div>

  </div>
{/if}