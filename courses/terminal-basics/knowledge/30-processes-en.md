# Managing Processes

## Viewing Running Processes

```bash
ps                    # processes in current shell
ps aux                # all processes (detailed)
top                   # real-time process viewer (press q to quit)
htop                  # improved top (if installed)
```

## Understanding Process Output

The `ps aux` command shows:
- **USER** — who owns the process
- **PID** — process ID
- **%CPU / %MEM** — resource usage
- **VSZ / RSS** — virtual and resident memory
- **STAT** — process state (R=running, S=sleeping, Z=zombie)
- **COMMAND** — the command that started it

## Stopping Processes

```bash
kill PID              # gracefully terminate process
kill -9 PID           # force kill (SIGKILL)
killall process_name  # kill all processes by name
```

Press `Ctrl + C` in the terminal to interrupt the currently running foreground process.

## Background and Foreground

```bash
command &             # start process in background
Ctrl + Z              # suspend current process
bg                    # resume suspended process in background
fg                    # bring background process to foreground
jobs                  # list background jobs
```

## Exercise

1. Run `sleep 60` in your terminal
2. Suspend it with `Ctrl + Z`
3. Type `bg` to resume it in the background
4. Type `jobs` to see it listed
5. Type `fg` to bring it back to foreground
6. Press `Ctrl + C` to kill it
7. Verify it's gone with `ps`
