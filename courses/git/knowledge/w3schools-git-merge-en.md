# w3schools-git-merge

Source: https://www.w3schools.com/git/git_merge.asp?remote=github

Menu
See More
Sign In
Get Certified
Upgrade
Academy
Spaces
Practice
Get Certified
Upgrade
Academy
Spaces
Practice
HTML
JAVASCRIPT
PYTHON
JAVA
HOW TO
W3.CSS
BOOTSTRAP
REACT
MYSQL
JQUERY
EXCEL
DJANGO
NUMPY
PANDAS
NODEJS
TYPESCRIPT
ANGULAR
ANGULARJS
POSTGRESQL
MONGODB
KOTLIN
SWIFT
SASS
GEN AI
SCIPY
CYBERSECURITY
DATA SCIENCE
INTRO TO PROGRAMMING
INTRO TO HTML & CSS
BASH
RUST
TOOLS
Tutorial
Git HOME
Git Intro
Git Install
Git Config
Git Get Started
Git New Files
Git Staging
Git Commit
Git Tagging
Git Stash
Git History
Git Help
Git Branch
Git Merge
Git Workflow
Git Best Practices
Git Glossary
and {{title}}
{{title}} Get Started
Git What is SSH?
{{title}} Add SSH
{{title}} Set Remote
{{title}} Edit Code
Pull from {{title}}
Push to {{title}}
{{title}} Branch
Pull Branch from {{title}}
Push Branch to {{title}}
GitHub Flow
{{title}} Pages
Git GUI Clients
Contribute
{{title}} Fork
Git Clone from {{title}}
{{title}} Send Pull Request
Undo
Git Revert
Git Reset
Git Amend
Git Rebase
Git Reflog
Git Recovery
Advanced
Git .gitignore
Git .gitattributes
Git Large File Storage (LFS)
Git Signing Commits/Tags
Git Cherrypick & Patch
Git Merge Conflicts
Git CI/CD
Git Hooks
Git Submodules
Git Remote Advanced
Cert
Git Certificate
Exercises
Git Exercises
Git Quiz
Git Syllabus
Git Study Plan
Merge
❮ Previous
Next ❯
Pulling to Keep up-to-date with Changes
When working as a team on a project, it is important that everyone can stay up to date.
Any time you start working on a project, you should get the most recent 
changes to your local copy.
With Git, you can do that with
pull
pull
is actually a combination of 2 different commands:
fetch
merge
Lets take a closer look into how
fetch
merge
, and
pull
works.
Git Fetch
fetch
gets all the change history of a tracked branch/repo.
Now we are going to create a
README.md
file for our repository on GitHub. It is recommended that all repositories have a readme file, and that it describes the repository.
commit
Head back to your local Git, and
fetch
updates:
Example
git fetch origin
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 806 bytes | 4.00 KiB/s, done.
From https://github.com/w3schools-test/hello-world
   9ab23f8..a7cdd4b  main       -> origin/main
Now that we have the recent
changes
, we can check our
status
Example
git status
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)
nothing to commit, working tree clean
We are behind the
origin/main
by 1
commit
. That should be the included
README.md
, but lets double check by viewing the
Example
git log origin/main
commit a7cdd4bf8f851b8de08d8b26be4ec82b371f4b48 (origin/main)
Author: w3schools-test <77673807+w3schools-test@users.noreply.github.com>
Date:   Thu Mar 25 11:41:24 2021 +0100
    Created Readme.md
commit 9ab23f8e199880def2dfa775ae4868839d999747 (HEAD -> main)
Merge: 4068962 aad81e1
Author: w3schools-test <77673807+w3schools-test@users.noreply.github.com>
Date:   Tue Mar 23 15:15:21 2021 +0100
    Merge pull request #2 from w3schools-test/new-style
    New style looks good
That looks as expected, but we can also verify by showing the differences 
between our local
main
origin/main
Example
git diff main...origin/main
diff --git a/README.md b/README.md
new file mode 100644
index 0000000..f43f0fc
--- /dev/null
+++ b/README.md
@@ -0,0 +1,3 @@
+# hello-world
+Hello World repository for Git tutorial
+This is an example repository for the Git tutoial on https://www.w3schools.com
That looks precisely as expected! Now we can safely
merge
Git Merge
merge
combines the current branch, with a specified branch.
We have confirmed that the updates are as expected, and we can merge our current branch (
main
), with
origin/main
Example
git merge origin/main
Updating 9ab23f8..a7cdd4b
Fast-forward
 README.md | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
Lets check our
status
again to confirm we are up to date:
Example
git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
There! Your local git is up to date, and you can start working on your project!
Git Pull
But what if you just want to update your local repo, without going through 
all those steps?
pull
is a combination of
fetch
merge
. It is used to pull all changes from 
a remote repository, into the branch you are working on.
Lets make another change to the Readme.md file on GitHub.
pull
to update our local Git:
Example
git pull origin
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 794 bytes | 1024 bytes/s, done.
From https://github.com/w3schools-test/hello-world
   a7cdd4b..ab6b4ed  main       -> origin/main
Updating a7cdd4b..ab6b4ed
Fast-forward
 README.md | 2 ++
 1 file changed, 2 insertions(+)
That is how you keep your local Git up to date from a remote repository. In the next chapter we will look closer at how
pull
pull requests
work on GitHub.
❮ Previous
Next ❯
Sign in to track progress
COLOR PICKER
REMOVE ADS
PLUS
SPACES
GET CERTIFIED
FOR TEACHERS
BOOTCAMPS
CONTACT US
Contact Sales
If you want to use W3Schools services as an educational institution, team or enterprise, send us an e-mail:
sales@w3schools.com
Report Error
If you want to report an error, or if you want to make a suggestion, send us an e-mail:
help@w3schools.com
Top Tutorials
HTML Tutorial
CSS Tutorial
JavaScript Tutorial
How To Tutorial
SQL Tutorial
Python Tutorial
W3.CSS Tutorial
Bootstrap Tutorial
PHP Tutorial
Java Tutorial
C++ Tutorial
jQuery Tutorial
Top References
HTML Reference
CSS Reference
JavaScript Reference
SQL Reference
Python Reference
W3.CSS Reference
Bootstrap Reference
PHP Reference
HTML Colors
Java Reference
AngularJS Reference
jQuery Reference
Top Examples
HTML Examples
CSS Examples
JavaScript Examples
How To Examples
SQL Examples
Python Examples
W3.CSS Examples
Bootstrap Examples
PHP Examples
Java Examples
XML Examples
jQuery Examples
Get Certified
HTML Certificate
CSS Certificate
JavaScript Certificate
Front End Certificate
SQL Certificate
Python Certificate
PHP Certificate
jQuery Certificate
Java Certificate
C++ Certificate
C# Certificate
XML Certificate
FORUM
ABOUT
ACADEMY
W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning.
Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness
of all content. While using W3Schools, you agree to have read and accepted our
terms of use
cookies
privacy policy
Copyright 1999-2026
by Refsnes Data. All Rights Reserved.
W3Schools is Powered by W3.CSS
