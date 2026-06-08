# geeksforgeeks-linux-intro

Source: https://www.geeksforgeeks.org/introduction-to-linux-operating-system/

Courses
Tutorials
Practice
Jobs
Linux-Unix
Interview Questions
Shell Scripting
Kali
Ubuntu
Red Hat
CentOS
Docker
Kubernetes
Python
Java
Share Your Experiences
Basics
Introduction to Linux
Linux Distributions
Architecture of Linux
Installing Linux Using a Virtual Machine
Basic Linux Commands
Linux Commands
File System & Management
Linux File System
Linux File Hierarchy Structure
Linux Directory Structure
File Management in Linux
Directory Management in Linux
Permissions & Ownership
User Management in Linux
Group Management in Linux
Linux Permissions
File Permission and Ownership Commands in Linux
chmod Command in Linux
chown Command in Linux
Process & Networking
ps Command in Linux
top Command in Linux
kill Command in Linux
ifconfig Command in Linux
ip Command in Linux
Ping Command in Linux
Netstat command in Linux
Services & System Management
Boot Process with Systemd in Linux
Systemd and its Components in Linux
Controling systemd Services on Remote Linux Server
Managing System Services in Linux - systemctl Command
scp Command for Secure File and Folder Transfer
Shell Scripting & Bash Scripting
Introduction to Linux Shell and Shell Scripting
Understanding Terminal, Console, Shell and Kernel
Writing and executing shell scripts
Shell Scripting - Shell Variables in Linux
Bash Scripting Fundamentals
Bash Scripting - Working of Bash Scripting
Bash Script - Define Bash Variables and its types
Bash Script - Difference between Bash Script and Shell Script
Bash Scripting - Functions
Courses
DSA and System Design Course
DevOps Engineering Course
MERN Full Stack Course
Summer SkillUp
Explore
Introduction to Linux
Last Updated :
2 May, 2026
Linux is based on the UNIX operating system. UNIX is a powerful, multi-user, multitasking operating system originally developed in the 1970s at AT&T Bell Labs. It laid the foundation for many modern operating systems, including Linux.
Linux is free and open-source, accessible to everyone.
This promotes global collaboration and innovation.
Linux offers efficient performance and strong security.
It works well across many devices and industries.
Linux combines a wide range of open-source tools and components to form a complete computing environment. These components include file systems, user interfaces, system utilities, and application programs, all working together to manage hardware and enable users to interact with their computer systems.
Distributions in Linux
Linux distribution
is a complete operating system built around the Linux kernel, combined with system software, libraries, and applications. It provides users with everything needed to run Linux on different types of devices.
A distribution includes the Linux kernel, system libraries, and essential software tools.
Different distributions are designed for different purposes, such as desktops, servers, and embedded systems.
Each distro comes with its own package manager, desktop environment, and default applications.
Users can choose distributions based on performance, stability, ease of use, or customization level.
Popular Linux Distributions
Around 600 + Linux Distributions are available, and some of the popular Linux distributions are:
Ubuntu:
Ubuntu
is a user-friendly Linux distribution mainly used for beginners, desktops, servers, and cloud computing.
Debian
- A stable and reliable Linux distribution,
Debian
is widely used for servers and serves as the base for many other distributions.
Kali Linux
- A security-focused Linux distribution used for penetration testing, ethical hacking, and digital forensics,
Kali Linux
MX Linux
MX Linux
is a lightweight and fast Linux distribution designed for older hardware with good stability and performance.
Manjaro
- A user-friendly Arch-based Linux distribution used for rolling updates and access to the latest software,
Manjaro.
Linux Mint -
A beginner-friendly Linux distribution,
Linux Mint
, is designed to be simple and familiar for Windows users.
Solus
Solus
is a modern, independent Linux distribution focused on desktop performance and simplicity.
Fedora
- A cutting-edge Linux distribution used by developers to work with the latest technologies,
Fedora
openSUSE
- A powerful Linux distribution,
openSUSE
, is used for system administration, development, and enterprise environments.
Deepin
Deepin
is a visually attractive Linux distribution focused on ease of use and a polished desktop experience.
Importance of Linux
Linux is a free, open-source operating system known for its flexibility, stability, and strong security. It is widely used in personal computing, server environments, and enterprise systems because of its performance and customization capabilities.
Offers high security and stability, making it ideal for servers and development work.
Fully open-source and free to use, modify, and distribute.
Highly flexible and customizable to suit different user and industry needs.
Supported by a large global community and a vast software ecosystem.
Architecture of Linux
Linux architecture
refers to the layered structure of the Linux operating system that defines how its components - such as the kernel, shell, system libraries, and hardware - interact with each other to manage system resources and execute user programs efficiently. It has the following components:
Layers of a working computer
1. Kernel
kernel
is the core of the Linux operating system that manages hardware resources and controls communication between software and hardware.
Handles process management, memory, and device control.
Prevents conflicts between multiple running programs.
Types of Kernels: Monolithic, Microkernel, Hybrid, Exokernel
2. System Libraries
System libraries provide essential functions that allow applications to interact with the kernel without needing to access it directly.
Contain reusable pre-written code for common system operations.
Act as an interface between applications and the Linux kernel.
3. Shell
shell
is the command-line interface that allows users to communicate with the operating system by entering commands.
Interprets and executes user commands.
Acts as a bridge between user actions and kernel processing.
4. Hardware Layer
The hardware layer consists of physical components that execute commands and provide system resources.
Includes CPU, RAM, storage, and input/output devices.
Communicates with the OS using device drivers and kernel services.
5. System Utilities
System utilities are built-in tools that help users manage, configure, and maintain the operating system.
Used for tasks like software installation, user management, and monitoring.
Simplify system administration processes for both beginners and administrators.
Applications of Linux Operating System
The Linux operating system is widely used across multiple domains due to its flexibility, strong security, and open-source nature. It supports a wide range of applications across different industries, as outlined below.
uses os linux OS
1. Servers and Hosting
Powers most web servers, cloud platforms, and data centers worldwide.
Offers high stability, security, and uptime for critical services.
2. Development
Provides powerful tools and environments for coding, testing, and debugging.
Supports multiple programming languages and frameworks.
3. Desktop and Personal Use
Offers customizable and secure desktop environments.
Supports daily computing tasks like browsing, office work, and media usage.
4. Cybersecurity
Widely used for ethical hacking and penetration testing (e.g., Kali Linux).
Provides advanced tools for threat detection and security analysis.
5. Embedded Systems
Runs efficiently on low-resource devices like IoT and routers.
Supports real-time processing and hardware-level control.
6. Supercomputers
Used in high-performance computing environments worldwide.
Handles massive scientific calculations and simulations efficiently.
7. Education
Helps students learn programming, networking, and system administration.
Free and open-source, making it ideal for academic institutions.
Selecting a Linux Distribution Based on Your Requirements
Selecting a Linux distribution
depends on your personal needs, experience level, and the purpose for which you want to use the operating system. Different distributions are designed for tasks like development, security, servers, or everyday desktop use, offering flexibility and customization for every type of user.
For Beginners
Ubuntu provides an easy-to-use interface with strong community support.
Linux Mint offers a Windows-like experience, making it ideal for first-time users.
For Advanced Users
Arch Linux is known for its minimalism and high level of customization.
Gentoo is a source-based distribution that allows full control over system configuration but requires advanced knowledge.
For Developers
Fedora provides the latest development tools and technologies.
Debian is highly stable and suitable for production environments, though it may not always include the latest software versions.
For Servers
Ubuntu Server is widely used due to ease of use, strong community support, and popularity in cloud environments (AWS, Azure).
Rocky Linux and AlmaLinux provide enterprise-level stability and are compatible alternatives to Red Hat Enterprise Linux (RHEL).
For Lightweight Systems
Lubuntu is optimized for low-resource systems and older hardware.
Puppy Linux is extremely lightweight and can run on very old computers.
For Security Professionals
Kali Linux is designed for penetration testing and ethical hacking with pre-installed security tools.
It is widely used for cybersecurity training, vulnerability assessment, and digital forensics.
For DevOps and Cloud Engineers
Ubuntu Server is commonly used in cloud and DevOps environments.
Fedora and RHEL-based systems are preferred for enterprise and container-based workflows.
Installing Linux
Selecting an Ubuntu, Fedora, or Linux Mint distribution which suits your needs is the initial step in the straightforward procedure for installing Linux.
Download the ISO file from the official Linux distribution website.
Create a bootable USB using Rufus (Windows) or Balena Etcher (Linux/macOS).
Insert the USB drive and restart your computer.
Enter BIOS/UEFI settings and set the USB as the first boot device.
Boot from the USB and start the Linux installation process.
Select language, partition disk, and create a user account.
Complete the installation, remove the USB, and reboot the system.
Follow the link:
Installing Linux Using a Virtual Machine
Installing Software on Linux
On Linux, installing software is simple.
For Debian-based systems (like Ubuntu), use package managers like
sudo apt install package_name
For Fedora, use
sudo dnf install package_name
Software centers are another source for a graphical application installation and searching interface.
For Python installation specifics, detailed guidance can be found in the provided
link
Linux Commands
Basic tools for utilizing the command line interface (CLI) to communicate with the operating system are Linux commands. Commonly used commands like:
: Lists contents of directories
: Changes the current directory
: Displays the current directory path
: Used to copy, move, and delete files respectively
free
: Shows memory usage
: Checks disk space usage
: Monitors running processes
ping
: Help monitor and troubleshoot network connections
Knowing and using these commands effectively improves productivity. For clear understanding about the Linux commands refer to this
link.
History of Linux
The history of Linux shows its growth from a personal project into the backbone of modern computing systems worldwide.
Phase 1: Early Development (1991)
Linux was created by Linus Torvalds in 1991 as a free and open-source operating system kernel.
It was inspired by
UNIX
and the MINIX operating system.
Phase 2: Community Development
Developers from around the world contributed to improving the Linux kernel.
This led to the development of complete Linux systems called Linux distributions.
Phase 3: Growth and Adoption
Linux started being used in servers, desktops, and enterprise environments.
Major distributions like Debian, Red Hat, and Ubuntu increased its popularity.
Phase 4: Present-Day Linux Ecosystem
Today, Linux powers servers, supercomputers, smartphones (Android), cloud systems, and embedded devices.
It is valued for its security, stability, and open-source nature.
Comment
Article Tags:
Article Tags:
Linux-Unix
