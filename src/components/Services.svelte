<script>
  import { onMount, onDestroy } from 'svelte';
  import { Code, Server, Layout, Video, Cpu, Wrench, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { servicesData } from '../data';

  // Import Swiper Core & Modul
  import Swiper from 'swiper';
  import { Navigation, Pagination, Autoplay } from 'swiper/modules';

  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  // Mapping Icon lengkap sesuai data di servicesData.js
  const iconMap = {
    Code,
    Server,
    Layout,
    Video,
    Cpu
  };

  let swiperContainer;
  let swiperInstance;

  onMount(() => {
    swiperInstance = new Swiper(swiperContainer, {
      modules: [Navigation, Pagination, Autoplay],
      spaceBetween: 16,
      slidesPerView: 1,
      navigation: {
        prevEl: '#services-prev',
        nextEl: '#services-next',
      },
      pagination: { clickable: true, dynamicBullets: true },
      autoplay: { delay: 5000, disableOnInteraction: false },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
      }
    });
  });

  onDestroy(() => {
    if (swiperInstance) {
      swiperInstance.destroy();
    }
  });
</script>

<section
  id="services"
  class="scroll-mt-16 sm:scroll-mt-24 pt-6 pb-10 sm:pt-12 sm:pb-16 px-4 sm:px-6 bg-natural-50/50 dark:bg-natural-950/50 text-natural-900 dark:text-natural-100 transition-colors duration-300"
>
  <div class="max-w-6xl mx-auto relative">

    <!-- Header Section Compact -->
    <div class="text-center mb-4 sm:mb-6">
      <h2 class="text-xl sm:text-3xl font-bold tracking-tight text-natural-900 dark:text-natural-50">
        Layanan Saya
      </h2>
      <p class="text-natural-600 dark:text-natural-400 mt-1 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
        Layanan dan solusi digital yang dapat saya berikan untuk mendukung keberhasilan proyek Anda.
      </p>
    </div>

    <!-- Tombol Navigasi Slider Kustom Compact -->
    <div class="flex justify-end gap-1.5 mb-2">
      <button
        id="services-prev"
        class="p-1.5 rounded-lg bg-white/80 dark:bg-natural-900/80 border border-natural-200 dark:border-natural-800 text-natural-700 dark:text-natural-300 hover:text-accent dark:hover:text-emerald-400 hover:border-accent/40 shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous Slide"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button
        id="services-next"
        class="p-1.5 rounded-lg bg-white/80 dark:bg-natural-900/80 border border-natural-200 dark:border-natural-800 text-natural-700 dark:text-natural-300 hover:text-accent dark:hover:text-emerald-400 hover:border-accent/40 shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Next Slide"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>

    <!-- Swiper Container Native -->
    <div bind:this={swiperContainer} class="swiper pb-10 !px-1">
      <div class="swiper-wrapper items-stretch">
        {#each servicesData as service (service.id)}
          {@const IconComponent = iconMap[service.icon] || Code}
          <div class="swiper-slide !h-auto flex">
            <div class="glass-card p-4 sm:p-5 group flex flex-col justify-between hover:border-accent/50 transition-all duration-300 w-full h-full min-h-full">
              <div>
                <div class="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center text-accent dark:text-emerald-400 mb-3 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <svelte:component this={IconComponent} class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 class="text-base sm:text-lg font-bold text-natural-900 dark:text-natural-100 mb-1.5 group-hover:text-accent transition-colors duration-200">
                  {service.title}
                </h3>
                <p class="text-natural-600 dark:text-natural-400 text-xs leading-relaxed mb-3">
                  {service.description}
                </p>
              </div>

              <!-- Sub-details/Fitur -->
              {#if service.details && service.details.length > 0}
                <ul class="space-y-1.5 pt-3 border-t border-natural-200/60 dark:border-natural-800/60 mt-auto">
                  {#each service.details as detail}
                    <li class="text-[11px] text-natural-500 dark:text-natural-400 flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent dark:bg-emerald-400 shrink-0"></span>
                      <span>{detail}</span>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <div class="swiper-pagination"></div>
    </div>

  </div>
</section>
