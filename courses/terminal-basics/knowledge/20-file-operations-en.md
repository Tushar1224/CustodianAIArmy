# File Operations

## Creating Files and Directories

```bash
touch file.txt          # create an empty file
mkdir new_folder        # create a directory
mkdir -p a/b/c          # create nested directories
```

## Viewing File Contents

```bash
cat file.txt            # print entire file
less file.txt           # view page by page (press q to quit)
head file.txt           # first 10 lines
tail file.txt           # last 10 lines
tail -f file.txt        # follow file (useful for logs)
```

## Copying, Moving, and Renaming

```bash
cp source.txt dest.txt               # copy file
cp -r source_folder dest_folder      # copy directory recursively
mv old.txt new.txt                   # rename
mv file.txt ~/Documents/             # move file
```

## Deleting

```bash
rm file.txt              # delete file
rm -r folder             # delete directory and contents
rm -rf folder            # force delete (careful!)
```

> **Warning:** `rm -rf` is powerful and dangerous. There is no trash bin in the terminal — deleted files are gone for good.

## Searching Within Files

```bash
grep "pattern" file.txt           # find lines matching pattern
grep -r "pattern" .              # search recursively
grep -i "pattern" file.txt       # case-insensitive search
```

## Exercise

1. Create a directory called `practice`
2. Inside it, create a file called `hello.txt`
3. Write some text to the file using `echo "Hello World" > hello.txt`
4. Copy the file to `backup.txt`
5. Rename `backup.txt` to `greeting.txt`
6. List the contents of the directory
7. Delete both files and the directory
