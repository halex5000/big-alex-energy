'use client';

import { useState } from 'react';
import {
  usePatchManifest,
  usePatchManifestSearch,
} from '@/hooks/usePatchManifest';

export function PatchManifestTest() {
  const { manifest, loading, error, refetch } = usePatchManifest();
  const [searchQuery, setSearchQuery] = useState('');
  const { results, hasResults } = usePatchManifestSearch(searchQuery);

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <div className="text-sm text-gray-600">Loading site manifest...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
        <div className="text-sm text-red-600">Error: {error}</div>
        <button
          onClick={refetch}
          className="mt-2 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold text-gray-800 mb-3">Patch Site Manifest</h3>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search sections..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-xs text-gray-600 mb-2">
        {manifest
          ? `${manifest.length} sections available`
          : 'No manifest data'}
      </div>

      {searchQuery && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Search Results ({results.length}):
          </div>
          {hasResults ? (
            <div className="space-y-1">
              {results.map(section => (
                <div
                  key={section.id}
                  className="text-xs p-2 bg-white rounded border"
                >
                  <div className="font-medium">{section.title}</div>
                  <div className="text-gray-600">{section.path}</div>
                  {section.description && (
                    <div className="text-gray-500 mt-1">
                      {section.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500">No results found</div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <div>Total sections: {manifest?.length || 0}</div>
        <div>
          Categories:{' '}
          {manifest
            ? [...new Set(manifest.map(s => s.category).filter(Boolean))].join(
                ', '
              )
            : 'None'}
        </div>
      </div>
    </div>
  );
}
