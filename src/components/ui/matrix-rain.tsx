'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  isActive: boolean;
  speed?: number;
  size?: number;
  showEasterEggs?: boolean;
}

export function MatrixRain({
  isActive,
  speed = 0.125,
  size = 32,
  showEasterEggs = true,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters - mix of numbers, letters, and symbols
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const charArray = chars.split('');

    // Hidden message characters (appear more frequently)
    const hiddenMessage = 'HALEX9000';
    const messageChars = hiddenMessage.split('');

    // Epic easter egg messages with Big Alex Energy™
    const easterEggMessages = [
      '// Built with caffeine, curiosity, and a questionable number of AWS accounts.',
      '// Optimized for chaos-resilience and maximum vibes.',
      '// Running on coffee, code, and unrelenting ambition.',
      '// halex kernel: patched for maximal impact.',
      '// eventBus.emit("chaos", { graceful: true });',
      '// TODO: rewrite universe in hexagonal architecture.',
      '// WARNING: excessive innovation detected. Please slow down. Just kidding. Full send.',
      '// Authenticated via sheer force of will.',
      '// Latency reduced by 9001% through Big Alex Optimizer™.',
      '// sudo rm -rf /imposter-syndrome',
      '// export PATH=$PATH:/big/alex/energy',
      "// echo 'Resistance is futile. I refactor in my sleep.'",
      '// if (vibe != immaculate) reboot --halex-mode',
      "// They told me it couldn't be done. So I did it twice and wrote docs.",
      '// Built so well it apologizes when it crashes.',
      '// You can check out anytime you like… but you can never leave.',
      '// BAE_LEVEL=over_9000',
      '// EXECUTING: viyo --unlock',
      '// Loading module: experimentation_engine > 🚀 online',
      "// Code is poetry. Mine rhymes with 'dominance'.",
      '// You found me. Big Alex Protocol engaged. Initiating flex sequence...',
      '// Welcome to the halex shell. Enjoy your stay.',
      "// You didn't choose this terminal. It chose you.",
      '// ERROR: Cannot compute awesomeness level. Overflow detected.',
      '// WARNING: Big Alex Energy levels critical. Initiating emergency flex.',
      '// STATUS: Currently refactoring reality. Please hold.',
      '// DEBUG: Found bug in universe. Patching with pure confidence.',
      '// INFO: Deployed to production. Chaos mode: ENABLED.',
      '// TRACE: Stack overflow prevented by sheer force of will.',
      '// FATAL: Imposter syndrome not found. Proceeding with confidence.',
      "// SUCCESS: All tests passing. Including the ones that shouldn't.",
      '// PERFORMANCE: Optimized for maximum impact. Warning: Side effects may include world domination.',
      '// SECURITY: Firewall bypassed using Big Alex Energy™.',
      '// BACKUP: Reality backed up successfully. Restore point: Yesterday.',
      '// UPDATE: Upgraded from good to legendary. No rollback needed.',
      '// CONFIG: Set awesomeness to maximum. Warning: May cause spontaneous applause.',
      '// LOG: User attempted to be normal. System rejected. Proceeding with excellence.',
      '// METRICS: Coolness factor: ∞. Confidence level: Unbreakable.',
      '// ALERT: Detected attempt to be average. Redirecting to extraordinary.',
      '// NOTICE: This terminal runs on pure Big Alex Energy™. No external dependencies required.',
      '// CRITICAL: Success rate at 100%. This is not a drill.',
      '// EMERGENCY: Excellence levels too high. Initiating humble mode... Just kidding.',
      '// SYSTEM: All processes running smoothly. Including the impossible ones.',
      '// CORE: halex9000.exe loaded successfully. Side effects: Unstoppable momentum.',
      '// MODULE: confidence.dll loaded. Error handling: What errors?',
      '// THREAD: Main execution thread: Dominating. Secondary threads: Also dominating.',
      '// MEMORY: Big Alex Energy™: 100% allocated. Efficiency: Maximum.',
      '// CPU: Processing at 9001% capacity. Temperature: Cool as ice.',
      '// DISK: Storage full of awesome. Free space: None needed.',
      '// NETWORK: Connected to the matrix. Bandwidth: Unlimited.',
      '// GPU: Rendering reality in 4K. FPS: Always smooth.',
      '// AUDIO: Playing the sound of success. Volume: Maximum.',
      '// VIDEO: Displaying pure excellence. Resolution: Beyond human comprehension.',
      '// INPUT: Reading minds. Output: Pure genius.',
      '// OUTPUT: Writing the future. Format: Unstoppable.',
      '// ERROR: Error not found. System too good for errors.',
      '// WARNING: Warning: This system is too awesome for warnings.',
      '// INFO: Information: You are witnessing greatness.',
      '// DEBUG: Debugging: Nothing to debug. Everything works perfectly.',
      '// TRACE: Tracing: Following the path of excellence.',
      '// FATAL: Fatal: Fatal errors are not fatal here.',
      '// SUCCESS: Success: Success is the only option.',
      '// PERFORMANCE: Performance: Performing at maximum capacity.',
      '// SECURITY: Security: Secured by Big Alex Energy™.',
      '// BACKUP: Backup: Backing up awesomeness.',
      '// UPDATE: Update: Updating to the next level.',
      '// CONFIG: Config: Configured for maximum impact.',
      '// LOG: Log: Logging the journey to greatness.',
      '// METRICS: Metrics: Measuring the immeasurable.',
      '// ALERT: Alert: Alerting the world to excellence.',
      '// NOTICE: Notice: Noticing that this is amazing.',
      '// CRITICAL: Critical: Critically awesome.',
      '// EMERGENCY: Emergency: Emergency awesome mode activated.',
      '// SYSTEM: System: Systematically dominating.',
      '// CORE: Core: Core of excellence.',
      '// MODULE: Module: Modular awesomeness.',
      '// THREAD: Thread: Threading through success.',
      '// MEMORY: Memory: Remembering to be awesome.',
      '// CPU: CPU: Central Processing of awesomeness.',
      '// DISK: Disk: Storing pure excellence.',
      '// NETWORK: Network: Networking with greatness.',
      '// GPU: GPU: Graphics Processing of awesomeness.',
      '// AUDIO: Audio: Sound of success.',
      '// VIDEO: Video: Visual excellence.',
      '// INPUT: Input: Inputting greatness.',
      '// OUTPUT: Output: Outputting awesomeness.',
    ];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create columns of falling characters
    const fontSize = size; // Configurable size
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    // Easter egg message system
    let easterEggMessage = '';
    let easterEggTimer = 0;
    let easterEggDuration = 0;
    let easterEggOpacity = 0;
    let easterEggX = 0;
    let easterEggY = 0;

    // Animation function
    const draw = () => {
      if (!isActive) return;

      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Easter egg message system
      if (showEasterEggs) {
        easterEggTimer++;

        // Trigger new easter egg message randomly
        if (easterEggMessage === '' && Math.random() < 0.001) {
          // Very rare
          easterEggMessage =
            easterEggMessages[
              Math.floor(Math.random() * easterEggMessages.length)
            ];
          easterEggDuration = 300 + Math.random() * 200; // 5-8 seconds
          easterEggOpacity = 0;
          easterEggX = Math.random() * (canvas.width - 600); // Random X position
          easterEggY = Math.random() * (canvas.height - 100); // Random Y position
        }

        // Fade in easter egg message
        if (easterEggMessage !== '' && easterEggOpacity < 1) {
          easterEggOpacity += 0.02;
        }

        // Fade out easter egg message
        if (easterEggMessage !== '' && easterEggTimer > easterEggDuration) {
          easterEggOpacity -= 0.02;
          if (easterEggOpacity <= 0) {
            easterEggMessage = '';
            easterEggTimer = 0;
          }
        }

        // Draw easter egg message
        if (easterEggMessage !== '') {
          ctx.save();
          ctx.globalAlpha = easterEggOpacity;
          ctx.fillStyle = '#00ff00';
          ctx.font = `${fontSize * 0.8}px monospace`;
          ctx.shadowColor = '#00ff00';
          ctx.shadowBlur = 10;

          // Split message into lines if too long
          const maxWidth = canvas.width - 100;
          const words = easterEggMessage.split(' ');
          let line = '';
          let y = easterEggY;

          for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);

            if (metrics.width > maxWidth && i > 0) {
              ctx.fillText(line, easterEggX, y);
              line = words[i] + ' ';
              y += fontSize * 1.2;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, easterEggX, y);

          ctx.restore();
        }
      }

      // Set text properties
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#00ff00'; // Matrix green

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character with hidden message bias
        let char;
        if (Math.random() < 0.15) {
          // 15% chance for hidden message char
          char = messageChars[Math.floor(Math.random() * messageChars.length)];
        } else {
          char = charArray[Math.floor(Math.random() * charArray.length)];
        }

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i]);

        // Reset drop to top randomly
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down (configurable speed)
        drops[i] += fontSize * speed;
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive, speed, size, showEasterEggs]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ background: 'transparent' }}
    />
  );
}
