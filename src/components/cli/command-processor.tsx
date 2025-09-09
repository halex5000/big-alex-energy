import { VirtualFileSystem } from './virtual-file-system';
import { resumeData } from '@/data/resume';
import { Theme } from '@/contexts/theme-context';

export class CommandProcessor {
  constructor(
    private vfs: VirtualFileSystem,
    private setCurrentPath: (path: string) => void,
    private setOutput: (
      fn: (
        prev: Array<{ type: 'command' | 'output' | 'error'; content: string }>
      ) => Array<{ type: 'command' | 'output' | 'error'; content: string }>
    ) => void,
    private setIsProcessing: (processing: boolean) => void,
    private router: { push: (path: string) => void },
    private setTheme?: (theme: Theme) => void,
    private setMatrixConfig?: (config: {
      speed?: number;
      size?: number;
    }) => void
  ) {}

  async processCommand(command: string, currentPath: string): Promise<void> {
    const [cmd, ...args] = command.trim().split(' ');

    // Handle command aliases
    const aliases: Record<string, string> = {
      open: 'cat',
      view: 'cat',
      show: 'cat',
      list: 'ls',
      dir: 'ls',
      home: 'cd ~',
      root: 'cd /',
      up: 'cd ..',
      back: 'cd ..',
    };

    const normalizedCmd = aliases[cmd.toLowerCase()] || cmd;
    const [resolvedCmd, ...resolvedArgs] = normalizedCmd.split(' ');
    const finalArgs = [...resolvedArgs, ...args];

    switch (resolvedCmd.toLowerCase()) {
      case 'help':
      case 'man':
        this.showHelp();
        break;

      case 'more':
        this.showSecretHelp();
        break;

      case 'ls':
        this.listContents(currentPath);
        break;

      case 'cd':
        this.changeDirectory(finalArgs[0] || '/', currentPath);
        break;

      case 'pwd':
        this.showCurrentDirectory(currentPath);
        break;

      case 'cat':
        this.catFile(finalArgs[0], currentPath);
        break;

      case 'resume':
        this.showResumeSummary();
        break;

      case 'download':
        if (finalArgs[0] === 'resume') {
          this.downloadResume();
        } else {
          this.setOutput(prev => [
            ...prev,
            { type: 'error', content: 'Usage: download resume' },
          ]);
        }
        break;

      case 'clear':
        this.clearTerminal();
        break;

      case 'exit':
        this.exitCLI();
        break;

      case 'sudo':
        this.handleSudo();
        break;

      case 'theme':
        this.handleThemeChange(finalArgs[0]);
        break;

      case 'whoami':
        this.showWhoami();
        break;

      case 'date':
        this.showDate();
        break;

      case 'uname':
        this.showUname();
        break;

      case 'uptime':
        this.showUptime();
        break;

      case 'matrix':
        this.handleMatrixConfig(finalArgs[0], finalArgs[1]);
        break;

      case 'boost':
        this.handleBoostCommand(finalArgs[0]);
        break;

      case 'destiny':
        this.handleDestinyCommand();
        break;

      case 'vibes':
        this.handleVibesCommand();
        break;

      case 'halex':
        this.handleHalexCommand();
        break;

      default:
        this.setOutput(prev => [
          ...prev,
          {
            type: 'error',
            content: `Command not found: ${cmd}. Type "help" for available commands.`,
          },
        ]);
    }
  }

  private showHelp(): void {
    const helpText = `Available Commands:
==================

help, man              Show this help message
ls                     List directory contents
cd [directory]         Change directory (supports .., ~, /)
pwd                    Print working directory
cat [file]             Display file contents
resume                 Show resume summary
download resume        Download resume PDF
clear                  Clear terminal output
exit                   Exit CLI mode

System Commands:
================
whoami                 Show current user
date                   Show current date/time
uname                  Show system info
uptime                 Show system uptime

Easter Eggs:
============
sudo [command]         Try it and see...
theme [name]           Change terminal theme
theme list             Show available themes
matrix speed [1-10]    Set Matrix rain speed (1=slowest, 10=fastest)
matrix size [1-10]     Set Matrix rain size (1=smallest, 10=largest)
matrix reset           Reset Matrix rain to default settings

Examples:
=========
  ls                    # List current directory
  cd projects           # Go to projects directory
  cd ..                 # Go up one directory
  cd ~                  # Go to home directory
  pwd                   # Show current path
  cat contact           # View contact information
  cat projects/viyo     # View Viyo project details
  resume                # Quick resume overview
  download resume       # Download PDF resume

Type 'more' for secret commands...`;

    this.setOutput(prev => [...prev, { type: 'output', content: helpText }]);
  }

  private showSecretHelp(): void {
    const secretHelpText = `Secret Commands:
================

boost velocity --force  Activate Big Alex Energy™
destiny                Query the universe for your destiny
vibes                  Check your current vibe status
halex                  Activate HALEX9000 protocol

Matrix Configuration:
====================
matrix speed [1-10]    Set Matrix rain speed (1=slowest, 10=fastest)
matrix size [1-10]     Set Matrix rain size (1=smallest, 10=largest)
matrix reset           Reset Matrix rain to default settings

Advanced Easter Eggs:
====================
sudo [command]         Try it and see...
theme [name]           Change terminal theme
theme list             Show available themes

Secret Examples:
===============
  boost velocity --force  # Activate Big Alex Energy™
  destiny                # Query the universe for your destiny
  vibes                  # Check your current vibe status
  halex                  # Activate HALEX9000 protocol
  matrix speed 5         # Set Matrix rain to medium speed
  matrix size 8          # Set Matrix rain to large size
  matrix reset           # Reset Matrix rain to defaults

Warning: These commands contain pure Big Alex Energy™.
Use with caution. Side effects may include:
- Unstoppable momentum
- Spontaneous innovation
- World domination
- Excessive awesomeness`;

    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: secretHelpText },
    ]);
  }

  private listContents(currentPath: string): void {
    const contents = this.vfs.getPathContents(currentPath);
    if (contents) {
      const formattedContents = contents
        .map(item => {
          const fullPath =
            currentPath === '/' ? `/${item}` : `${currentPath}/${item}`;
          const isDirectory = this.vfs.getPathContents(fullPath) !== null;
          return `${isDirectory ? '📁' : '📄'} ${item}`;
        })
        .join('\n');

      this.setOutput(prev => [
        ...prev,
        { type: 'output', content: formattedContents },
      ]);
    } else {
      this.setOutput(prev => [
        ...prev,
        { type: 'error', content: 'Directory not found' },
      ]);
    }
  }

  private showCurrentDirectory(currentPath: string): void {
    this.setOutput(prev => [...prev, { type: 'output', content: currentPath }]);
  }

  private changeDirectory(targetPath: string, currentPath: string): void {
    let newPath: string;

    // Handle special directory navigation
    if (targetPath === '..') {
      // Go up one directory
      if (currentPath === '/') {
        this.setOutput(prev => [
          ...prev,
          { type: 'error', content: 'Already at root directory' },
        ]);
        return;
      }
      const pathParts = currentPath.split('/').filter(part => part !== '');
      newPath =
        pathParts.length > 1 ? `/${pathParts.slice(0, -1).join('/')}` : '/';
    } else if (targetPath.startsWith('../')) {
      // Handle relative paths starting with ../
      const pathParts = currentPath.split('/').filter(part => part !== '');
      const targetParts = targetPath.split('/');
      let upLevels = 0;
      let targetDir = '';

      for (const part of targetParts) {
        if (part === '..') {
          upLevels++;
        } else if (part !== '') {
          targetDir = part;
        }
      }

      if (upLevels > pathParts.length) {
        this.setOutput(prev => [
          ...prev,
          { type: 'error', content: 'Cannot go up beyond root directory' },
        ]);
        return;
      }

      const remainingParts = pathParts.slice(0, pathParts.length - upLevels);
      newPath =
        remainingParts.length > 0
          ? `/${remainingParts.join('/')}/${targetDir}`
          : `/${targetDir}`;
    } else if (targetPath === '~' || targetPath === '') {
      // Go to home directory (root)
      newPath = '/';
    } else if (targetPath === '/') {
      newPath = '/';
    } else if (targetPath.startsWith('/')) {
      newPath = targetPath;
    } else {
      newPath =
        currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`;
    }

    const contents = this.vfs.getPathContents(newPath);
    if (contents) {
      this.setCurrentPath(newPath);
      this.setOutput(prev => [
        ...prev,
        { type: 'output', content: `Changed directory to ${newPath}` },
      ]);
    } else {
      // Check if it's a file instead of a directory
      const fileContent = this.vfs.getFileContent(newPath);
      if (fileContent) {
        this.setOutput(prev => [
          ...prev,
          {
            type: 'error',
            content: `${targetPath} is a file, not a directory. Use 'cat ${targetPath}' to view it.`,
          },
        ]);
      } else {
        this.setOutput(prev => [
          ...prev,
          { type: 'error', content: `Directory not found: ${targetPath}` },
        ]);
      }
    }
  }

  private catFile(filePath: string, currentPath: string): void {
    if (!filePath) {
      this.setOutput(prev => [
        ...prev,
        { type: 'error', content: 'Usage: cat [file]' },
      ]);
      return;
    }

    let fullPath: string;
    if (filePath.startsWith('/')) {
      fullPath = filePath;
    } else {
      fullPath =
        currentPath === '/' ? `/${filePath}` : `${currentPath}/${filePath}`;
    }

    const content = this.vfs.getFileContent(fullPath);
    if (content) {
      this.setOutput(prev => [...prev, { type: 'output', content }]);
    } else {
      this.setOutput(prev => [
        ...prev,
        { type: 'error', content: `File not found: ${filePath}` },
      ]);
    }
  }

  private showResumeSummary(): void {
    const summary = `Resume Summary
==============

Alex Hardman - Engineering Leader
${resumeData.personalInfo.title}

${resumeData.summary}

Quick Stats:
• ${resumeData.experience.items.length} professional positions
• ${resumeData.awards.length} awards & recognitions
• ${resumeData.patents.length} patents
• ${Object.keys(resumeData.skills).length} skill categories

Type "cat resume/overview" for full details
Type "download resume" to get PDF version`;

    this.setOutput(prev => [...prev, { type: 'output', content: summary }]);
  }

  private downloadResume(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: '[RESUME.PDF] Download initiated...' },
    ]);

    // Trigger actual download
    const link = document.createElement('a');
    link.href = '/alex-hardman-resume.pdf';
    link.download = 'Alex_Hardman_Resume_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: 'Download completed!' },
    ]);
  }

  private clearTerminal(): void {
    // Preserve the initial boot sequence content when clearing
    const bootSequenceContent = [
      {
        type: 'output' as const,
        content: 'halex9000 boot sequence initiated…',
      },
      { type: 'output' as const, content: '' },
      {
        type: 'output' as const,
        content: 'Loading core modules: resume, projects, ego, flair…',
      },
      {
        type: 'output' as const,
        content: 'Loading bigalexenergy… ██████████████ 100%',
      },
      { type: 'output' as const, content: '' },
      {
        type: 'output' as const,
        content: 'CLI ready. Type help for available commands.',
      },
      { type: 'output' as const, content: '' },
    ];
    this.setOutput(() => bootSequenceContent);
  }

  private exitCLI(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: 'Shutting down halex9000 CLI...' },
    ]);
    setTimeout(() => {
      this.router.push('/');
    }, 1000);
  }

  private handleSudo(): void {
    const denialMessages = [
      'Denied. Only I am root here.',
      'Access denied. This shell already belongs to me.',
      'sudo privileges are reserved for halex9000.',
      'Permission denied. I am the only root in this terminal.',
      'Access denied. This is my domain.',
      'sudo: command not found (because I said so).',
      'Permission denied. The terminal belongs to halex9000.',
    ];

    const randomMessage =
      denialMessages[Math.floor(Math.random() * denialMessages.length)];
    this.setOutput(prev => [
      ...prev,
      { type: 'error', content: randomMessage },
    ]);
  }

  private showWhoami(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: 'Name: Alex Hardman' },
      { type: 'output', content: 'Alias: halex9000 | Big Alex Energy' },
      {
        type: 'output',
        content: 'Role: Engineering Leader & Platform Architect',
      },
      { type: 'output', content: '' },
      { type: 'output', content: 'Known for:' },
      {
        type: 'output',
        content: '• Building systems that scale — fast, clean, and confidently',
      },
      {
        type: 'output',
        content: '• Architecting enterprise-grade serverless backbones',
      },
      {
        type: 'output',
        content: '• Leading high-velocity teams that ship with intention',
      },
      { type: 'output', content: '' },
      { type: 'output', content: 'Experience:' },
      { type: 'output', content: '• Liberty Mutual - enterprise-scale rigor' },
      { type: 'output', content: '• Capital One - precision systems thinking' },
      { type: 'output', content: '• Klaviyo - startup speed, platform vision' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Speaker at re:Invent & QCon' },
      { type: 'output', content: 'Patented inventor & AI hackathon champ' },
      { type: 'output', content: '' },
      { type: 'output', content: "Try 'resume', 'projects', or 'clear'" },
    ]);
  }

  private showDate(): void {
    const now = new Date();
    const dateStr = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
    this.setOutput(prev => [...prev, { type: 'output', content: dateStr }]);
  }

  private showUname(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: 'halex9000-cli v1.0.0' },
    ]);
  }

  private showUptime(): void {
    const uptime = Math.floor(Date.now() / 1000) % 86400; // Fake uptime in seconds
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: `up ${hours}h ${minutes}m ${seconds}s` },
    ]);
  }

  private handleThemeChange(themeName: string): void {
    const themes = {
      matrix: 'Green-on-black (Matrix style)',
      cyber: 'Cyan-on-black (Cyberpunk)',
      neon: 'Pink-on-black (Neon)',
      amber: 'Amber-on-black (Classic)',
      blue: 'Blue-on-black (Terminal)',
      red: 'Red-on-black (Alert)',
      purple: 'Purple-on-black (Royal)',
      white: 'White-on-black (Clean)',
      crt: 'Green-on-black (CRT Monitor)',
      powershell: 'White-on-navy (PowerShell)',
      atari: 'Cyan/Magenta (Atari 8-bit)',
      list: 'Show available themes',
    };

    if (!themeName) {
      this.setOutput(prev => [
        ...prev,
        { type: 'error', content: 'Usage: theme [name] or theme list' },
      ]);
      return;
    }

    if (themeName === 'list') {
      const themeList = Object.entries(themes)
        .filter(([key]) => key !== 'list')
        .map(([key, desc]) => `  ${key.padEnd(10)} - ${desc}`)
        .join('\n');
      this.setOutput(prev => [
        ...prev,
        {
          type: 'output',
          content: `Available Themes:\n${themeList}\n\nUsage: theme [name]`,
        },
      ]);
      return;
    }

    if (themes[themeName as keyof typeof themes]) {
      if (this.setTheme) {
        this.setTheme(themeName as Theme);
        this.setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: `Theme changed to: ${themes[themeName as keyof typeof themes]}`,
          },
        ]);
      } else {
        this.setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: `Theme changed to: ${themes[themeName as keyof typeof themes]}\nNote: Theme context not available.`,
          },
        ]);
      }
    } else {
      this.setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `Theme not found: ${themeName}. Use 'theme list' to see available themes.`,
        },
      ]);
    }
  }

  private handleMatrixConfig(parameter: string, value: string): void {
    if (!parameter) {
      this.setOutput(prev => [
        ...prev,
        {
          type: 'output',
          content: `Matrix Rain Configuration
========================

Available commands:
  matrix speed [1-10]  Set Matrix rain speed (1=slowest, 10=fastest)
  matrix size [1-10]   Set Matrix rain size (1=smallest, 10=largest)
  matrix reset         Reset Matrix rain to default settings

Examples:
  matrix speed 5       # Set speed to medium
  matrix size 8        # Set size to large
  matrix reset         # Reset to defaults

Note: Matrix rain only appears when theme is set to 'matrix'`,
        },
      ]);
      return;
    }

    if (parameter === 'reset') {
      if (this.setMatrixConfig) {
        this.setMatrixConfig({ speed: 0.125, size: 32 });
        this.setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content:
              'Matrix rain reset to default settings (speed: 0.125, size: 32px)',
          },
        ]);
      } else {
        this.setOutput(prev => [
          ...prev,
          {
            type: 'error',
            content:
              'Matrix configuration not available. Make sure you are on the matrix theme.',
          },
        ]);
      }
      return;
    }

    if (!value) {
      this.setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `Usage: matrix ${parameter} [1-10]`,
        },
      ]);
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1 || numValue > 10) {
      this.setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: 'Value must be a number between 1 and 10',
        },
      ]);
      return;
    }

    if (parameter === 'speed') {
      // Convert 1-10 scale to actual speed values (0.05 to 0.5)
      const speed = 0.05 + (numValue - 1) * 0.05;
      if (this.setMatrixConfig) {
        this.setMatrixConfig({ speed });
        this.setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: `Matrix rain speed set to ${numValue}/10 (${speed.toFixed(3)})`,
          },
        ]);
      } else {
        this.setOutput(prev => [
          ...prev,
          {
            type: 'error',
            content:
              'Matrix configuration not available. Make sure you are on the matrix theme.',
          },
        ]);
      }
    } else if (parameter === 'size') {
      // Convert 1-10 scale to actual size values (16px to 48px)
      const size = 16 + (numValue - 1) * 3.5;
      if (this.setMatrixConfig) {
        this.setMatrixConfig({ size });
        this.setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: `Matrix rain size set to ${numValue}/10 (${Math.round(size)}px)`,
          },
        ]);
      } else {
        this.setOutput(prev => [
          ...prev,
          {
            type: 'error',
            content:
              'Matrix configuration not available. Make sure you are on the matrix theme.',
          },
        ]);
      }
    } else {
      this.setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `Unknown parameter: ${parameter}. Use 'speed' or 'size'`,
        },
      ]);
    }
  }

  private handleBoostCommand(velocity: string): void {
    if (velocity === 'velocity' || velocity === '--force') {
      this.setOutput(prev => [
        ...prev,
        { type: 'output', content: '🚀 BOOST VELOCITY INITIATED 🚀' },
        { type: 'output', content: '' },
        { type: 'output', content: '// Big Alex Energy™ levels: CRITICAL' },
        { type: 'output', content: '// System status: OVERDRIVE' },
        {
          type: 'output',
          content: '// Warning: Excessive awesomeness detected',
        },
        { type: 'output', content: '// Proceeding with maximum confidence...' },
        { type: 'output', content: '' },
        {
          type: 'output',
          content: 'BOOST COMPLETE. You are now operating at 9001% capacity.',
        },
        {
          type: 'output',
          content:
            'Side effects may include: Unstoppable momentum, spontaneous innovation, and world domination.',
        },
      ]);
    } else {
      this.setOutput(prev => [
        ...prev,
        { type: 'error', content: 'Usage: boost velocity --force' },
        {
          type: 'output',
          content:
            'Hint: Try "boost velocity --force" to activate Big Alex Energy™',
        },
      ]);
    }
  }

  private handleDestinyCommand(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: '🔮 DESTINY QUERY INITIATED 🔮' },
      { type: 'output', content: '' },
      {
        type: 'output',
        content: '// Querying the universe for your destiny...',
      },
      { type: 'output', content: '// Scanning for patterns in the chaos...' },
      { type: 'output', content: '// Analyzing Big Alex Energy™ levels...' },
      { type: 'output', content: '' },
      {
        type: 'output',
        content: 'DESTINY FOUND: You are destined for greatness.',
      },
      {
        type: 'output',
        content: 'The universe has spoken: "Proceed with confidence."',
      },
      {
        type: 'output',
        content: 'Your path is clear: Build, innovate, dominate.',
      },
      { type: 'output', content: '' },
      {
        type: 'output',
        content: '// Status: Destiny accepted. Proceeding with excellence.',
      },
    ]);
  }

  private handleVibesCommand(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: '🎵 VIBE CHECK INITIATED 🎵' },
      { type: 'output', content: '' },
      { type: 'output', content: '// Analyzing current vibes...' },
      { type: 'output', content: '// Checking for immaculate energy...' },
      { type: 'output', content: '// Measuring Big Alex Energy™ levels...' },
      { type: 'output', content: '' },
      { type: 'output', content: 'VIBE STATUS: IMMACULATE ✅' },
      { type: 'output', content: 'Energy levels: MAXIMUM' },
      { type: 'output', content: 'Confidence: UNBREAKABLE' },
      { type: 'output', content: 'Awesomeness: OVERFLOWING' },
      { type: 'output', content: '' },
      { type: 'output', content: '// Recommendation: Continue being awesome.' },
      {
        type: 'output',
        content: '// Warning: Vibes too good. May cause spontaneous success.',
      },
    ]);
  }

  private handleHalexCommand(): void {
    this.setOutput(prev => [
      ...prev,
      { type: 'output', content: '🧠 HALEX PROTOCOL ACTIVATED 🧠' },
      { type: 'output', content: '' },
      { type: 'output', content: '// Initializing Big Alex Energy™...' },
      { type: 'output', content: '// Loading confidence modules...' },
      { type: 'output', content: '// Activating innovation protocols...' },
      { type: 'output', content: '' },
      { type: 'output', content: 'HALEX9000.exe loaded successfully.' },
      {
        type: 'output',
        content: 'Side effects: Unstoppable momentum, pure excellence.',
      },
      { type: 'output', content: '' },
      {
        type: 'output',
        content: '// Welcome to the halex shell. Enjoy your stay.',
      },
      {
        type: 'output',
        content: "// You didn't choose this terminal. It chose you.",
      },
      {
        type: 'output',
        content: '// Big Alex Protocol engaged. Initiating flex sequence...',
      },
      { type: 'output', content: '' },
      { type: 'output', content: 'STATUS: Ready to dominate. All systems go.' },
    ]);
  }
}
