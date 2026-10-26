<script>
  import { Mail, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-svelte';
  import { personalData } from '../data';

  let formData = { name: '', email: '', message: '' };
  let submitted = false;

  function handleSubmit() {
    submitted = true;
    setTimeout(() => {
      submitted = false;
    }, 4000);
    formData = { name: '', email: '', message: '' };
  }
</script>

<section
  id="contact"
  class="scroll-mt-16 sm:scroll-mt-24 pt-6 pb-10 sm:pt-12 sm:pb-16 px-4 sm:px-6 bg-natural-50/50 dark:bg-natural-950/50 text-natural-900 dark:text-natural-100 transition-colors duration-300"
>
  <div class="max-w-6xl mx-auto">

    <!-- Header Section Compact -->
    <div class="text-center mb-6 sm:mb-8">
      <h2 class="text-xl sm:text-3xl font-bold tracking-tight text-natural-900 dark:text-natural-50">
        Hubungi Saya
      </h2>
      <p class="text-natural-600 dark:text-natural-400 mt-1 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
        Punya ide proyek menarik atau ingin berdiskusi seputar pembuatan aplikasi web, desain, maupun video? Silakan kirim pesan.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6 sm:gap-10 items-start">

      <!-- Left Side: Contact Information -->
      <div class="space-y-4">
        <div class="glass-card p-4 sm:p-5 flex items-start gap-3.5">
          <div class="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent dark:text-emerald-400 shrink-0">
            <Mail class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-natural-900 dark:text-natural-100">Email Direct</h3>
            <p class="text-xs text-natural-600 dark:text-natural-400 mt-0.5">Kirim email kapan saja, saya akan merespons secepat mungkin.</p>
            <a href="mailto:{personalData?.email || 'rasmanassaaqi@gmail.com'}" class="text-xs font-semibold text-accent dark:text-emerald-400 hover:underline mt-1.5 block break-all">
              {personalData?.email || "rasmanassaaqi@gmail.com"}
            </a>
          </div>
        </div>

        <div class="glass-card p-4 sm:p-5 flex items-start gap-3.5">
          <div class="w-9 h-9 sm:w-10 sm:h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center text-accent dark:text-emerald-400 shrink-0">
            <MapPin class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="text-sm font-bold text-natural-900 dark:text-natural-100">Lokasi</h3>
            <p class="text-xs text-natural-600 dark:text-natural-400 mt-0.5">{personalData?.location || "Lombok, Nusa Tenggara Barat, Indonesia"}</p>
            <span class="text-[11px] font-medium text-natural-500 dark:text-natural-400 mt-1.5 block">{personalData?.availability || "Tersedia untuk kerja Remote & Freelance"}</span>
          </div>
        </div>
      </div>

      <!-- Right Side: Contact Form Compact -->
      <div class="glass-card p-4 sm:p-6 shadow-soft">
        <form on:submit|preventDefault={handleSubmit} class="space-y-3.5">
          <div>
            <label for="contact-name" class="block text-[11px] font-semibold text-natural-700 dark:text-natural-300 uppercase tracking-wider mb-1">
              Nama Lengkap
            </label>
            <input
              id="contact-name"
              type="text"
              required
              bind:value={formData.name}
              placeholder="Masukkan nama Anda"
              class="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-natural-900/80 border border-natural-200 dark:border-natural-800 text-natural-900 dark:text-natural-100 focus:outline-none focus:border-accent dark:focus:border-emerald-400 transition-colors text-xs sm:text-sm"
            />
          </div>

          <div>
            <label for="contact-email" class="block text-[11px] font-semibold text-natural-700 dark:text-natural-300 uppercase tracking-wider mb-1">
              Alamat Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              bind:value={formData.email}
              placeholder="nama@email.com"
              class="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-natural-900/80 border border-natural-200 dark:border-natural-800 text-natural-900 dark:text-natural-100 focus:outline-none focus:border-accent dark:focus:border-emerald-400 transition-colors text-xs sm:text-sm"
            />
          </div>

          <div>
            <label for="contact-message" class="block text-[11px] font-semibold text-natural-700 dark:text-natural-300 uppercase tracking-wider mb-1">
              Pesan Anda
            </label>
            <textarea
              id="contact-message"
              rows="3"
              required
              bind:value={formData.message}
              placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..."
              class="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-natural-900/80 border border-natural-200 dark:border-natural-800 text-natural-900 dark:text-natural-100 focus:outline-none focus:border-accent dark:focus:border-emerald-400 transition-colors text-xs sm:text-sm resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-accent/20 active:scale-95 text-xs sm:text-sm"
          >
            {#if submitted}
              <CheckCircle class="w-4 h-4 text-white" />
              <span>Pesan Terkirim!</span>
            {:else}
              <span>Kirim Pesan</span>
              <Send class="w-4 h-4" />
            {/if}
          </button>
        </form>
      </div>

    </div>
  </div>
</section>
