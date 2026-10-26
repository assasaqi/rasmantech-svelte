<script>
  import { onMount } from 'svelte';
  import { User, CheckCircle2, Sparkles, Terminal, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { aboutContent, skillsData } from '../data';

  // 1. Impor otomatis semua gambar dari folder src/assets/images/
  const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });

  // Ambil gambar spesifik image_1 dari folder assets/images
  const bgImageEntry = Object.entries(imageModules).find(([path]) => path.includes('image_1'));
  const bgImage = bgImageEntry ? (bgImageEntry[1].default || bgImageEntry[1]) : null;

  const profileImages = Object.values(imageModules).map((mod) => mod.default || mod);

  // Reference ke elemen DOM
  let skillsRef;
  let highlightsRef;

  // State navigasi tombol Skills
  let canScrollLeftSkills = false;
  let canScrollRightSkills = true;

  // State navigasi tombol Highlights
  let canScrollLeftHighlights = false;
  let canScrollRightHighlights = true;

  // State melacak indeks foto profil
  let currentImageIndex = 0;

  // Cek posisi scroll Kemampuan Teknis
  function checkSkillsScroll() {
    if (skillsRef) {
      const { scrollLeft, scrollWidth, clientWidth } = skillsRef;
      canScrollLeftSkills = scrollLeft > 0;
      canScrollRightSkills = scrollLeft + clientWidth < scrollWidth - 1;
    }
  }

  // Cek posisi scroll Highlights Ringkasan Diri
  function checkHighlightsScroll() {
    if (highlightsRef) {
      const { scrollLeft, scrollWidth, clientWidth } = highlightsRef;
      canScrollLeftHighlights = scrollLeft > 0;
      canScrollRightHighlights = scrollLeft + clientWidth < scrollWidth - 1;
    }
  }

  // Fungsi navigasi manual scroll
  function handleScroll(node, direction) {
    if (node) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      node.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  onMount(() => {
    // 1. Auto-slide Foto Profil (Tiap 5 detik)
    let profileInterval;
    if (profileImages.length > 1) {
      profileInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % profileImages.length;
      }, 5000);
    }

    // 2. Auto-slide Highlights Ringkasan Diri (Tiap 3 detik di mobile)
    const highlightsInterval = setInterval(() => {
      if (highlightsRef && window.innerWidth < 640) {
        const { scrollLeft, scrollWidth, clientWidth } = highlightsRef;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 5) {
          highlightsRef.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          highlightsRef.scrollBy({ left: 260, behavior: 'smooth' });
        }
      }
    }, 3000);

    // 3. Auto-slide Kemampuan Teknis (Tiap 3 detik)
    const skillsInterval = setInterval(() => {
      if (skillsRef) {
        const { scrollLeft, scrollWidth, clientWidth } = skillsRef;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 5) {
          skillsRef.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          skillsRef.scrollBy({ left: 260, behavior: 'smooth' });
        }
      }
    }, 3000);

    checkSkillsScroll();
    checkHighlightsScroll();

    const handleResize = () => {
      checkSkillsScroll();
      checkHighlightsScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (profileInterval) clearInterval(profileInterval);
      clearInterval(highlightsInterval);
      clearInterval(skillsInterval);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<section
  id="about"
  class="scroll-mt-16 sm:scroll-mt-24 pt-8 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 bg-natural-50/50 dark:bg-natural-950/50 relative text-natural-900 dark:text-natural-100 transition-colors duration-300 overflow-hidden"
>
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- Header Compact -->
    <div class="text-center">

      <h2 class="text-2xl sm:text-4xl font-bold text-natural-900 dark:text-natural-50 tracking-tight">
        Tentang Saya
      </h2>
    </div>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">

      <!-- Card 1: Full Card Slideshow Photo (5 cols) -->
      <div class="md:col-span-5 lg:col-span-5 glass-card min-h-[340px] sm:min-h-[400px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group shadow-soft">

        <!-- Rendisi Foto Bergantian (Auto-Slide Fade 5s) -->
        {#each profileImages as imgSrc, index}
          <img
            src={imgSrc}
            alt={`Profile Slide ${index + 1}`}
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 {index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}"
          />
        {/each}

        <!-- Overlays -->
        <div class="absolute inset-0 bg-gradient-to-t from-natural-950/90 via-natural-950/30 to-natural-950/20 pointer-events-none z-10"></div>

        <!-- Badge Status -->
        <div class="relative z-20 self-start">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-medium border border-emerald-500/30 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Open to Opportunities
          </div>
        </div>

        <!-- Judul & Indikator Slide -->
        <div class="relative z-20 text-left space-y-2">
          <h3 class="text-base sm:text-lg font-bold text-white tracking-wide drop-shadow-md">
            {aboutContent.title}
          </h3>

          {#if profileImages.length > 1}
            <div class="flex items-center gap-1.5 pt-1">
              {#each profileImages as _, idx}
                <button
                  on:click={() => (currentImageIndex = idx)}
                  class="h-1.5 rounded-full transition-all duration-300 {idx === currentImageIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'}"
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <!-- Card 2: Ringkasan Bio & Highlights (Dengan Latar Belakang Blur) -->
      <div class="md:col-span-7 lg:col-span-7 glass-card p-5 sm:p-6 flex flex-col justify-between shadow-soft space-y-5 relative overflow-hidden">

        <!-- Latar Belakang Gambar Blur untuk Card Ringkasan Diri -->
        {#if bgImage}
          <img
            src={bgImage}
            alt="Background Ringkasan Diri"
            class="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-30 pointer-events-none"
          />
          <div class="absolute inset-0 bg-natural-950/50 dark:bg-natural-950/60 pointer-events-none"></div>
        {/if}

        <div class="space-y-3.5 relative z-10">
          <div class="flex items-center justify-between border-b border-natural-200/60 dark:border-natural-800/60 pb-3">
            <div class="flex items-center gap-2">
              <Sparkles class="w-5 h-5 text-accent dark:text-emerald-400" />
              <h3 class="text-base sm:text-lg font-bold text-natural-900 dark:text-natural-100">
                Ringkasan Diri
              </h3>
            </div>

            <!-- Tombol Slide Highlights (Tampil khusus di layar mobile) -->
            <div class="flex sm:hidden items-center gap-1.5">
              <button
                on:click={() => handleScroll(highlightsRef, 'left')}
                disabled={!canScrollLeftHighlights}
                class="p-1.5 rounded-lg transition-all {canScrollLeftHighlights ? 'bg-natural-100/80 dark:bg-natural-800/80 hover:bg-accent/20 dark:hover:bg-emerald-400/20 text-natural-700 dark:text-natural-300 cursor-pointer' : 'bg-natural-100/40 dark:bg-natural-800/40 text-natural-400 dark:text-natural-600 opacity-40 cursor-not-allowed'}"
                aria-label="Scroll Left Highlights"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button
                on:click={() => handleScroll(highlightsRef, 'right')}
                disabled={!canScrollRightHighlights}
                class="p-1.5 rounded-lg transition-all {canScrollRightHighlights ? 'bg-natural-100/80 dark:bg-natural-800/80 hover:bg-accent/20 dark:hover:bg-emerald-400/20 text-natural-700 dark:text-natural-300 cursor-pointer' : 'bg-natural-100/40 dark:bg-natural-800/40 text-natural-400 dark:text-natural-600 opacity-40 cursor-not-allowed'}"
                aria-label="Scroll Right Highlights"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-natural-600 dark:text-natural-300 leading-relaxed drop-shadow-sm">
            {aboutContent.description}
          </p>
        </div>

        <!-- List Highlights dengan Auto-scroll 3s di Mobile -->
        <div
          bind:this={highlightsRef}
          on:scroll={checkHighlightsScroll}
          class="flex sm:grid sm:grid-cols-2 gap-2.5 pt-2 overflow-x-auto snap-x snap-mandatory pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10"
        >
          {#each aboutContent.highlights as item, idx}
            <div
              class="w-[82vw] max-w-[280px] sm:w-auto shrink-0 snap-start flex items-center gap-2.5 p-3 sm:p-2.5 rounded-xl bg-natural-100/70 dark:bg-natural-900/60 backdrop-blur-md border border-natural-200/50 dark:border-natural-800/50 text-xs sm:text-sm shadow-sm"
            >
              <CheckCircle2 class="w-4 h-4 text-accent dark:text-emerald-400 shrink-0" />
              <span class="text-natural-800 dark:text-natural-100 font-medium leading-snug">{item}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Card 3: Kemampuan Teknis & Tooling (12 cols) -->
      <div class="md:col-span-12 glass-card p-5 sm:p-6 shadow-soft space-y-4">

        <!-- Header Card + Tombol Navigasi Slider -->
        <div class="flex items-center justify-between border-b border-natural-200/60 dark:border-natural-800/60 pb-3">
          <div class="flex items-center gap-2">
            <Terminal class="w-5 h-5 text-accent dark:text-emerald-400" />
            <h3 class="text-base sm:text-lg font-bold text-natural-900 dark:text-natural-100">
              Kemampuan Teknis & Tooling
            </h3>
          </div>

          <!-- Tombol Slide Kiri & Kanan -->
          <div class="flex items-center gap-1.5">
            <button
              on:click={() => handleScroll(skillsRef, 'left')}
              disabled={!canScrollLeftSkills}
              class="p-1.5 rounded-lg transition-all {canScrollLeftSkills ? 'bg-natural-100 dark:bg-natural-800 hover:bg-accent/20 dark:hover:bg-emerald-400/20 text-natural-700 dark:text-natural-300 cursor-pointer' : 'bg-natural-100/40 dark:bg-natural-800/40 text-natural-400 dark:text-natural-600 opacity-40 cursor-not-allowed'}"
              aria-label="Scroll Left Skills"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              on:click={() => handleScroll(skillsRef, 'right')}
              disabled={!canScrollRightSkills}
              class="p-1.5 rounded-lg transition-all {canScrollRightSkills ? 'bg-natural-100 dark:bg-natural-800 hover:bg-accent/20 dark:hover:bg-emerald-400/20 text-natural-700 dark:text-natural-300 cursor-pointer' : 'bg-natural-100/40 dark:bg-natural-800/40 text-natural-400 dark:text-natural-600 opacity-40 cursor-not-allowed'}"
              aria-label="Scroll Right Skills"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Slider Horizontal tanpa Scrollbar Bawaan -->
        <div
          bind:this={skillsRef}
          on:scroll={checkSkillsScroll}
          class="flex gap-3.5 overflow-x-auto snap-x snap-mandatory pt-1 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {#each skillsData as skill}
            <div
              class="w-[220px] sm:w-[260px] shrink-0 snap-start p-3.5 rounded-xl bg-natural-100/50 dark:bg-natural-900/30 border border-natural-200/40 dark:border-natural-800/40 space-y-2"
            >
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-natural-800 dark:text-natural-200 truncate">{skill.name}</span>
                <span class="text-accent dark:text-emerald-400 font-mono ml-2">{skill.level}%</span>
              </div>
              <div class="w-full bg-natural-200 dark:bg-natural-800 h-1.5 rounded-full overflow-hidden">
                <div
                  class="bg-accent dark:bg-emerald-400 h-full rounded-full transition-all duration-700"
                  style="width: {skill.level}%;"
                ></div>
              </div>
            </div>
          {/each}
        </div>

      </div>

    </div>

  </div>
</section>
