/**
 * LUXURY CHRISTIAN RECEPTION INVITATION - SCRIPT
 * Chi. Sow. Sravani (Vissakoti Family) & Chi. John Wesley
 * November 26, 2026 | 10:00 AM Onwards
 * Feature: Continuous Vertical Center Stream (Zero Cards, Blended Typography, Scroll Animations)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bgVideo = document.getElementById('bgVideo');
  const bgAudio = document.getElementById('bgAudio');
  const doorOpeningScreen = document.getElementById('doorOpeningScreen');
  const tapToOpenBtn = document.getElementById('tapToOpenBtn');
  const skipVideoBtn = document.getElementById('skipVideoBtn');
  const replayVideoBtn = document.getElementById('replayVideoBtn');
  const toggleMusicBtn = document.getElementById('toggleMusicBtn');
  const togglePetalsBtn = document.getElementById('togglePetalsBtn');
  const petalsCanvas = document.getElementById('petalsCanvas');
  const rsvpForm = document.getElementById('rsvpForm');
  const wishesList = document.getElementById('wishesList');
  const rsvpNotification = document.getElementById('rsvpNotification');

  const streamScrollContainer = document.getElementById('streamScrollContainer');
  const scrollPrompt = document.getElementById('scrollPrompt');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  let isDetailsRevealed = false;
  let isVideoPlaying = false;
  let isMusicPlaying = false;
  let fallbackTimer = null;

  // Set initial state
  document.body.className = 'state-initial';

  // ==========================================
  // 1. VIDEO REVEAL & FINAL FRAME BACKGROUND
  // ==========================================

  if (bgVideo) {
    bgVideo.preload = 'auto';
    bgVideo.muted = true;
    bgVideo.currentTime = 0.01;
  }

  function startVideoIntro() {
    if (isVideoPlaying || isDetailsRevealed) return;
    isVideoPlaying = true;

    // Switch state to playing
    document.body.className = 'state-playing';

    // Start background music
    startReceptionAmbiance();

    if (bgVideo) {
      bgVideo.currentTime = 0;
      const playPromise = bgVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Video play caught:', err);
          revealWebsiteDetails();
        });
      }

      // Check when video reaches the final frame
      bgVideo.ontimeupdate = () => {
        if (!isDetailsRevealed && bgVideo.duration) {
          if (bgVideo.currentTime >= (bgVideo.duration - 0.18)) {
            revealWebsiteDetails();
          }
        }
      };

      bgVideo.onended = () => {
        revealWebsiteDetails();
      };

      const introDurationMs = (bgVideo.duration && !isNaN(bgVideo.duration)) ? (bgVideo.duration * 1000 + 400) : 15000;
      fallbackTimer = setTimeout(() => {
        if (!isDetailsRevealed) {
          revealWebsiteDetails();
        }
      }, introDurationMs);
    } else {
      revealWebsiteDetails();
    }
  }

  function revealWebsiteDetails() {
    if (isDetailsRevealed) return;
    isDetailsRevealed = true;
    isVideoPlaying = false;

    if (fallbackTimer) clearTimeout(fallbackTimer);

    if (bgVideo) {
      bgVideo.pause();
      if (bgVideo.duration && !isNaN(bgVideo.duration)) {
        bgVideo.currentTime = Math.max(0, bgVideo.duration - 0.05);
      }
    }

    // Reveal Center Stage stream directly on the video
    document.body.className = 'state-revealed';

    // Trigger initial section animations
    initScrollAnimations();

    // Trigger golden celebration confetti
    triggerConfetti(65);

    // Initialize interactive heart scratch card
    setTimeout(() => {
      initHeartScratchCard();
    }, 150);

    // Start continuous falling lavender petals
    startLavenderPetals();
  }

  if (tapToOpenBtn) {
    tapToOpenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startVideoIntro();
    });
  }

  if (doorOpeningScreen) {
    doorOpeningScreen.addEventListener('click', () => {
      startVideoIntro();
    });
  }

  if (skipVideoBtn) {
    skipVideoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startReceptionAmbiance();
      revealWebsiteDetails();
    });
  }

  if (replayVideoBtn) {
    replayVideoBtn.addEventListener('click', () => {
      isDetailsRevealed = false;
      isVideoPlaying = true;
      document.body.className = 'state-playing';

      if (streamScrollContainer) {
        streamScrollContainer.scrollTop = 0;
      }

      if (petalsCanvas) {
        petalsCanvas.style.opacity = '0';
      }

      if (bgVideo) {
        bgVideo.currentTime = 0;
        bgVideo.play().catch(() => {});
      }

      if (fallbackTimer) clearTimeout(fallbackTimer);
      const replayDurationMs = (bgVideo && bgVideo.duration && !isNaN(bgVideo.duration)) ? (bgVideo.duration * 1000 + 400) : 15000;
      fallbackTimer = setTimeout(() => {
        if (!isDetailsRevealed) {
          revealWebsiteDetails();
        }
      }, replayDurationMs);
    });
  }

  // ==========================================
  // 2. SCROLL REVEAL ANIMATIONS (Smooth Entrance)
  // ==========================================

  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // First page section is instantly animated by CSS keyframes
    const firstSection = document.getElementById('sectionFirstPage') || document.getElementById('sectionInvite');
    if (firstSection) {
      firstSection.classList.add('is-visible');
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, {
        root: streamScrollContainer || null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback: reveal all
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  }

  // ==========================================
  // 3. QUICK NAVIGATION & SCROLL TRACKING
  // ==========================================

  // Track scroll position to fade prompt
  if (streamScrollContainer) {
    streamScrollContainer.addEventListener('scroll', () => {
      const scrollPos = streamScrollContainer.scrollTop;

      // Fade out the scroll prompt when user has scrolled down
      if (scrollPrompt) {
        if (scrollPos > 60) {
          scrollPrompt.style.opacity = '0';
          scrollPrompt.style.pointerEvents = 'none';
        } else {
          scrollPrompt.style.opacity = '0.9';
          scrollPrompt.style.pointerEvents = 'auto';
        }
      }
    }, { passive: true });
  }

  // Scroll down prompt click (scrolls smoothly from Page 1 to Scripture & Scratch)
  if (scrollPrompt) {
    scrollPrompt.addEventListener('click', () => {
      const targetSec = document.getElementById('sectionCouple') || document.getElementById('sectionCelebration');
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Back to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      if (streamScrollContainer) {
        streamScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // 4. REAL-TIME COUNTDOWN TIMER
  // Target: November 26, 2026, 10:00:00 AM IST (+05:30)
  // ==========================================

  const receptionTargetTime = new Date('2026-11-26T10:00:00+05:30').getTime();

  const daysElem = document.getElementById('days');
  const hoursElem = document.getElementById('hours');
  const minutesElem = document.getElementById('minutes');
  const secondsElem = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = receptionTargetTime - now;

    if (distance <= 0) {
      if (daysElem) daysElem.innerText = '00';
      if (hoursElem) hoursElem.innerText = '00';
      if (minutesElem) minutesElem.innerText = '00';
      if (secondsElem) secondsElem.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysElem) daysElem.innerText = days < 10 ? '0' + days : days;
    if (hoursElem) hoursElem.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesElem) minutesElem.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsElem) secondsElem.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================
  // 5. RSVP & BLESSINGS WALL (LocalStorage)
  // ==========================================

  const initialWishes = [
    {
      name: "Uncle David & Family (Vissakoti)",
      time: "2 days ago",
      message: "May God Almighty shower His richest blessings upon our dear Sravani & John Wesley."
    },
    {
      name: "Pastor Samuel & Grace",
      time: "3 days ago",
      message: "“A cord of three strands is not quickly broken.” Praying for God's eternal peace and joy over your holy union."
    }
  ];

  function getStoredWishes() {
    try {
      const stored = localStorage.getItem('vissakoti_wedding_wishes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return initialWishes;
  }

  function renderWishes() {
    if (!wishesList) return;
    const wishes = getStoredWishes();
    wishesList.innerHTML = '';

    wishes.forEach(wish => {
      const quote = document.createElement('div');
      quote.className = 'wish-floating-quote';
      quote.innerHTML = `
        <div class="wish-author-line">
          <span class="wish-author-name">${escapeHtml(wish.name)}</span>
          <span class="wish-author-time">${escapeHtml(wish.time)}</span>
        </div>
        <div class="wish-quote-body">“${escapeHtml(wish.message)}”</div>
      `;
      wishesList.appendChild(quote);
    });
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName').value.trim();
      const guests = document.getElementById('guestCount').value;
      const attendance = document.querySelector('input[name="attending"]:checked')?.value || 'Yes';
      const message = document.getElementById('guestMessage').value.trim();

      if (!name) return;

      const newWish = {
        name: name + (attendance === 'Yes' ? ` (${guests})` : ' (Sending Prayers)'),
        time: 'Just now',
        message: message || "May God Almighty shower His richest blessings upon Sravani & John Wesley!"
      };

      const wishes = getStoredWishes();
      wishes.unshift(newWish);

      try {
        localStorage.setItem('vissakoti_wedding_wishes', JSON.stringify(wishes));
      } catch (err) {
        console.warn('Could not save to LocalStorage', err);
      }

      renderWishes();

      if (rsvpNotification) {
        rsvpNotification.innerHTML = `✨ Thank you, <strong>${escapeHtml(name)}</strong>! The Vissakoti family cordially thanks you for your prayers and RSVP.`;
        rsvpNotification.style.display = 'block';
      }

      rsvpForm.reset();
      triggerConfetti(65);

      setTimeout(() => {
        if (rsvpNotification) {
          rsvpNotification.style.display = 'none';
        }
      }, 5000);
    });
  }

  renderWishes();

  // ==========================================
  // 6. BACKGROUND MUSIC (audio_bgm.mp3)
  // ==========================================

  function startReceptionAmbiance() {
    if (!bgAudio) return;

    isMusicPlaying = true;
    updateMusicButtonUI();

    bgAudio.volume = 0.75;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isMusicPlaying = true;
        updateMusicButtonUI();
      }).catch(err => {
        console.warn('Audio play prevented until user interaction:', err);
      });
    }
  }

  function toggleMusic() {
    if (!bgAudio) return;

    if (isMusicPlaying) {
      isMusicPlaying = false;
      try {
        bgAudio.pause();
      } catch (e) {
        console.warn('Audio pause error:', e);
      }
    } else {
      isMusicPlaying = true;
      try {
        bgAudio.volume = 0.75;
        bgAudio.play().catch(e => console.warn('Audio play error:', e));
      } catch (e) {
        console.warn('Audio play error:', e);
      }
    }
    updateMusicButtonUI();
  }

  if (bgAudio) {
    bgAudio.addEventListener('ended', () => {
      if (isMusicPlaying) {
        bgAudio.currentTime = 0;
        bgAudio.play().catch(() => {});
      }
    });
  }

  const SVG_MUSIC_ON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
  const SVG_MUSIC_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.73 4.73 1.27-1.27L4.27 3zM14 7h4V3h-6v4.73l2 2V7z"/></svg>';

  function updateMusicButtonUI() {
    if (!toggleMusicBtn) return;
    if (isMusicPlaying) {
      toggleMusicBtn.classList.add('playing');
      toggleMusicBtn.innerHTML = SVG_MUSIC_ON;
      toggleMusicBtn.setAttribute('data-tooltip', 'Pause Reception Music');
    } else {
      toggleMusicBtn.classList.remove('playing');
      toggleMusicBtn.innerHTML = SVG_MUSIC_OFF;
      toggleMusicBtn.setAttribute('data-tooltip', 'Play Reception Music');
    }
  }

  if (toggleMusicBtn) {
    toggleMusicBtn.addEventListener('click', toggleMusic);
  }

  // ==========================================
  // 7. GOLD & LAVENDER CONFETTI
  // ==========================================

  function triggerConfetti(count = 55) {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#cfa24b', '#f5dfa8', '#b88628', '#dfcef0', '#6c477e', '#ffffff'];
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4),
        radius: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.08 + 0.03,
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        opacity: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;

      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.speedY;
        p.x += Math.sin(p.tiltAngle) * 2 + p.speedX;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        if (p.y < canvas.height) {
          activeParticles++;
          ctx.beginPath();
          ctx.lineWidth = p.radius;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.radius / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.radius / 2);
          ctx.stroke();
        }
      });

      if (activeParticles > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    render();
  }

  // ==========================================
  // 7.5 CONTINUOUS FALLING LAVENDER PETALS
  // ==========================================

  let isPetalsEnabled = true;
  let petalsAnimationFrame = null;

  const petalColorPalettes = [
    {
      highlight: 'rgba(255, 245, 255, 0.95)',
      base: 'rgba(224, 185, 245, 0.85)',
      edge: 'rgba(178, 130, 206, 0.75)',
      vein: 'rgba(148, 92, 182, 0.4)'
    },
    {
      highlight: 'rgba(250, 238, 255, 0.95)',
      base: 'rgba(210, 168, 238, 0.85)',
      edge: 'rgba(164, 114, 196, 0.75)',
      vein: 'rgba(135, 82, 172, 0.4)'
    },
    {
      highlight: 'rgba(255, 250, 255, 0.92)',
      base: 'rgba(235, 205, 252, 0.82)',
      edge: 'rgba(195, 152, 222, 0.7)',
      vein: 'rgba(160, 108, 192, 0.35)'
    },
    {
      highlight: 'rgba(244, 228, 255, 0.92)',
      base: 'rgba(195, 150, 226, 0.82)',
      edge: 'rgba(152, 102, 186, 0.72)',
      vein: 'rgba(122, 72, 158, 0.4)'
    }
  ];

  class LavenderPetal {
    constructor(canvasWidth, canvasHeight, isInitial = false) {
      this.reset(canvasWidth, canvasHeight, isInitial);
    }

    reset(canvasWidth, canvasHeight, isInitial = false) {
      this.x = Math.random() * (canvasWidth + 60) - 30;
      this.y = isInitial ? Math.random() * canvasHeight : -25 - Math.random() * 30;
      this.size = Math.random() * 7 + 7; // Small, delicate petals: 7px to 14px
      this.speedY = Math.random() * 0.9 + 0.65; // Slow, graceful descent
      this.swaySpeed = Math.random() * 0.02 + 0.015;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swayRadius = Math.random() * 1.5 + 0.8;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.025;
      this.tiltAngle = Math.random() * Math.PI * 2;
      this.tiltSpeed = Math.random() * 0.03 + 0.015;
      this.color = petalColorPalettes[Math.floor(Math.random() * petalColorPalettes.length)];
      this.opacity = Math.random() * 0.3 + 0.65;
    }

    update(canvasWidth, canvasHeight) {
      this.swayAngle += this.swaySpeed;
      this.tiltAngle += this.tiltSpeed;
      this.rotation += this.rotationSpeed;

      this.y += this.speedY;
      this.x += Math.sin(this.swayAngle) * this.swayRadius + 0.3; // Gentle breeze drift

      this.tilt = Math.cos(this.tiltAngle);

      if (this.y > canvasHeight + 25 || this.x < -40 || this.x > canvasWidth + 40) {
        this.reset(canvasWidth, canvasHeight, false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(this.tilt, 1);

      const w = this.size * 0.55;
      const h = this.size;

      ctx.beginPath();
      ctx.moveTo(0, -h * 0.5);
      ctx.bezierCurveTo(-w, -h * 0.3, -w * 0.9, h * 0.35, 0, h * 0.5);
      ctx.bezierCurveTo(w * 0.9, h * 0.35, w, -h * 0.3, 0, -h * 0.5);
      ctx.closePath();

      const grad = ctx.createRadialGradient(-w * 0.2, -h * 0.25, 0, 0, 0, h * 0.6);
      grad.addColorStop(0, this.color.highlight);
      grad.addColorStop(0.55, this.color.base);
      grad.addColorStop(1, this.color.edge);

      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -h * 0.38);
      ctx.quadraticCurveTo(w * 0.08, 0, 0, h * 0.38);
      ctx.strokeStyle = this.color.vein;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    }
  }

  let lavenderPetalsList = [];

  function initPetalsSimulation() {
    if (!petalsCanvas) return;
    petalsCanvas.width = window.innerWidth;
    petalsCanvas.height = window.innerHeight;

    const petalCount = Math.min(38, Math.max(22, Math.floor(window.innerWidth / 28)));
    lavenderPetalsList = [];
    for (let i = 0; i < petalCount; i++) {
      lavenderPetalsList.push(new LavenderPetal(petalsCanvas.width, petalsCanvas.height, true));
    }
  }

  function startLavenderPetals() {
    if (!petalsCanvas) return;
    if (lavenderPetalsList.length === 0) {
      initPetalsSimulation();
    }

    if (petalsAnimationFrame) {
      cancelAnimationFrame(petalsAnimationFrame);
      petalsAnimationFrame = null;
    }

    petalsCanvas.style.opacity = '1';
    isPetalsEnabled = true;
    updatePetalsButtonUI();

    const ctx = petalsCanvas.getContext('2d');

    function loop() {
      if (!isPetalsEnabled) return;
      ctx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);

      lavenderPetalsList.forEach(petal => {
        petal.update(petalsCanvas.width, petalsCanvas.height);
        petal.draw(ctx);
      });

      petalsAnimationFrame = requestAnimationFrame(loop);
    }

    petalsAnimationFrame = requestAnimationFrame(loop);
  }

  function stopLavenderPetals() {
    isPetalsEnabled = false;
    if (petalsCanvas) {
      petalsCanvas.style.opacity = '0';
      const ctx = petalsCanvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
    }
    if (petalsAnimationFrame) {
      cancelAnimationFrame(petalsAnimationFrame);
      petalsAnimationFrame = null;
    }
    updatePetalsButtonUI();
  }

  function toggleLavenderPetals() {
    if (isPetalsEnabled) {
      stopLavenderPetals();
    } else {
      startLavenderPetals();
    }
  }

  function updatePetalsButtonUI() {
    if (!togglePetalsBtn) return;
    if (isPetalsEnabled) {
      togglePetalsBtn.classList.add('active');
      togglePetalsBtn.classList.remove('inactive');
      togglePetalsBtn.setAttribute('data-tooltip', 'Pause Falling Petals');
      togglePetalsBtn.setAttribute('aria-label', 'Pause falling lavender petals');
    } else {
      togglePetalsBtn.classList.remove('active');
      togglePetalsBtn.classList.add('inactive');
      togglePetalsBtn.setAttribute('data-tooltip', 'Turn Petals On');
      togglePetalsBtn.setAttribute('aria-label', 'Turn falling lavender petals on');
    }
  }

  if (togglePetalsBtn) {
    togglePetalsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLavenderPetals();
    });
  }

  window.addEventListener('resize', () => {
    if (petalsCanvas) {
      petalsCanvas.width = window.innerWidth;
      petalsCanvas.height = window.innerHeight;
    }
  }, { passive: true });

  // Pre-initialize particles on DOM load
  initPetalsSimulation();

  // ==========================================
  // 8. INTERACTIVE HEART-SHAPED SCRATCH CARD
  // ==========================================

  let isHeartScratchInitialized = false;

  function initHeartScratchCard() {
    const container = document.getElementById('heartScratchContainer');
    const canvas = document.getElementById('heartScratchCanvas');
    const instructionBtn = document.getElementById('scratchInstruction');
    const caption = document.getElementById('revealedCoupleCaption');

    if (!canvas || !container) return;
    if (isHeartScratchInitialized && canvas.dataset.ready === 'true') return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let isRevealed = false;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let checkScratchThrottle = null;

    function setupCanvas() {
      // Get physical pixel dimensions
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 260;
      const height = rect.height || 250;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // Reset transformations
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // 1. Draw Luxurious Metallic Gold Foil Gradient
      const goldGrad = ctx.createLinearGradient(0, 0, width, height);
      goldGrad.addColorStop(0.00, '#fff6dd');
      goldGrad.addColorStop(0.20, '#eac775');
      goldGrad.addColorStop(0.45, '#c59333');
      goldGrad.addColorStop(0.70, '#fcedcb');
      goldGrad.addColorStop(0.88, '#ab7922');
      goldGrad.addColorStop(1.00, '#e5be6b');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = goldGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Add Shimmering Gold Grain / Foil Specular Dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      const dotCount = Math.floor((width * height) / 130);
      for (let i = 0; i < dotCount; i++) {
        const sx = Math.random() * width;
        const sy = Math.random() * height;
        const sr = Math.random() * 1.5 + 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(100, 60, 10, 0.16)';
      for (let i = 0; i < Math.floor(dotCount / 2); i++) {
        const sx = Math.random() * width;
        const sy = Math.random() * height;
        const sr = Math.random() * 1.2 + 0.3;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Paint Typography & Royal Emblem onto the Foil
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Cross Symbol
      ctx.font = '700 24px "Cinzel", Georgia, serif';
      ctx.fillStyle = '#421455';
      ctx.shadowColor = 'rgba(255, 245, 210, 0.85)';
      ctx.shadowBlur = 4;
      ctx.fillText('✝', width / 2, height * 0.30);

      // "SCRATCH TO REVEAL" text
      ctx.font = '700 11px "Montserrat", sans-serif';
      ctx.fillStyle = '#3a0c49';
      ctx.shadowColor = 'rgba(255, 245, 210, 0.7)';
      ctx.shadowBlur = 3;
      ctx.fillText('SCRATCH TO REVEAL', width / 2, height * 0.46);

      // "The Couple" Calligraphy
      ctx.font = 'italic 700 20px "Great Vibes", "Playfair Display", serif';
      ctx.fillStyle = '#2d063a';
      ctx.fillText('The Couple', width / 2, height * 0.58);

      // Decorative Filigree Stars
      ctx.font = '600 10px "Montserrat", sans-serif';
      ctx.fillStyle = '#643907';
      ctx.shadowBlur = 0;
      ctx.fillText('✦  ❖  ✦', width / 2, height * 0.70);

      canvas.dataset.ready = 'true';
      isHeartScratchInitialized = true;
    }

    setupCanvas();

    // If initial dimensions were 0 (e.g. while hidden or loading), retry
    if (!canvas.width || canvas.width <= 10) {
      setTimeout(setupCanvas, 250);
    }

    // Scratching action
    function getPointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratchStroke(startX, startY, endX, endY) {
      if (isRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const brushRadius = Math.max(18, rect.width * 0.08);

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushRadius * 2;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Extra round cap at endpoint to ensure smooth continuous scratching
      ctx.beginPath();
      ctx.arc(endX, endY, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function checkScratchPercentage() {
      if (isRevealed) return;

      try {
        const w = canvas.width;
        const h = canvas.height;
        if (!w || !h) return;

        const imgData = ctx.getImageData(0, 0, w, h);
        const pixels = imgData.data;
        let totalSampled = 0;
        let clearSampled = 0;
        const stride = 16 * 4; // Check every 16th pixel for high performance

        for (let i = 0; i < pixels.length; i += stride) {
          totalSampled++;
          if (pixels[i + 3] === 0) { // Fully transparent
            clearSampled++;
          }
        }

        const scratchedRatio = clearSampled / totalSampled;
        // Trigger reveal when ~45% of the heart area is scratched
        if (scratchedRatio > 0.28) {
          revealPhoto();
        }
      } catch (err) {
        console.warn('Canvas check error:', err);
      }
    }

    function scheduleCheck() {
      if (checkScratchThrottle) return;
      checkScratchThrottle = setTimeout(() => {
        checkScratchPercentage();
        checkScratchThrottle = null;
      }, 120);
    }

    function revealPhoto() {
      if (isRevealed) return;
      isRevealed = true;

      // Smoothly dissolve remaining scratch layer
      canvas.style.transition = 'opacity 0.75s ease-out';
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';

      // Update button status badge
      if (instructionBtn) {
        instructionBtn.classList.add('is-revealed');
        instructionBtn.innerHTML = '<span class="scratch-sparkle">✦</span><span class="scratch-text">Revealed with Love ✦</span><span class="scratch-sparkle">✦</span>';
      }

      // Display couple names caption
      if (caption) {
        caption.classList.add('is-visible');
      }

      // Trigger celebratory golden confetti shower
      triggerConfetti(65);
    }

    // Pointer Event Handlers (seamless across touch, mouse, stylus)
    function onPointerDown(e) {
      if (isRevealed) return;
      isDrawing = true;
      try {
        if (canvas.setPointerCapture) {
          canvas.setPointerCapture(e.pointerId);
        }
      } catch (err) {}

      const pos = getPointerPos(e);
      lastX = pos.x;
      lastY = pos.y;
      scratchStroke(lastX, lastY, lastX, lastY);
      scheduleCheck();
    }

    function onPointerMove(e) {
      if (!isDrawing || isRevealed) return;
      const pos = getPointerPos(e);
      scratchStroke(lastX, lastY, pos.x, pos.y);
      lastX = pos.x;
      lastY = pos.y;
      scheduleCheck();
    }

    function onPointerUp(e) {
      if (!isDrawing) return;
      isDrawing = false;
      try {
        if (canvas.releasePointerCapture) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}
      checkScratchPercentage();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    // Fallback: Click instruction badge to instantly reveal
    if (instructionBtn) {
      instructionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        revealPhoto();
      });
    }

    // Handle resize gracefully
    window.addEventListener('resize', () => {
      if (!isRevealed && canvas.style.opacity !== '0') {
        setupCanvas();
      }
    }, { passive: true });
  }

  // Also prep scratch card on DOM load
  setTimeout(() => {
    initHeartScratchCard();
  }, 200);
});
