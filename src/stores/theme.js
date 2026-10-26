import { writable } from 'svelte/store';

// Cek preferensi tema awal dari localStorage atau sistem pengguna
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

// State writable tema (true = dark, false = light)
export const isDark = writable(getInitialTheme());

// Sinkronisasi perubahan tema ke class 'dark' pada HTML & localStorage
if (typeof window !== 'undefined') {
  isDark.subscribe((value) => {
    if (value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Fungsi toggle mode tema
export const toggleTheme = () => {
  isDark.update((prev) => !prev);
};
