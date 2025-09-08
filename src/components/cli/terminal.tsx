'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CommandProcessor } from './command-processor';
import { VirtualFileSystem } from './virtual-file-system';
import { TerminalOutput } from './terminal-output';
import { BootSequence } from './boot-sequence';
import { useTheme } from '@/contexts/theme-context';

export function Terminal() {
  const { colors, setTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState('/');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<
    Array<{ type: 'command' | 'output' | 'error'; content: string }>
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const vfs = new VirtualFileSystem();
  const processor = new CommandProcessor(
    vfs,
    setCurrentPath,
    setOutput,
    setIsProcessing,
    router,
    setTheme
  );

  useEffect(() => {
    if (inputRef.current && !showBootSequence) {
      inputRef.current.focus();
    }
  }, [showBootSequence]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleBootComplete = () => {
    setShowBootSequence(false);
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

  if (showBootSequence) {
    return (
      <div
        className={`h-screen flex flex-col ${colors.background} ${colors.text} font-mono overflow-hidden`}
      >
        {/* Terminal Header */}
        <div
          className={`px-4 py-2 border-b ${colors.border}`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className={`text-sm ${colors.prompt}`}>
              halex9000@terminal
            </span>
          </div>
        </div>

        {/* Boot Sequence */}
        <div className="flex-1 overflow-y-auto">
          <BootSequence onComplete={handleBootComplete} colors={colors} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex flex-col ${colors.background} ${colors.text} font-mono overflow-hidden`}
    >
      {/* Terminal Header */}
      <div
        className={`px-4 py-2 border-b ${colors.border}`}
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
        className={`flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent`}
        style={{ scrollbarColor: `${colors.text} transparent` }}
      >
        <TerminalOutput output={output} colors={colors} />
        {isProcessing && (
          <div className={`flex items-center gap-1 ${colors.text}`}>
            <span className="animate-pulse">█</span>
            <span>Processing...</span>
          </div>
        )}
      </div>

      {/* Command Input */}
      <div
        className={`border-t ${colors.border} p-4`}
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
    </div>
  );
}
