# Tutorialspoint Unix Files

Source: https://www.tutorialspoint.com/unix/unix-file-management.htm

Unix / Linux - Home
Unix / Linux - What is Linux?
Unix / Linux - Getting Started
Unix / Linux - File Management
Unix / Linux - Directories
Unix / Linux - File Permission
Unix / Linux - Environment
Unix / Linux - Basic Utilities
Unix / Linux - Pipes & Filters
Unix / Linux - Processes
Unix / Linux - Communication
Unix / Linux - The vi Editor
Unix / Linux - Shell Scripting
Unix / Linux - What is Shell?
Unix / Linux - Using Variables
Unix / Linux - Special Variables
Unix / Linux - Using Arrays
Unix / Linux - Basic Operators
Unix / Linux - Decision Making
Unix / Linux - Shell Loops
Unix / Linux - Loop Control
Unix / Linux - Shell Substitutions
Unix / Linux - Quoting Mechanisms
Unix / Linux - IO Redirections
Unix / Linux - Shell Functions
Unix / Linux - Manpage Help
Advanced Unix / Linux
Unix / Linux - Standard I/O Streams
Unix / Linux - File Links
Unix / Linux - Regular Expressions
Unix / Linux - File System Basics
Unix / Linux - User Administration
Unix / Linux - System Performance
Unix / Linux - System Logging
Unix / Linux - Signals and Traps
Unix / Linux Useful Resources
Unix / Linux - Questions & Answers
Unix / Linux - Useful Commands
Unix / Linux - Quick Guide
Unix / Linux - Builtin Functions
Unix / Linux - System Calls
Unix / Linux - Commands List
Unix / Linux - Useful Resources
Unix / Linux - Discussion
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
Linux - File Management
Previous
Quiz
Next
What is File Management in Linux?
When we work with Linux, we need many text and binary files, for example all the Linux programs come in binary files where as their source code come in text files. As a user of the Operating System, we also create many files to manage our day to day activities. User generated files include words files, excel files, power point presentations and many other text files.
In this chapter, we will discuss in detail about file management in Linux/Unix. All the data in Linux is organized into files and all these files are organized into different directories. These directories are organized into a tree-like structure called the filesystem.
File System is responsible for storing information on the hard drives and later retrieving & updating it. Examples of Linux File Systems are FAT16, FAT32, NTFS, Ext2, Ext3, Ext4 etc.
Types of Files in Linux
As such everything in Linux is a
file
. So when you work with Linux, one way or another, you spend most of your time working with files. This tutorial will help you understand how to create and remove files, copy and rename them, create links to them, etc.
In Linux, there are three basic types of files −
Ordinary Files
− An ordinary file is a file on the system that contains data, text, or program instructions. In this tutorial, you look at working with ordinary files.
Directories
− Directories store both special and ordinary files. For users familiar with Windows or Mac OS, Unix directories are equivalent to folders.
Special Files
− Some special files provide access to hardware such as hard drives, CD-ROM drives, modems, and Ethernet adapters. Other special files are similar to aliases or shortcuts and enable you to access a single file using different names.
File Management Commands in Linux
Let's study the most important Linux commands to list available files,  create and remove files, copy and rename files, create links to files, etc.
Listing Files
To list all the files and directories stored in the current directory on a Linux system, use the following command −
$ ls
Here is the sample output of the above command −
bin        hosts  lib     res.03
ch07       hw1    pub     test_results
ch07.bak   hw2    res.01  users
docs       hw3    res.02  work
The command
supports the
option which would help you to get more information about the listed files −
$ls -l
total 1962188
drwxrwxr-x  2 amrood amrood      4096 Dec 25 09:59 uml
-rw-rw-r--  1 amrood amrood      5341 Dec 25 08:38 uml.jpg
drwxr-xr-x  2 amrood amrood      4096 Feb 15  2006 univ
drwxr-xr-x  2 root   root        4096 Dec  9  2007 urlspedia
-rw-r--r--  1 root   root      276480 Dec  9  2007 urlspedia.tar
drwxr-xr-x  8 root   root        4096 Nov 25  2007 usr
drwxr-xr-x  2    200    300      4096 Nov 25  2007 webthumb-1.01
-rwxr-xr-x  1 root   root        3192 Nov 25  2007 webthumb.php
-rw-rw-r--  1 amrood amrood     20480 Nov 25  2007 webthumb.tar
-rw-rw-r--  1 amrood amrood      5654 Aug  9  2007 yourfile.mid
-rw-rw-r--  1 amrood amrood    166255 Aug  9  2007 yourfile.swf
drwxr-xr-x 11 amrood amrood      4096 May 29  2007 zlib-1.2.3
Here is the information about all the listed columns −
First Column
− Represents the file type and the permission given on the file. Below is the description of all type of files.
Second Column
− Represents the number of memory blocks taken by the file or directory.
Third Column
− Represents the owner of the file. This is the Linux user who created this file.
Fourth Column
− Represents the group of the owner. Every Linux user will have an associated group.
Fifth Column
− Represents the file size in bytes.
Sixth Column
− Represents the date and the time when this file was created or modified for the last time.
Seventh Column
− Represents the file or the directory name.
In the
ls -l
listing example, every file line begins with a
, or
. These characters indicate the type of the file that's listed.
Prefix
Description
Regular file
, such as an ASCII text file, binary executable, or hard link.
Block special file
. Block input/output device file such as a physical hard drive.
Character special file
. Raw input/output device file such as a physical hard drive.
Directory
which contains a listing of other files and directories.
Symbolic link file
. Links on any regular file.
Named pipe
. A mechanism for interprocess communications.
Socket
which is used for interprocess communication.
Metacharacters in Linux
Linux Metacharacters have a special meaning in Unix. For example,
are metacharacters. We use
to match 0 or more characters, a question mark (
) matches with a single character.
For Example −
$ls ch*.doc
Displays all the files, the names of which start with
and end with
.doc
ch01-1.doc   ch010.doc  ch02.doc    ch03-2.doc 
ch04-1.doc   ch040.doc  ch05.doc    ch06-2.doc
ch01-2.doc ch02-1.doc c
Here,
works as meta character which matches with any character. If you want to display all the files ending with just
.doc
, then you can use the following command −
$ls *.doc
Hidden Files in Linux
Linux and Unix have some hidden files which are invisible from the users. These files name starts with a dot or the period character (.). Linux programs (including the shell) use most of these files to store system configuration information.
Some common examples of the hidden files include the files −
File
Description
.profile
The Bourne shell ( sh) initialization script
.kshrc
The Korn shell ( ksh) initialization script
.cshrc
The C shell ( csh) initialization script
.rhosts
The remote shell configuration file
To list these hidden (or invisible files), we must specify the
option with
command −
$ ls -a
.         .profile       docs     lib     test_results
..        .rhosts        hosts    pub     users
.emacs    bin            hw1      res.01  work
.exrc     ch07           hw2      res.02
.kshrc    ch07.bak       hw3      res.03
Single dot (.)
− This represents the current directory.
Double dot (..)
− This represents the parent directory.
Creating Files in Linux
There are manu file editors which come pre-installed on Linux Systems. My favorite is
or in short
editor which I use to create and update different text files on my Ubuntu Linux System.
So let's use the
editor to create ordinary files on any Linux system. You simply need to give the following command −
$ vi filename
The above command will open a file with the given filename. Now, press the key
to come into the edit mode. Once you are in the edit mode, you can start writing your content in the file.
Let's write the following content in our text file −
This is a text file in Linux....I created it using vi text editor.....
I'm going to save this content in this file.
Once you are done with writing your content in the file, follow these steps −
Press the key
to come out of the edit mode.
Press two keys
Shift &plus; ZZ
together to come out of the file completely.
You will now have a file created with
filename
in the current directory.
$ vi filename
Editing Files in Linux
You can edit an existing file using the
editor. We will discuss in short how to open an existing file −
$ vi filename
Once the file is opened, you can come in the edit mode by pressing the key
and then you can proceed by editing the file. If you want to move here and there inside a file, then first you need to come out of the edit mode by pressing the key
. After this, you can use the following keys to move inside a file −
key to move to the right side.
key to move to the left side.
key to move upside in the file.
key to move downside in the file.
So using the above keys, you can position your cursor wherever you want to edit. Once you are positioned, then you can use the
key to come in the edit mode. Once you are done with the editing in your file, press
and finally two keys
Shift &plus; ZZ
together to come out of the file completely.
Display Content of a File
You can use the
command to see the content of a file. Following is a simple example to see the content of the above created file −
$ cat filename
This is a text file in Linux....I created it using vi text editor.....
I'm going to save this content in this file.
You can display the line numbers by using the
option along with the
command as follows −
$ cat -b filename
1    This is a text file in Linux....I created it using vi text editor.....
2    I'm going to save this content in this file.
Counting Words in a File
You can use the
command to get a count of the total number of lines, words, and characters contained in a file. Following is a simple example to see the information about the file created above −
$ wc filename
2  22 116 filename
Here is the detail of all the four columns −
First Column
− Represents the total number of lines in the file.
Second Column
− Represents the total number of words in the file.
Third Column
− Represents the total number of bytes in the file. This is the actual size of the file.
Fourth Column
− Represents the file name.
You can give multiple files and get information about those files at a time. Following is simple syntax −
$ wc filename1 filename2 filename3
Copying Files in Linux
To make a copy of an existing file use the
Linux command. The basic syntax of the command is −
$ cp source_file destination_file
Following is the example to create a copy of the existing file
filename
$ cp filename copyfile
You will now find one more file
copyfile
in your current directory. This file will exactly be the same as the original file
filename
Renaming Files in Linux
To change the name of an existing file, use the
Linux command. Following is the basic syntax −
$ mv old_file new_file
The following program will rename the existing file
filename
newfile
$ mv filename newfile
command will move the existing file completely into the new file. In this case, you will find only
newfile
in your current directory.
Deleting Files in Linux
To delete an existing file from Linux file system, use the
command. Following is the basic syntax −
$ rm filename
Caution
− A file may contain useful information. It is always recommended to be careful while using this
Delete
command. It is better to use the
option along with
command.
Following is the example which shows how to completely remove the existing file
filename
$ rm filename
You can remove multiple files at a time with the command given below −
$ rm filename1 filename2 filename3
Creating Links on Files
Linux provides link mechanism to access a file from another location. You can say these links are alternate names for the existing files. These links could be symbolic links or hard links.
Following is the command  to create a symbolic link on filename:
$ ln -s filename symlink
Following is the command to create hard link on an existing file:
$ ln filename hardlink
Now you can check your created links:
$ ls -l
total 8
-rw-r--r-- 2 root root 132 May  1 07:18 filename
-rw-r--r-- 2 root root 132 May  1 07:18 hardlink
lrwxrwxrwx 1 root root   8 May  1 07:17 symlink -> filename
After creating symbolic or hard link, you can access original file using these links. You can edit these files using links but if you delete a link file then your original file will remain undeleted and unchanged.
Print Page
Previous
Quiz
Next
Advertisements
