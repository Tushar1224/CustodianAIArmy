# Navigating the File System

## Where Am I?

The first thing to learn is figuring out where you are:

```bash
pwd
```
Prints the current working directory.

## Listing Contents

```bash
ls
```
Lists files and directories in your current location.

Useful flags:
- `ls -l` — detailed listing with permissions, size, and date
- `ls -a` — show hidden files (those starting with dot)
- `ls -la` — combination of both

## Changing Directories

```bash
cd directory_name   # move into a directory
cd ..               # move up one level
cd ~                # go to home directory
cd -                # go to previous directory
cd /                # go to root
```

## Paths

- **Absolute paths** start from root: `/home/user/projects`
- **Relative paths** start from current location: `./projects` or `../other-folder`

## Tab Completion

Press `Tab` to auto-complete file and directory names. Press it twice to see all matches.

## Exercise

1. Open your terminal
2. Run `pwd` to see where you are
3. Run `ls -la` to see all files
4. Navigate to your home directory with `cd ~`
5. List what's there
