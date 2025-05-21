document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.getElementById('scroll-indicator');
    const yellowLight = document.getElementById('yellow-light');
    const yellowWrapper = document.getElementById('yellow-light-wrapper');
    const heroSection = document.getElementById('hero');
  
    // 1. Initially hide scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    }
  
    // 2. Handle yellow bulb glow and background transition
    if (yellowLight && heroSection && yellowWrapper) {
      yellowLight.addEventListener('ready', () => {
        yellowLight.setLoop(false);
      });
  
      const glowDuration = 5200; // ms — match Lottie length
  
      setTimeout(() => {
        // Change background
        heroSection.style.transition = 'background-color 1s ease';
        heroSection.style.backgroundColor = '#f9e5ad';
  
        // Fade out bulb
        yellowWrapper.style.transition = 'opacity 0.8s ease';
        yellowWrapper.style.opacity = '0';
  
        setTimeout(() => {
          yellowWrapper.style.display = 'none';
  
          // Reveal scroll indicator
          if (scrollIndicator) {
            scrollIndicator.style.transition = 'opacity 0.8s ease';
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
          }
        }, 800);
      }, glowDuration);
    }
  
    // 3. Scroll indicator hides when user scrolls
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator?.classList.add('opacity-0', 'pointer-events-none');
      } else {
        scrollIndicator?.classList.remove('opacity-0', 'pointer-events-none');
      }
    });
  });
  