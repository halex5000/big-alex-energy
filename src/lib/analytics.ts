// Plausible Analytics Utility
// Provides type-safe event tracking with debug mode support

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string> }
    ) => void;
  }
}

class Analytics {
  private isDebugMode: boolean = false;

  constructor() {
    // Check for debug mode in localStorage or URL params
    if (typeof window !== 'undefined') {
      this.isDebugMode =
        localStorage.getItem('plausible-debug') === 'true' ||
        new URLSearchParams(window.location.search).has('debug');
    }
  }

  private log(event: string, props?: Record<string, string>) {
    if (this.isDebugMode) {
      console.log('🔍 Plausible Event:', { event, props });
    }
  }

  private track(event: string, props?: Record<string, string>) {
    if (typeof window === 'undefined') return;

    this.log(event, props);

    if (window.plausible) {
      window.plausible(event, { props });
    } else {
      console.warn('Plausible not loaded, event not tracked:', event);
    }
  }

  // Custom event tracking methods
  trackResumeCardClick() {
    this.track('ClickedResumeCard');
  }

  trackViyoCardClick() {
    this.track('ClickedViyoCard');
  }

  trackHackathonsClick() {
    this.track('ClickedHackathons');
  }

  trackRedirectLink(destination: string) {
    this.track('ClickedRedirectLink', { destination });
  }

  trackExternalLink(url: string, label?: string) {
    this.track('ClickedExternalLink', {
      url: url.replace(/^https?:\/\//, ''), // Remove protocol for cleaner tracking
      label: label || 'Unknown',
    });
  }

  trackNavigationClick(section: string) {
    this.track('ClickedNavigation', { section });
  }

  trackCareerHighlightClick(highlight: string) {
    this.track('ClickedCareerHighlight', { highlight });
  }

  trackDownloadClick(file: string) {
    this.track('ClickedDownload', { file });
  }

  trackCLIClick() {
    this.track('ClickedCLI');
  }

  // UTM parameter tracking
  trackUTMParams() {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};

    [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });

    if (Object.keys(utmParams).length > 0) {
      this.track('UTM Parameters Detected', utmParams);
    }
  }

  // Page view tracking (for custom pages)
  trackPageView(page: string) {
    this.track('Page View', { page });
  }

  // Enable/disable debug mode
  setDebugMode(enabled: boolean) {
    this.isDebugMode = enabled;
    if (typeof window !== 'undefined') {
      if (enabled) {
        localStorage.setItem('plausible-debug', 'true');
      } else {
        localStorage.removeItem('plausible-debug');
      }
    }
  }

  // Check if debug mode is enabled
  isDebugEnabled(): boolean {
    return this.isDebugMode;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export individual tracking functions for convenience
export const trackResumeCardClick = () => analytics.trackResumeCardClick();
export const trackViyoCardClick = () => analytics.trackViyoCardClick();
export const trackHackathonsClick = () => analytics.trackHackathonsClick();
export const trackRedirectLink = (destination: string) =>
  analytics.trackRedirectLink(destination);
export const trackExternalLink = (url: string, label?: string) =>
  analytics.trackExternalLink(url, label);
export const trackNavigationClick = (section: string) =>
  analytics.trackNavigationClick(section);
export const trackCareerHighlightClick = (highlight: string) =>
  analytics.trackCareerHighlightClick(highlight);
export const trackDownloadClick = (file: string) =>
  analytics.trackDownloadClick(file);
export const trackCLIClick = () => analytics.trackCLIClick();
export const trackUTMParams = () => analytics.trackUTMParams();
export const trackPageView = (page: string) => analytics.trackPageView(page);
