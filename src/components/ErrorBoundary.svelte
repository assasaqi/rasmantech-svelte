<script>
  let hasError = false;
  let error = null;

  function handleError(err) {
    console.error("ErrorBoundary menangkap eror:", err);
    hasError = true;
    error = err;
  }

  function reloadPage() {
    window.location.reload();
  }
</script>

{#if hasError}
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
    <h2 class="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Terjadi Kesalahan Aplikasi</h2>
    <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 max-w-md">
      {error ? error.toString() : 'Terjadi kesalahan tidak terduga.'}
    </p>
    <button
      on:click={reloadPage}
      class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
    >
      Muat Ulang Halaman
    </button>
  </div>
{:else}
  <svelte:boundary onerror={handleError}>
    <slot />
  </svelte:boundary>
{/if}
