<script lang="ts">
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate'; 

  // 1. Dane wejściowe
  let { projects = [] } = $props();

  // 2. Stan
  let activeCluster = $state('all');

  // 3. Klastry (Menu Techniczne)
  const clusters = [
    { id: 'all', label: '// ALL_SYSTEMS' },
    { id: 'engineering', label: '// ENG_DATA' },
    { id: 'modern_web', label: '// WEB_OS' },
    { id: 'ecommerce', label: '// ECOMM_LAB' },
    { id: 'deep_tech', label: '// DEEP_TECH' }
  ];

  // 4. Filtrowanie (Reaktywne)
  let filteredProjects = $derived(
    activeCluster === 'all' 
      ? projects 
      : projects.filter(p => p.data.cluster === activeCluster)
  );
</script>

<div class="w-full relative z-10">
  
  <div class="flex flex-wrap gap-x-8 gap-y-4 mb-20 border-b border-white/10 pb-8 items-center">
    <span class="text-xs font-mono text-subtext uppercase tracking-widest mr-4 hidden md:inline-block">
      [ SELECT_PROTOCOL ]:
    </span>
    {#each clusters as cluster}
      <button 
        onclick={() => activeCluster = cluster.id}
        class="group relative text-xs md:text-sm font-mono uppercase tracking-wider transition-all duration-200
        {activeCluster === cluster.id ? 'text-lime' : 'text-subtext hover:text-white'}"
      >
        {#if activeCluster === cluster.id}
          <span class="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-lime animate-pulse"></span>
        {/if}
        
        {cluster.label}
        
        <span class="absolute bottom-0 left-0 w-0 h-1px bg-lime transition-all duration-300 group-hover:w-full opacity-50"></span>
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each filteredProjects as project (project.id)}
      <div 
        animate:flip={{ duration: 400 }}
        in:fade={{ duration: 300 }}
        class="h-full"
      >
        <article 
          class="group relative h-full bg-surface border border-white/5 overflow-hidden hover:border-lime/40 transition-colors duration-300 flex flex-col md:grid md:grid-cols-[1.2fr_1fr]"
        >
          <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-lime transition-colors z-30"></div>
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-lime transition-colors z-30"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-lime transition-colors z-30"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-lime transition-colors z-30"></div>

            <div class="p-8 flex flex-col justify-between relative z-20 bg-noise border-r border-white/5 h-full">
              
              <div>
                <div class="flex justify-between items-start mb-6">
                  <span class="text-[10px] font-mono text-lime border border-lime/20 px-1.5 py-0.5">
                    {project.data.cluster.toUpperCase().slice(0, 3)}
                  </span>
                  <span class="text-[10px] font-mono text-subtext">ID: {project.id.slice(0,4).toUpperCase()}</span>
                </div>

                <h3 class="text-3xl font-display font-bold text-white mb-2 group-hover:text-lime transition-colors duration-300 leading-none">
                  {project.data.title}
                </h3>
                <p class="text-sm font-mono text-subtext mb-8 border-l-2 border-white/10 pl-3">
                  {project.data.subtitle}
                </p>
              </div>

              <div class="space-y-6">
                <div class="bg-void/50 border border-white/5 p-3">
                  <p class="text-[10px] text-subtext uppercase tracking-wider mb-1">Business Impact</p>
                  <p class="text-lg font-display font-bold text-white">{project.data.metrics}</p>
                </div>

                <div class="flex flex-wrap gap-2">
                  {#each project.data.technologies as tech}
                    <span class="text-[10px] font-mono text-subtext/80 bg-white/5 px-2 py-1 group-hover:text-white transition-colors">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>

            </div>

            <div class="relative h-64 md:h-auto overflow-hidden bg-void group-image-wrapper">
                
                {#if project.data.image}
                  <img 
                    src={project.data.image.src} 
                    alt={project.data.title}
                    class="absolute inset-0 w-full h-full object-cover 
                           opacity-50 grayscale mix-blend-luminosity
                           group-hover:opacity-100 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-105
                           transition-all duration-700 ease-out"
                  />
                {/if}

                <div class="absolute inset-0 bg-linear-to-t from-void via-void/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div class="absolute inset-0 bg-size:20px_20px bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] pointer-events-none"></div>

                <div class="absolute bottom-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <div class="w-10 h-10 bg-lime text-void flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </div>
                </div>
            </div>

        </article>
      </div>
    {/each}
  </div>
</div>