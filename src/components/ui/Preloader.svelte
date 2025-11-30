<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Logo from './Logo.svelte';

  let isVisible = $state(true);
  let currentText = $state('> Initializing System...');
  let progress = $state(0);

  const messages = [
    '> Initializing System...',
    '> Loading Neural Networks...',
    '> Kamil_Kowalczuk_Ready.'
  ];

  onMount(() => {
    const progressInterval = setInterval(() => {
      if (progress < 100) {
        progress += Math.random() * 5;
      }
      if (progress > 100) progress = 100;
    }, 50);

    let msgIndex = 0;
    const textInterval = setInterval(() => {
      msgIndex++;
      if (msgIndex < messages.length) {
        currentText = messages[msgIndex];
      }
    }, 800);

    setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      progress = 100;
      currentText = messages[2];
      
      setTimeout(() => {
        isVisible = false;
        document.body.style.overflow = 'auto';
      }, 500);
    }, 2500);
  });
</script>

{#if isVisible}
  <div 
    out:fade={{ duration: 800 }}
    class="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center cursor-wait"
  >
    
    <div class="mb-12 relative">
      <div class="w-32 h-32 flex items-center justify-center animate-pulse">
        <Logo class="w-full h-full text-white" />
      </div>
      
      <div class="absolute inset-0 bg-lime/20 blur-3xl rounded-full animate-pulse-slow pointer-events-none"></div>
    </div>

    <div class="w-64 h-1 bg-surface relative overflow-hidden mb-4">
      <div 
        class="h-full bg-lime shadow-[0_0_10px_rgba(204,255,0,0.5)] transition-all duration-100 ease-out"
        style="width: {progress}%"
      ></div>
    </div>

    <div class="h-6 flex items-center">
      <p class="font-mono text-xs text-lime tracking-widest uppercase">
        {currentText}<span class="animate-pulse">_</span>
      </p>
    </div>

    <div class="absolute bottom-8 right-8 text-[10px] font-mono text-subtext/50">
      SYS_BOOT_V4.0
    </div>

  </div>
{/if}

<style>
  :global(body) {
    overflow: hidden;
  }
</style>