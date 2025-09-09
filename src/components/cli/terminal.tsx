'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CommandProcessor } from './command-processor';
import { VirtualFileSystem } from './virtual-file-system';
import { TerminalOutput } from './terminal-output';
import { BootSequence } from './boot-sequence';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { useTheme } from '@/contexts/theme-context';

export function Terminal() {
  const { colors, setTheme, currentTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState('/');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<
    Array<{ type: 'command' | 'output' | 'error'; content: string }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [matrixConfig, setMatrixConfig] = useState({ speed: 0.125, size: 32 });
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const vfs = new VirtualFileSystem();
  const handleMatrixConfig = (config: { speed?: number; size?: number }) => {
    setMatrixConfig(prev => ({
      speed: config.speed !== undefined ? config.speed : prev.speed,
      size: config.size !== undefined ? config.size : prev.size,
    }));
  };

  const processor = new CommandProcessor(
    vfs,
    setCurrentPath,
    setOutput,
    setIsProcessing,
    router,
    setTheme,
    handleMatrixConfig
  );

  useEffect(() => {
    if (inputRef.current && bootSequenceComplete) {
      inputRef.current.focus();
    }
  }, [bootSequenceComplete]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleBootComplete = () => {
    setBootSequenceComplete(true);
    setOutput([
      { type: 'output', content: 'halex9000 boot sequence initiated…' },
      { type: 'output', content: '' },
      {
        type: 'output',
        content: 'Loading core modules: resume, projects, ego, flair…',
      },
      { type: 'output', content: 'Loading bigalexenergy… ██████████████ 100%' },
      { type: 'output', content: '' },
      {
        type: 'output',
        content: 'CLI ready. Type help for available commands.',
      },
      { type: 'output', content: '' },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const handleTabCompletion = () => {
    const [cmd, ...args] = currentCommand.trim().split(' ');
    const lastArg = args[args.length - 1] || '';

    // Get available completions based on command
    let completions: string[] = [];

    if (cmd === 'cd') {
      // Complete directories
      const dirContents = vfs.getPathContents(currentPath);
      if (dirContents) {
        completions = dirContents.filter(item => {
          const fullPath =
            currentPath === '/' ? `/${item}` : `${currentPath}/${item}`;
          return vfs.getPathContents(fullPath) !== null; // Only directories
        });
      }
      // Add special directories
      completions.push('..', '~', '/');
    } else if (cmd === 'cat') {
      // Complete files and directories
      const dirContents = vfs.getPathContents(currentPath);
      if (dirContents) {
        completions = dirContents;
      }
    } else if (cmd === 'ls') {
      // Complete directories
      const dirContents = vfs.getPathContents(currentPath);
      if (dirContents) {
        completions = dirContents.filter(item => {
          const fullPath =
            currentPath === '/' ? `/${item}` : `${currentPath}/${item}`;
          return vfs.getPathContents(fullPath) !== null; // Only directories
        });
      }
    } else if (!cmd || cmd === '') {
      // Complete commands
      completions = [
        'help',
        'more',
        'ls',
        'cd',
        'cat',
        'pwd',
        'resume',
        'download',
        'clear',
        'exit',
        'sudo',
        'theme',
        'whoami',
        'date',
        'uname',
        'uptime',
        'boost',
        'destiny',
        'vibes',
        'halex',
        'matrix',
      ];
    }

    // Filter completions based on what user has typed
    const filteredCompletions = completions.filter(completion =>
      completion.toLowerCase().startsWith(lastArg.toLowerCase())
    );

    if (filteredCompletions.length === 1) {
      // Single match - complete it
      const completion = filteredCompletions[0];
      if (cmd === 'cd' || cmd === 'cat' || cmd === 'ls') {
        const newArgs = [...args.slice(0, -1), completion];
        setCurrentCommand(`${cmd} ${newArgs.join(' ')}`);
      } else {
        setCurrentCommand(completion);
      }
    } else if (filteredCompletions.length > 1) {
      // Multiple matches - show them
      setOutput(prev => [
        ...prev,
        { type: 'output', content: filteredCompletions.join('  ') },
      ]);
    }
    // No matches - do nothing (like real shell)
  };

  const executeCommand = async () => {
    if (!currentCommand.trim()) return;

    const command = currentCommand.trim();
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    setCurrentCommand('');

    // Add command to output
    setOutput(prev => [
      ...prev,
      { type: 'command', content: `halex9000@${currentPath}$ ${command}` },
    ]);

    setIsProcessing(true);

    try {
      await processor.processCommand(command, currentPath);
    } catch (error) {
      setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ]);
    } finally {
      setIsProcessing(false);
      setOutput(prev => [...prev, { type: 'output', content: '' }]);
    }
  };

  return (
    <div
      className={`h-screen flex flex-col ${colors.background} ${colors.text} font-mono overflow-hidden relative`}
    >
      {/* Matrix Rain Animation - only for matrix theme */}
      <MatrixRain
        isActive={currentTheme === 'matrix'}
        speed={matrixConfig.speed}
        size={matrixConfig.size}
        showEasterEggs={true}
      />

      {/* Terminal Header */}
      <div
        className={`px-4 py-2 border-b ${colors.border} relative z-10`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className={`text-sm ${colors.prompt}`}>halex9000@terminal</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className={`flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent relative z-10`}
        style={{ scrollbarColor: `${colors.text} transparent` }}
      >
        {/* Always show boot sequence at the top */}
        {!bootSequenceComplete ? (
          <BootSequence onComplete={handleBootComplete} colors={colors} />
        ) : (
          <TerminalOutput output={output} colors={colors} />
        )}

        {isProcessing && (
          <div className={`flex items-center gap-1 ${colors.text}`}>
            <span className="animate-pulse">█</span>
            <span>Processing...</span>
          </div>
        )}
      </div>

      {/* Command Input - only show after boot sequence completes */}
      {bootSequenceComplete && (
        <div
          className={`border-t ${colors.border} p-4 relative z-10`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <div className="flex items-center gap-2">
            <span className={colors.prompt}>halex9000@{currentPath}$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={e => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent ${colors.text} outline-none font-mono`}
              placeholder="Enter command..."
              autoComplete="off"
              spellCheck="false"
            />
            <div className={`w-2 h-4 ${colors.cursor} animate-pulse`}></div>
          </div>
        </div>
      )}
    </div>
  );
}
