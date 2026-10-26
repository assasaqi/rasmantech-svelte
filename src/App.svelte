<script>
  import SEO from './components/SEO.svelte';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Services from './components/Services.svelte';
  import Portfolio from './components/Portfolio.svelte';
  import Contact from './components/Contact.svelte';
  import Footer from './components/Footer.svelte';
</script>

<div class="bg-natural-50 dark:bg-natural-950 text-natural-900 dark:text-natural-100 min-h-screen transition-colors duration-300">
  <!-- Konfigurasi Meta SEO & OG Tags -->
  <SEO
    title="RASMANTECH — Rasman Juliadi | Full-Stack Developer"
    description="Portofolio resmi Rasman Juliadi (RASMANTECH). Pengembang web & mobile berbasis Svelte, Tailwind CSS, Node.js, dan PostgreSQL."
  />

  <Navbar />
  <main>
    <Hero />
    <About />
    <Services />
    <Portfolio />
    <Contact />
  </main>
  <Footer />
</div>
