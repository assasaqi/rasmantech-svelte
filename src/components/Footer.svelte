<script>
  import { personalData } from '../data';

  const currentYear = new Date().getFullYear();
</script>

<footer class="py-8 px-6 bg-natural-100/60 dark:bg-natural-950 border-t border-natural-200/60 dark:border-natural-800/60 text-natural-600 dark:text-natural-400 text-sm transition-colors duration-300">
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
    <p class="font-medium text-xs sm:text-sm">
      &copy; {currentYear}{' '}
      <span class="text-natural-900 dark:text-natural-100 font-bold">
        {personalData?.brandName || "RASMANTECH"}
      </span>{' '}
      ({' '}
      <a
        href="https://{personalData?.domain || 'rasmantech.web.id'}"
        target="_blank"
        rel="noreferrer"
        class="text-accent dark:text-emerald-400 hover:underline"
      >
        {personalData?.domain || "rasmantech.web.id"}
      </a>{' '}
      ). All rights reserved.
    </p>
    <p class="text-xs text-natural-500 dark:text-natural-400">
      Dikembangkan oleh{' '}
      <span class="text-accent dark:text-emerald-400 font-semibold">
        {personalData?.name || "Rasman Juliadi"}
      </span>.
    </p>
  </div>
</footer>
