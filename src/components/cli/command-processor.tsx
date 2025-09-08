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
    private setTheme?: (theme: Theme) => void
  ) {}

  async processCommand(command: string, currentPath: string): Promise<void> {
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
      case 'man':
        this.showHelp();
        break;

      case 'ls':
        this.listContents(currentPath);
        break;

      case 'cd':
        this.changeDirectory(args[0] || '/', currentPath);
        break;

      case 'pwd':
        this.showCurrentDirectory(currentPath);
        break;

      case 'cat':
        this.catFile(args[0], currentPath);
        break;

      case 'resume':
        this.showResumeSummary();
        break;

      case 'download':
        if (args[0] === 'resume') {
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
        this.handleSudo(args.join(' '));
        break;

      case 'theme':
        this.handleThemeChange(args[0]);
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

help, man          Show this help message
ls                 List directory contents
cd [directory]     Change directory (supports .., ~, /)
pwd                Print working directory
cat [file]         Display file contents
resume             Show resume summary
download resume    Download resume PDF
clear              Clear terminal output
exit               Exit CLI mode

System Commands:
whoami             Show current user
date               Show current date/time
uname              Show system info
uptime             Show system uptime

Easter Eggs:
sudo [command]     Try it and see...
theme [name]       Change terminal theme
theme list         Show available themes

Examples:
  ls                    # List current directory
  cd projects           # Go to projects directory
  cd ..                 # Go up one directory
  cd ~                  # Go to home directory
  pwd                   # Show current path
  cat contact           # View contact information
  cat projects/viyo     # View Viyo project details
  resume                # Quick resume overview
  download resume       # Download PDF resume`;

    this.setOutput(prev => [...prev, { type: 'output', content: helpText }]);
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
    this.setOutput(() => []);
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

  private handleSudo(command: string): void {
    if (command.includes('cat resume')) {
      this.setOutput(prev => [
        ...prev,
        { type: 'output', content: "Nice try. You're already root." },
      ]);
    } else {
      this.setOutput(prev => [
        ...prev,
        { type: 'error', content: 'Permission denied. Try without sudo.' },
      ]);
    }
  }

  private showWhoami(): void {
    this.setOutput(prev => [...prev, { type: 'output', content: 'halex9000' }]);
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
      retro: 'Green-on-black (Matrix style)',
      matrix: 'Green-on-black (Matrix style)',
      hacker: 'Green-on-black (Matrix style)',
      cyber: 'Cyan-on-black (Cyberpunk)',
      neon: 'Pink-on-black (Neon)',
      amber: 'Amber-on-black (Classic)',
      blue: 'Blue-on-black (Terminal)',
      red: 'Red-on-black (Alert)',
      purple: 'Purple-on-black (Royal)',
      white: 'White-on-black (Clean)',
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
}
