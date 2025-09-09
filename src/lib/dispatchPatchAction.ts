export function dispatchPatchAction(action: { type: string; payload: string }) {
  switch (action.type) {
    case 'scrollTo':
      scrollToSection(action.payload);
      break;
    case 'highlight':
      highlightElement(action.payload);
      break;
    case 'navigate':
      navigateToPage(action.payload);
      break;
    case 'revealEasterEgg':
      revealEasterEgg(action.payload);
      break;
    default:
      console.warn('Unknown Patch action:', action);
  }
}

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // Add a subtle highlight effect
    element.classList.add('patch-highlight');
    setTimeout(() => {
      element.classList.remove('patch-highlight');
    }, 2000);
  } else {
    console.warn(`Patch couldn't find section: ${sectionId}`);
  }
}

function highlightElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('patch-highlight', 'patch-pulse');
    setTimeout(() => {
      element.classList.remove('patch-highlight', 'patch-pulse');
    }, 3000);
  } else {
    console.warn(`Patch couldn't find element: ${elementId}`);
  }
}

function navigateToPage(path: string) {
  if (typeof window !== 'undefined') {
    console.log(`Patch is navigating to: ${path}`);

    // Use regular navigation for now
    // The PatchOverlay component will handle Next.js routing
    window.location.href = path;
  }
}

function revealEasterEgg(eggType: string) {
  console.log(`Patch is revealing easter egg: ${eggType}`);

  // For now, just log it - we can add actual easter eggs later
  switch (eggType) {
    case 'mystery':
      // Could reveal a hidden element or trigger an animation
      console.log('Patch: "The mystery deepens... but not today."');
      break;
    default:
      console.log(
        `Patch: "Easter egg ${eggType} is still locked. Keep exploring."`
      );
  }
}

// Add CSS for Patch's visual effects
export function injectPatchStyles() {
  if (typeof document === 'undefined') return;

  const styleId = 'patch-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .patch-highlight {
      animation: patch-glow 2s ease-in-out;
    }
    
    .patch-pulse {
      animation: patch-pulse 1s ease-in-out infinite;
    }
    
    @keyframes patch-glow {
      0% { 
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 20px 10px rgba(34, 197, 94, 0.2);
        transform: scale(1.02);
      }
      100% { 
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
        transform: scale(1);
      }
    }
    
    @keyframes patch-pulse {
      0%, 100% { 
        opacity: 1;
        transform: scale(1);
      }
      50% { 
        opacity: 0.8;
        transform: scale(1.01);
      }
    }
  `;

  document.head.appendChild(style);
}
