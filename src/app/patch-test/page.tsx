'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dispatchPatchAction } from '@/lib/dispatchPatchAction';
import { PatchManifestTest } from '@/components/PatchManifestTest';

export default function PatchTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testScrollTo = (sectionId: string) => {
    addResult(`Testing scrollTo: ${sectionId}`);
    dispatchPatchAction({ type: 'scrollTo', payload: sectionId });
  };

  const testHighlight = (elementId: string) => {
    addResult(`Testing highlight: ${elementId}`);
    dispatchPatchAction({ type: 'highlight', payload: elementId });
  };

  const testEasterEgg = (eggType: string) => {
    addResult(`Testing easter egg: ${eggType}`);
    dispatchPatchAction({ type: 'revealEasterEgg', payload: eggType });
  };

  const testConsoleAPI = () => {
    addResult('Testing window.Patch API...');
    if (typeof window !== 'undefined' && window.Patch) {
      addResult('✅ window.Patch is available');
      addResult(`Current state: ${window.Patch.isOpen() ? 'Open' : 'Closed'}`);
    } else {
      addResult('❌ window.Patch not available');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Patch Action Dispatcher Test
          </h1>
          <p className="text-muted-foreground">
            Test Patch&apos;s action dispatching capabilities
          </p>
        </div>

        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Action Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => testScrollTo('hero')} variant="outline">
                Scroll to Hero
              </Button>
              <Button onClick={() => testScrollTo('summary')} variant="outline">
                Scroll to Summary
              </Button>
              <Button
                onClick={() => testScrollTo('career-highlights')}
                variant="outline"
              >
                Scroll to Career
              </Button>
              <Button onClick={() => testScrollTo('contact')} variant="outline">
                Scroll to Contact
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => testHighlight('hero')} variant="outline">
                Highlight Hero
              </Button>
              <Button
                onClick={() => testHighlight('summary')}
                variant="outline"
              >
                Highlight Summary
              </Button>
              <Button
                onClick={() => testEasterEgg('mystery')}
                variant="outline"
              >
                Easter Egg
              </Button>
              <Button onClick={testConsoleAPI} variant="outline">
                Test API
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-64 overflow-y-auto">
              {testResults.length === 0 ? (
                <div className="text-green-600">No tests run yet...</div>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Manifest Test */}
        <Card>
          <CardHeader>
            <CardTitle>Site Manifest API Test</CardTitle>
          </CardHeader>
          <CardContent>
            <PatchManifestTest />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test Patch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                Method 1: Through Patch Chat
              </h3>
              <p className="text-sm text-muted-foreground">
                1. Click the floating Patch button (bottom-right)
                <br />
                2. Try these commands:
                <br />
                • &ldquo;resume&rdquo; - scrolls to resume section
                <br />
                • &ldquo;projects&rdquo; - scrolls to projects section
                <br />
                • &ldquo;talks&rdquo; - scrolls to talks section
                <br />• &ldquo;help&rdquo; - shows available commands
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Method 2: Browser Console</h3>
              <p className="text-sm text-muted-foreground">
                Open browser console and try:
                <br />• <code>window.Patch.toggle()</code> - toggle Patch
                open/closed
                <br />• <code>window.Patch.open()</code> - open Patch
                <br />• <code>window.Patch.close()</code> - close Patch
                <br />• <code>window.Patch.isOpen()</code> - check if open
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Method 3: Direct Action Testing
              </h3>
              <p className="text-sm text-muted-foreground">
                Use the buttons above to test individual actions directly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
