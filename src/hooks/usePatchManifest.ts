import { useEffect, useState } from 'react';
import {
  PatchManifestEntry,
  PatchManifestResponse,
} from '@/patch/patchSiteManifest';

interface UsePatchManifestReturn {
  manifest: PatchManifestEntry[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePatchManifest = (): UsePatchManifestReturn => {
  const [manifest, setManifest] = useState<PatchManifestEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManifest = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/patch/manifest');
      const data: PatchManifestResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch manifest');
      }

      setManifest(data.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching patch manifest:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManifest();
  }, []);

  return {
    manifest,
    loading,
    error,
    refetch: fetchManifest,
  };
};

// Helper hook for finding sections by keyword
export const usePatchManifestSearch = (query: string) => {
  const { manifest, loading, error } = usePatchManifest();
  const [results, setResults] = useState<PatchManifestEntry[]>([]);

  useEffect(() => {
    if (!manifest || !query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matchingSections = manifest.filter(
      section =>
        section.keywords?.some(keyword =>
          keyword.toLowerCase().includes(lowerQuery)
        ) ||
        section.title.toLowerCase().includes(lowerQuery) ||
        section.description?.toLowerCase().includes(lowerQuery) ||
        section.category?.toLowerCase().includes(lowerQuery)
    );

    setResults(matchingSections);
  }, [manifest, query]);

  return {
    results,
    loading,
    error,
    hasResults: results.length > 0,
  };
};
