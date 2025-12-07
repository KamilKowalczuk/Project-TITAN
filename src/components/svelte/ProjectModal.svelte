<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  let { project, onClose } = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }

  // Parser Markdown
  function parseContent(text: string) {
    if (!text) return [];
    return text.split('\n\n').map(block => {
        if (block.startsWith('## ')) {
            return { type: 'heading', content: block.replace('## ', '') };
        }
        if (block.startsWith('- ')) {
            const items = block.split('\n').filter(line => line.startsWith('- '));
            return { 
                type: 'list', 
                items: items.map(item => {
                    const content = item.replace('- ', '');
                    const formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-lime font-normal">$1</strong>');
                    return formatted;
                })
            };
        }
        const formattedContent = block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-lime font-normal">$1</strong>');
        return { type: 'paragraph', content: formattedContent };
    });
  }

  const contentBlocks = $derived(parseContent(project.body));
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="fixed inset-0 z-[9999] flex items-center justify-center px-4 pt-24 pb-4 md:pt-32 md:pb-12 md:px-12"
  transition:fade={{ duration: 200 }}
>
  <div
    class="absolute inset-0 bg-black/90 backdrop-blur-md"
    onclick={onClose}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Enter" && onClose()}
  ></div>

  <div
    class="relative w-full max-w-5xl max-h-full bg-[#050505] border border-lime/30 shadow-[0_0_100px_rgba(204,255,0,0.15)] flex flex-col overflow-hidden rounded-sm"
    transition:scale={{ start: 0.95, duration: 400, easing: quartOut }}
  >
    <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lime z-50"></div>
    <div class="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-lime z-50"></div>
    <div class="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-lime z-50"></div>
    <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lime z-50"></div>

    <div
      class="flex-none flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-white/10 z-40"
    >
      <div class="flex items-center gap-4">
        <span class="text-lime font-mono text-xs border border-lime/30 px-2 py-1">
          ID: {project.id.toUpperCase()}
        </span>
        <span class="text-subtext font-mono text-xs hidden md:inline-block">
          // {project.data.cluster.toUpperCase()}
        </span>
      </div>

      <button
        onclick={onClose}
        class="group flex items-center gap-2 text-xs font-mono text-subtext hover:text-white transition-colors"
      >
        [ CLOSE ]
        <div class="w-6 h-6 border border-white/20 flex items-center justify-center group-hover:border-lime group-hover:bg-lime group-hover:text-black transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </div>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#050505]">
      
      {#if project.data.image}
        <div class="relative w-full h-64 md:h-[500px] border-b border-lime/20 bg-black group overflow-hidden shrink-0">
          <img
            src={project.data.image.src}
            alt={project.data.title}
            class="w-full h-full object-cover object-top opacity-90 transition-transform duration-1000 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
          <div class="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
        </div>
      {/if}

      <div class="border-b border-white/10 bg-[#080808] px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
        <div>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
            {project.data.title}
          </h2>
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 bg-lime animate-pulse"></span>
            <p class="text-subtext font-mono text-sm md:text-base tracking-wide">
              {project.data.subtitle}
            </p>
          </div>
        </div>

        <div class="text-right hidden md:block">
          <div class="text-[10px] font-mono text-lime mb-1 uppercase">
            Performance Metric
          </div>
          <div class="text-3xl font-display font-bold text-white">
            {project.data.metrics}
          </div>
        </div>
      </div>

      <div class="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 md:gap-16">
        
        <div class="space-y-6">
            {#each contentBlocks as block}
              {#if block.type === 'heading'}
                  <h3 class="text-xl font-display font-bold text-white mt-8 mb-4 border-l-2 border-lime pl-3">
                      {block.content}
                  </h3>
              {:else if block.type === 'list'}
                  <ul class="space-y-3 mb-6">
                      {#each block.items as item}
                          <li class="flex items-start gap-3 text-subtext/90 font-light leading-relaxed text-sm md:text-base">
                              <span class="mt-2 w-1.5 h-1.5 rounded-full bg-lime/50 shrink-0"></span>
                              <span>{@html item}</span>
                          </li>
                      {/each}
                  </ul>
              {:else}
                  <p class="text-subtext/90 font-light leading-relaxed text-sm md:text-base mb-4">
                      {@html block.content}
                  </p>
              {/if}
            {/each}
        </div>

        <div class="space-y-8">
          
          <div class="bg-[#0a0a0a] border border-white/5 p-5 md:hidden">
            <h4 class="text-xs font-mono text-subtext uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Impact</h4>
            <p class="text-2xl font-display font-bold text-white">{project.data.metrics}</p>
          </div>

          <div>
            <h4 class="text-xs font-mono text-subtext uppercase tracking-widest mb-4 flex items-center gap-2">
              <span class="w-1 h-1 bg-lime"></span> Technology Stack
            </h4>
            <div class="flex flex-wrap gap-2">
              {#each project.data.technologies as tech}
                <span class="text-xs font-mono text-lime/90 bg-lime/5 border border-lime/20 px-3 py-1.5 hover:bg-lime/10 transition-colors cursor-default">
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        </div>
      </div>

      {#if project.data.liveUrl}
        <div class="border-t border-white/10 bg-[#020202] p-8 md:p-12 flex flex-col items-center text-center mt-8 shrink-0">
            <p class="text-subtext font-mono text-[10px] uppercase tracking-[0.2em] mb-6 opacity-70">
                [ Ready for Deployment ]
            </p>
            
            <a 
                href={project.data.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                class="group relative inline-flex items-center justify-center gap-3 bg-lime text-black font-display font-bold text-sm md:text-base uppercase tracking-widest py-4 px-10 hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
                <span>Launch System</span>
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </a>

            <div class="mt-6 flex items-center gap-2 opacity-60">
                <div class="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></div>
                <span class="text-[9px] font-mono text-subtext uppercase">Secure Gateway Established</span>
            </div>
        </div>
      {/if}

    </div>
  </div>
</div>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #050505;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #222;
    border-radius: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #ccff00;
  }

  .bg-scanlines {
    background-size: 100% 4px;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.5) 50%
    );
  }
</style>