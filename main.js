document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.getElementById('scroll-indicator');

  // Hide scroll initially
  if (scrollIndicator) {
    scrollIndicator.style.opacity = '0';
    scrollIndicator.style.pointerEvents = 'none';
  }

  // Show scroll after hero animation finishes (e.g., 1.8s delay)
  setTimeout(() => {
    if (scrollIndicator) {
      scrollIndicator.style.transition = 'opacity 0.8s ease';
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  }, 1800); // match hero fade-in timing

  // Hide scroll indicator when user scrolls down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollIndicator?.classList.add('opacity-0', 'pointer-events-none');
    } else {
      scrollIndicator?.classList.remove('opacity-0', 'pointer-events-none');
    }
  });

  // Bring in sticky header on scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('sticky-header');
    if (!header) return;

    if (window.scrollY > window.innerHeight * 0.8) {
      header.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      header.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
    } else {
      header.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      header.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
    }
  });

  
});
