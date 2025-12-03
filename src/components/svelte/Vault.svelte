<script lang="ts">
  import { fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { onMount } from 'svelte';
  
  // Importujemy komponent modala
  import ProjectModal from './ProjectModal.svelte';

  let { projects = [] } = $props();

  let activeCluster = $state('all');
  let activeProjectId = $state<string | null>(null);
  let selectedProject = $state<any>(null);

  const clusters = [
    { id: 'all', label: '// ALL_SYSTEMS' },
    { id: 'engineering', label: '// ENG_DATA' },
    { id: 'modern_web', label: '// WEB_OS' },
    { id: 'ecommerce', label: '// ECOMM_LAB' },
    { id: 'deep_tech', label: '// DEEP_TECH' }
  ];

  let filteredProjects = $derived(
    activeCluster === 'all' 
      ? projects 
      : projects.filter(p => p.data.cluster === activeCluster)
  );

  function openProject(project: any) {
    selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    selectedProject = null;
    document.body.style.overflow = '';
  }

  // SKANER (Mobile)
  let observer: IntersectionObserver;
  let projectElements = new Map<string, HTMLElement>();

  onMount(() => {
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isMobile) {
      const options = {
        root: null,
        rootMargin: '-45% 0px -45% 0px', 
        threshold: 0
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeProjectId = entry.target.getAttribute('data-id');
          }
        });
      }, options);

      projectElements.forEach(el => observer.observe(el));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  });

  function registerRef(node: HTMLElement, id: string) {
    projectElements.set(id, node);
    return {
      destroy() {
        projectElements.delete(id);
        if (observer) observer.unobserve(node);
      }
    };
  }

  function generateChartPath(id: string) {
    const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
    let path = "M0,80 ";
    for(let i=1; i<=10; i++) {
        const x = i * 20;
        const y = 80 - (Math.sin((seed + i) * 100) * 20 + (i * 5));
        path += `L${x},${Math.max(10, y)} `;
    }
    return path;
  }

  const archFastfetch = `                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`;
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

  {#if selectedProject}
    <ProjectModal project={selectedProject} onClose={closeProject} />
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {#each filteredProjects as project (project.id)}
      <div 
        animate:flip={{ duration: 400 }}
        in:fade={{ duration: 300 }}
        class="h-full perspective-container" 
        use:registerRef={project.id}
        data-id={project.id}
      >
        <div 
          onclick={() => openProject(project)}
          class="group relative h-full bg-surface border border-white/5 overflow-hidden transition-all duration-500 flex flex-col md:grid md:grid-cols-[1.2fr_1fr] cursor-pointer
          {activeProjectId === project.id ? 'is-active border-lime/40 shadow-[0_0_40px_rgba(204,255,0,0.15)]' : 'hover:border-lime/40'}"
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && openProject(project)}
        >
          <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-lime group-[.is-active]:border-lime transition-colors z-30"></div>
          <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-lime group-[.is-active]:border-lime transition-colors z-30"></div>
          <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-lime group-[.is-active]:border-lime transition-colors z-30"></div>
          <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-lime group-[.is-active]:border-lime transition-colors z-30"></div>

            <div class="p-8 flex flex-col justify-between relative z-20 bg-noise border-r border-white/5 h-full">
              <div>
                <div class="flex justify-between items-start mb-6">
                  <span class="text-[10px] font-mono text-lime border border-lime/20 px-1.5 py-0.5 bg-lime/5">
                    {project.data.cluster.toUpperCase().slice(0, 3)}
                  </span>
                  <span class="text-[10px] font-mono text-subtext">ID: {project.id.slice(0,4).toUpperCase()}</span>
                </div>

                <h3 class="text-3xl font-display font-bold text-white mb-2 group-hover:text-lime group-[.is-active]:text-lime transition-colors duration-300 leading-none drop-shadow-lg">
                  {project.data.title}
                </h3>
                <p class="text-sm font-mono text-subtext mb-8 border-l-2 border-white/10 pl-3">
                  {project.data.subtitle}
                </p>
              </div>

              <div class="space-y-6">
                <div class="bg-void/50 border border-white/5 p-3 backdrop-blur-sm">
                  <p class="text-[10px] text-subtext uppercase tracking-wider mb-1">Business Impact</p>
                  <p class="text-lg font-display font-bold text-white">{project.data.metrics}</p>
                </div>

                <div class="flex flex-wrap gap-2">
                  {#each project.data.technologies as tech}
                    <span class="text-[10px] font-mono text-subtext/80 bg-white/5 border border-white/5 px-2 py-1 group-hover:text-white group-[.is-active]:text-white transition-colors">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>
            </div>

            <div class="relative h-72 md:h-auto bg-[#050505] group-image-wrapper perspective-1000 flex items-center justify-center overflow-hidden">
                
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,30,30,1)_0%,rgba(5,5,5,1)_100%)]"></div>
                <div class="absolute inset-0 bg-grid-lg bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] opacity-20"></div>

                <div class="browser-deck w-[85%] aspect-[16/10] relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] preserve-3d
                            group-hover:transform-active group-[.is-active]:transform-active">
                  
                  <div class="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl overflow-hidden
                              layer-base transition-transform duration-700">
                      
                      <div class="absolute inset-0 bg-linear-to-b from-black/50 to-transparent pointer-events-none z-10"></div>
                      
                      {#if project.data.cluster === 'modern_web'}
                        <div class="h-8 w-full border-b border-white/5 bg-[#111] flex items-center px-3 space-x-1.5 opacity-50">
                            <div class="w-1.5 h-1.5 rounded-full bg-white/20"></div><div class="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        </div>
                        <div class="p-4 space-y-3 opacity-20 group-hover:opacity-40 group-[.is-active]:opacity-40 transition-opacity duration-500">
                             <div class="w-full h-24 border border-lime rounded-sm bg-lime/5 relative"><div class="absolute inset-0 bg-grid-sm bg-[linear-gradient(to_right,rgba(204,255,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(204,255,0,0.5)_1px,transparent_1px)]"></div></div>
                        </div>
                      
                      {:else if project.data.cluster === 'engineering'}
                        <div class="absolute inset-0 bg-grid-sm bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
                         <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full flex items-center justify-center">
                            <div class="w-2 h-2 bg-lime/50 rounded-full animate-ping"></div>
                         </div>

                      {:else if project.data.cluster === 'deep_tech'}
                         <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,#111_0px,#111_10px,#0a0a0a_10px,#0a0a0a_20px)] opacity-50"></div>
                         <div class="absolute bottom-4 left-4 text-[10px] font-mono text-white/20">System ID: {project.id.toUpperCase()}</div>

                      {:else if project.data.cluster === 'ecommerce'}
                        <div class="p-4 grid grid-cols-4 gap-2 opacity-20 font-mono text-[8px] text-lime">
                            {#each Array(16) as _} <div>+{(Math.random()*100).toFixed(2)}%</div> {/each}
                        </div>
                      {/if}
                  </div>

                  <div class="absolute inset-0 rounded-lg overflow-hidden z-10 bg-[#0d0d0d]
                              layer-screen transition-all duration-700 shadow-xl
                              border border-white/5 ring-1 ring-white/5 group-hover:ring-lime/50 group-[.is-active]:ring-lime/50">

                    {#if project.data.cluster === 'modern_web'}
                        <div class="h-8 w-full bg-linear-to-b from-[#2a2a2a] to-[#1a1a1a] border-b border-black flex items-center px-4 space-x-2 shadow-sm relative z-20">
                            <div class="flex space-x-1.5">
                                <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.3)] border border-black/20"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.3)] border border-black/20"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.3)] border border-black/20"></div>
                            </div>
                            <div class="ml-4 w-full max-w-[160px] h-4 bg-black/30 rounded-full border border-white/5 shadow-inner"></div>
                        </div>
                        <div class="relative w-full h-[calc(100%-2rem)] bg-black group-image-container">
                            {#if project.data.image}
                            <img src={project.data.image.src} alt={project.data.title} class="w-full h-full object-cover object-top grayscale opacity-50 mix-blend-luminosity brightness-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:brightness-100 group-[.is-active]:grayscale-0 group-[.is-active]:opacity-100 group-[.is-active]:mix-blend-normal group-[.is-active]:brightness-100 transition-all duration-700"/>
                            {/if}
                            <div class="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] group-[.is-active]:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-30 mix-blend-overlay"></div>
                            <div class="absolute inset-0 bg-scanlines z-10 pointer-events-none opacity-40"></div>
                        </div>

                    {:else if project.data.cluster === 'engineering'}
                        <div class="h-8 w-full bg-[#080808] border-b border-white/10 flex items-center px-4 justify-between relative z-20">
                             <div class="text-[9px] font-mono text-white/50 tracking-widest uppercase">RETENTION_FLOW // AUTO</div>
                             <div class="flex items-center gap-1.5">
                                <span class="text-[8px] font-mono text-lime">RUNNING</span>
                                <div class="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></div>
                             </div>
                        </div>
                        <div class="w-full h-[calc(100%-2rem)] bg-[#050505] relative flex items-center justify-center p-2">
                            <svg class="w-full h-full" viewBox="0 0 240 100" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <filter id="glow-flow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                <path d="M30,50 L90,50 L150,50 L210,50" stroke="#222" stroke-width="2" fill="none" />
                                <path d="M30,50 L90,50 L150,50 L210,50" stroke="#CCFF00" stroke-width="1.5" fill="none" 
                                      stroke-dasharray="10 230" stroke-dashoffset="240"
                                      filter="url(#glow-flow)"
                                      class="transition-all duration-[2.5s] ease-linear group-hover:animate-dash group-[.is-active]:animate-dash opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100" />
                                <g class="group/node">
                                    <path d="M15,45 C15,40 45,40 45,45 L45,55 C45,60 15,60 15,55 Z" fill="#111" stroke="#444" stroke-width="1.5" class="group-hover:stroke-white transition-colors"/>
                                    <ellipse cx="30" cy="45" rx="15" ry="5" fill="#1a1a1a" stroke="#444" stroke-width="1.5" class="group-hover:stroke-white transition-colors"/>
                                    <text x="30" y="72" font-family="monospace" font-size="6" fill="#666" text-anchor="middle" class="group-hover:fill-lime transition-colors">DB</text>
                                </g>
                                <g class="group/node">
                                    <circle cx="90" cy="50" r="14" fill="#111" stroke="#444" stroke-width="1.5" class="group-hover:stroke-white transition-colors" />
                                    <path d="M90,50 L90,42 M90,50 L95,50" stroke="#666" stroke-width="1.5" stroke-linecap="round" class="group-hover:stroke-lime transition-colors" />
                                    <text x="90" y="72" font-family="monospace" font-size="6" fill="#666" text-anchor="middle" class="group-hover:fill-lime transition-colors">WAIT 2Y</text>
                                </g>
                                <g class="group/node">
                                    <rect x="136" y="36" width="28" height="28" rx="4" fill="#111" stroke="#444" stroke-width="1.5" class="group-hover:stroke-white transition-colors" />
                                    <path d="M142,50 L158,50 M150,42 L150,58" stroke="#CCFF00" stroke-width="1.5" opacity="0.3" class="group-hover:opacity-100 transition-opacity" />
                                    <circle cx="150" cy="50" r="2" fill="#CCFF00" class="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <text x="150" y="72" font-family="monospace" font-size="6" fill="#666" text-anchor="middle" class="group-hover:fill-lime transition-colors">AI PROC</text>
                                </g>
                                <g class="group/node">
                                    <rect x="196" y="40" width="28" height="20" rx="2" fill="#111" stroke="#444" stroke-width="1.5" class="group-hover:stroke-white transition-colors" />
                                    <path d="M196,40 L210,52 L224,40" fill="none" stroke="#444" stroke-width="1" class="group-hover:stroke-white transition-colors" />
                                    <text x="210" y="72" font-family="monospace" font-size="6" fill="#666" text-anchor="middle" class="group-hover:fill-lime transition-colors">SEND</text>
                                </g>
                            </svg>
                            <div class="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] group-[.is-active]:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-30 mix-blend-overlay"></div>
                        </div>

                    {:else if project.data.cluster === 'deep_tech'}
                        <div class="h-8 w-full bg-[#050505] border-b border-white/10 flex items-center px-4 justify-between relative z-20">
                            <div class="flex items-center gap-2 font-mono text-[9px] text-subtext/60">
                                <span class="w-2 h-2 rounded-full bg-white/10"></span>
                                <span>TERMINAL</span>
                            </div>
                            <div class="flex gap-1.5">
                                <div class="w-1.5 h-1.5 rounded-full bg-[#ff5f56] opacity-50"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-[#ffbd2e] opacity-50"></div>
                                <div class="w-1.5 h-1.5 rounded-full bg-[#27c93f] opacity-50"></div>
                            </div>
                        </div>
                        <div class="w-full h-[calc(100%-2rem)] bg-[#0a0a0a] p-4 font-mono leading-none overflow-hidden relative flex flex-col justify-center">
                            <div class="text-[9px] text-white/50 mb-3 font-bold font-mono">
                                <span class="text-lime">➜</span> <span class="text-cyan-400">~</span> fastfetch
                            </div>
                            <div class="flex items-start gap-4">
                                <div class="text-cyan-400 text-[5px] leading-[1.1] whitespace-pre font-bold shrink-0 opacity-90">
{archFastfetch}
                                </div>
                                <div class="text-[9px] leading-relaxed space-y-1 z-10 w-full">
                                    <div class="flex"><span class="text-cyan-400 w-10 font-bold">OS</span> <span class="text-white">Arch Linux</span></div>
                                    <div class="flex"><span class="text-cyan-400 w-10 font-bold">Host</span> <span class="text-white">Titan WS</span></div>
                                    <div class="flex"><span class="text-cyan-400 w-10 font-bold">Kernel</span> <span class="text-white">6.8.9-zen</span></div>
                                    <div class="flex"><span class="text-cyan-400 w-10 font-bold">Uptime</span> <span class="text-lime">14 mins</span></div>
                                    <div class="flex"><span class="text-cyan-400 w-10 font-bold">Pkgs</span> <span class="text-white">1556</span></div>
                                    <div class="flex gap-1 mt-2 pt-1 opacity-80">
                                        <div class="w-2 h-2 bg-black"></div><div class="w-2 h-2 bg-red-500"></div>
                                        <div class="w-2 h-2 bg-green-500"></div><div class="w-2 h-2 bg-yellow-500"></div>
                                        <div class="w-2 h-2 bg-blue-500"></div><div class="w-2 h-2 bg-purple-500"></div>
                                        <div class="w-2 h-2 bg-cyan-500"></div><div class="w-2 h-2 bg-white"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-auto text-lime text-[10px] flex items-center gap-1 pt-2">
                                <span class="text-cyan-400">➜</span> <span class="text-white">~</span> <span class="animate-pulse block w-1.5 h-3 bg-lime"></span>
                            </div>
                            <div class="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] group-[.is-active]:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-30 mix-blend-overlay"></div>
                            <div class="absolute inset-0 bg-scanlines z-10 pointer-events-none opacity-20"></div>
                        </div>

                    {:else if project.data.cluster === 'ecommerce'}
                        <div class="h-8 w-full bg-[#0a0a0a] border-b border-white/10 flex items-center px-4 justify-between relative z-20">
                             <div class="text-[9px] font-mono text-white/50">REVENUE_HUD</div>
                             <div class="text-[9px] font-mono text-lime border border-lime/30 px-1 rounded-xs">LIVE</div>
                        </div>
                        <div class="w-full h-[calc(100%-2rem)] bg-[#030303] relative p-4 flex flex-col justify-end overflow-hidden">
                             <div class="absolute inset-0 bg-grid-lg bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>
                             
                             <div class="absolute top-4 right-4 text-right z-10">
                                <div class="text-[9px] font-mono text-subtext uppercase">Total ROI</div>
                                <div class="text-xl font-bold font-display text-white group-hover:text-lime group-[.is-active]:text-lime transition-colors">+420%</div>
                             </div>
                             
                             <svg class="w-full h-3/4 overflow-visible relative z-10" viewBox="0 0 200 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stop-color="#CCFF00" stop-opacity="0.3"/>
                                        <stop offset="100%" stop-color="#CCFF00" stop-opacity="0"/>
                                    </linearGradient>
                                </defs>
                                <polygon points="0,100 {generateChartPath(project.id).replace('M','').split(' ').join(',')} 200,100" 
                                         fill="url(#chartGradient)" 
                                         class="opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-700" />
                                <path d="{generateChartPath(project.id)}" fill="none" stroke="#333" stroke-width="2" />
                                <path d="{generateChartPath(project.id)}" fill="none" stroke="#CCFF00" stroke-width="2" 
                                      stroke-dasharray="300" stroke-dashoffset="300" 
                                      class="transition-all duration-1000 ease-out group-hover:stroke-dashoffset-0 group-[.is-active]:stroke-dashoffset-0 drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
                                <circle cx="200" cy="15" r="3" fill="#CCFF00" class="opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity delay-500 duration-300 animate-pulse" />
                             </svg>
                             <div class="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] group-[.is-active]:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-30 mix-blend-overlay"></div>
                        </div>
                    {/if}

                  </div>

                  <div class="absolute top-[10%] left-[5%] w-[90%] h-[90%] bg-black/60 blur-xl rounded-full 
                              layer-shadow opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-700"></div>

                </div>

                <div class="absolute bottom-6 right-6 translate-y-[200%] group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-transform duration-500 delay-100 z-50">
                    <div class="w-12 h-12 bg-lime text-void flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.5)] border border-white/20 backdrop-blur-md rounded-sm hover:scale-110 transition-transform cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </div>
                </div>
            </div>

        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .perspective-1000 {
    perspective: 1500px;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }

  /* KONTENER 3D */
  .browser-deck {
    transform: rotateX(45deg) rotateZ(-10deg) rotateY(10deg) scale(0.9);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 30px 60px rgba(0,0,0,0.3);
  }
  .group:hover .browser-deck,
  .group.is-active .browser-deck {
    transform: rotateX(30deg) rotateZ(-5deg) rotateY(5deg) scale(1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 50px 100px rgba(0,0,0,0.5);
  }
  
  /* WARSTWY */
  .layer-base {
    transform: translateZ(0);
  }
  .group:hover .layer-base,
  .group.is-active .layer-base {
    transform: translateZ(-40px);
  }

  .layer-screen {
    transform: translateZ(0);
  }
  .group:hover .layer-screen,
  .group.is-active .layer-screen {
    transform: translateZ(30px);
  }

  .layer-shadow {
    transform: translateZ(-10px);
  }

  /* GRIDS */
  .bg-grid-sm {
    background-size: 4px 4px;
  }
  .bg-grid-lg {
    background-size: 40px 40px;
  }
  .bg-scanlines {
    background-size: 100% 2px, 3px 100%;
    background-image: linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.1) 50%), linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03));
  }
</style>