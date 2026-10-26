<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { X, ExternalLink, CheckCircle2, Layers } from 'lucide-svelte';

  export let project = null;
  export let onClose = undefined;

  const dispatch = createEventDispatcher();

  function handleClose() {
    if (onClose) {
      onClose();
    }
    dispatch('close');
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  onMount(() => {
    // Lock scroll pada body saat modal terbuka
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    // Restore scroll pada body saat modal ditutup
    document.body.style.overflow = 'unset';
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if project}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-natural-950/70 backdrop-blur-sm animate-fade-in">
    <!-- Background overlay click to close -->
    <div
      class="fixed inset-0"
      on:click={handleClose}
      aria-hidden="true"
    ></div>

    <!-- Modal Card Compact -->
    <div class="relative w-full max-w-lg sm:max-w-xl bg-white dark:bg-natural-900 border border-natural-200 dark:border-natural-800 rounded-2xl shadow-2xl p-4 sm:p-6 z-10 max-h-[85vh] overflow-y-auto my-auto transition-all">

      <!-- Close Button Compact -->
      <button
        on:click={handleClose}
        class="absolute top-3 right-3 p-1.5 rounded-lg bg-natural-100 dark:bg-natural-800 text-natural-600 dark:text-natural-400 hover:text-accent dark:hover:text-emerald-400 transition-colors"
        aria-label="Tutup modal"
      >
        <X class="w-4 h-4" />
      </button>

      <!-- Modal Header Compact -->
      <div class="mb-4 pr-6">
        <span class="text-[10px] sm:text-xs font-semibold text-accent dark:text-emerald-400 bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
          {project.category}
        </span>
        <h3 class="text-lg sm:text-2xl font-bold text-natural-900 dark:text-natural-50 leading-snug">
          {project.title}
        </h3>
      </div>

      <!-- Modal Content Compact -->
      <div class="space-y-4 text-xs sm:text-sm text-natural-600 dark:text-natural-300 leading-relaxed">

        <!-- Deskripsi Utama -->
        <div>
          <h4 class="text-[11px] font-semibold uppercase tracking-wider text-natural-800 dark:text-natural-200 mb-1.5 flex items-center gap-1.5">
            <Layers class="w-3.5 h-3.5 text-accent dark:text-emerald-400" />
            Gambaran Proyek
          </h4>
          <p class="bg-natural-50 dark:bg-natural-950/60 p-3 sm:p-4 rounded-xl border border-natural-200/60 dark:border-natural-800/60 text-xs sm:text-sm leading-relaxed">
            {project.fullDescription || project.description}
          </p>
        </div>

        <!-- Fitur Utama Dinamis -->
        {#if project.features && project.features.length > 0}
          <div>
            <h4 class="text-[11px] font-semibold uppercase tracking-wider text-natural-800 dark:text-natural-200 mb-1.5">
              Fitur Utama & Keunggulan
            </h4>
            <div class="grid sm:grid-cols-2 gap-2">
              {#each project.features as feature, idx}
                <div class="flex items-center gap-2 bg-white/50 dark:bg-natural-800/40 p-2 sm:p-2.5 rounded-lg border border-natural-200/50 dark:border-natural-800/50 text-xs">
                  <CheckCircle2 class="w-3.5 h-3.5 text-accent dark:text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Tech Stack -->
        <div>
          <h4 class="text-[11px] font-semibold uppercase tracking-wider text-natural-800 dark:text-natural-200 mb-1.5">
            Teknologi Yang Digunakan
          </h4>
          <div class="flex flex-wrap gap-1.5">
            {#each project.tech as t}
              <span
                class="text-[10px] sm:text-xs bg-accent/10 text-accent dark:text-emerald-400 border border-accent/20 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md font-mono"
              >
                {t}
              </span>
            {/each}
          </div>
        </div>

      </div>

      <!-- Modal Footer / Action Button Compact -->
      <div class="mt-5 pt-3 border-t border-natural-200/60 dark:border-natural-800/60 flex items-center justify-between gap-2">
        <button
          on:click={handleClose}
          class="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-medium border border-natural-200 dark:border-natural-800 hover:bg-natural-100 dark:hover:bg-natural-800 text-natural-700 dark:text-natural-300 transition-colors"
        >
          Tutup
        </button>

        {#if project.link && project.link !== '#'}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-dark text-white font-semibold px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg text-xs transition-all duration-200 shadow-md shadow-accent/20 active:scale-95"
          >
            <span>Kunjungi Website</span>
            <ExternalLink class="w-3.5 h-3.5" />
          </a>
        {/if}
      </div>

    </div>
  </div>
{/if}
