# Python Tutorials – Real Python

## Python 3.15 Hits Feature Freeze and Other News for June 2026

Python 3.15 hits feature freeze with a built-in sentinel, PEP 829 lands, Pydantic forks httpx, and AI goes bug-hunting in C code.

Jun 08, 2026communitynews

## Podcasts

## Explore Real Python

## New Releases

## How to Use GitHub Copilot Code Review in Pull Requests

Jun 03, 2026intermediatetools

## Structuring Your Python Script

Jun 02, 2026basicspython

## Python sleep(): How to Add Time Delays to Your Code

Jun 01, 2026intermediatestdlib

## Sending Emails With Python

May 27, 2026intermediateweb-dev

## Connecting LLMs to Your Data With Python MCP Servers

May 26, 2026intermediateai

## How to Make a Scatter Plot in Python With plt.scatter()

May 25, 2026intermediatedata-viz

## How to Use the Claude API in Python

May 20, 2026intermediateaiapitools

## Tapping Into the Zen of Python

May 19, 2026basicspython

## Python Built-in Functions: A Complete Guide

May 18, 2026intermediatepython

## How to Use OpenCode for AI-Assisted Python Coding

May 13, 2026intermediateaipythontools

## Building Type-Safe LLM Agents With Pydantic AI

May 12, 2026intermediateai

## How to Flatten a List of Lists in Python

May 11, 2026intermediatealgorithmsdata-science

## ChatterBot: Build a Chatbot With Python

May 06, 2026intermediatedata-scienceprojects

## Use Codex CLI to Enhance Your Python Projects

May 05, 2026intermediateaitools

## A New Python Packaging Council and Other News for May 2026

May 04, 2026communitynews

## AI Coding Agents Guide: A Map of the Four Workflow Types

Apr 29, 2026intermediateai

## Testing Your Code With Python's unittest

Apr 28, 2026intermediatestdlibtesting

## How to Conceptualize Python Fundamentals for Greater Mastery

Apr 27, 2026basicsbest-practicespython


---


## Source: https://realpython.com/python-news-june-2026/
# Python 3.15 Hits Feature Freeze and Other News for June 2026 – Real Python

# Python 3.15 Hits Feature Freeze and Other News for June 2026

Table of Contents

- Python Releases and PEP HighlightsBeta 1 Marks the 3.15 Feature FreezeA Built-in sentinel Lands in Python 3.15PEP 829 Graduates From Draft to AcceptedOther PEP Activity
- Community and Ecosystem HighlightsPydantic Forks httpxThe PSF Charts a Course and Honors Its VolunteersThe Django Survey Wants to Hear From You
- Library and Tooling UpdatesPyrefly Reaches 1.0Django 6.1 Alpha and Security ReleasesOther Notable Releases
- AI Tooling UpdatesAI Goes Bug-Hunting in C CodeCode With Claude and the Agent-Orchestration PushPydantic AI v2, PyTorch 2.12, and a New Gemini Flash
- Conferences and Events
- Real Python Roundup
- What’s Next for Python?

- Beta 1 Marks the 3.15 Feature Freeze
- A Built-in sentinel Lands in Python 3.15
- PEP 829 Graduates From Draft to Accepted
- Other PEP Activity

- Pydantic Forks httpx
- The PSF Charts a Course and Honors Its Volunteers
- The Django Survey Wants to Hear From You

- Pyrefly Reaches 1.0
- Django 6.1 Alpha and Security Releases
- Other Notable Releases

- AI Goes Bug-Hunting in C Code
- Code With Claude and the Agent-Orchestration Push
- Pydantic AI v2, PyTorch 2.12, and a New Gemini Flash

While the Northern Hemisphere warms up for summer, Python 3.15 went the other way with itsbeta 1 feature freeze🥶. Since May 7, the list of what will be included in the next release is final. That list includes a brand-newsentinelbuilt-inthat finally standardizes a pattern Python developers have been hand-rolling for decades.

And while AI kept writing code, buggy or not, developers also directed it tolookfor bugs in code that had been sitting untouched for years. The results were hundreds of bug fixes in Python’s C extensions and in Firefox. Meanwhile, in a quieter corner of the ecosystem, Pydantic forkedhttpx, kicking off one of the more interesting governance stories of the year.

Time to dig into thePython newsfrom the past month!

Join Now:Click here to join the Real Python Newsletterand you’ll never miss another Python tutorial, course, or news update.

## Python Releases and PEP Highlights

The 3.15 release ofCPythoncrossed from alpha into beta, which means its feature set is now frozen, and theSteering Councilcleared out a backlog of proposals before the gate closed. Two of those changes will touch the code you write every day.

### Beta 1 Marks the 3.15 Feature Freeze

Last month,the eighth and final alpharolled out as the runway to the beta phase. WithPython 3.15.0b1on May 7 came thefeature freeze, which means that from here until the final release of 3.15, the core team works only on bug fixes and polishing.

That makes the beta releases a good moment to step back and look at the headline features of 3.15, which are now locked:

- Explicit lazy imports(PEP 810) for faster startup
- Afrozendictbuilt-in(PEP 814) for immutable mappings
- Asentinelbuilt-in(PEP 661), which you’ll dig intobelow
- Unpacking in comprehensions(PEP 798)
- UTF-8 as the defaultencoding(PEP 686)
- A stable ABI forfree-threaded builds(PEP 803), plus C-API modernization (PEPs820and793) that should make it easier to write C extensions that work across Python versions
- A newsampling profilerin thestandard library(PEP 799) for low-overheadprofiling

TheJIT compileralso gets faster, with the beta announcement citing an 8–9 percent geometric-mean improvement on x86-64 Linux. If you’ve been putting off testing your code against 3.15, then now is the time to get started! TheAPIsurface won’t shift under you anymore, and your feedback will help catch regressions before the release candidate phase.

Note:Beta builds are for testing, not production.Install the pre-release version, run your test suite against 3.15, and report anything that breaks while there’s still time to fix it before the release candidate.

The first round of improvements already landed withbeta 2on June 2, and the next big checkpoint is therelease candidatephase on August 4, with the final release expected, as usual, this fall.

### A Built-insentinelLands in Python 3.15

Here’s the new feature that you’ll likely want to reach for. If you’ve ever needed to tell the difference between a caller passingNoneand a caller passing nothing at all, then you’ve probably written something like this:

```
_MISSING = object()

def update(value=_MISSING):
    if value is _MISSING:
        ...  # No value was provided

```

```
_MISSING = object()

def update(value=_MISSING):
    if value is _MISSING:
        ...  # No value was provided

```

It works, but it has rough edges. Therepr()is an unhelpful<object object at 0x7f...>, the marker can’t be used cleanly in typeannotations, and its identity doesn’t survive copying or pickling.PEP 661replaces the idiom with a newsentinelbuilt-in:

```
<object object at 0x7f...>
```

```
MISSING = sentinel("MISSING")

def update(value: int | MISSING = MISSING) -> None:
    if value is MISSING:
        ...  # No value was provided

```

```
MISSING = sentinel("MISSING")

def update(value: int | MISSING = MISSING) -> None:
    if value is MISSING:
        ...  # No value was provided

```

The signature issentinel(name, /, *, repr=None), and the result is a unique truthy object whose defaultrepr()is the name you gave it, soMISSINGshows up asMISSINGintracebacksinstead of a memory address.

```
sentinel(name, /, *, repr=None)
```

Note:Sentinels andNonesolve related but different problems. If you’re still fuzzy on whenNoneis the right tool, then Real Python’s guide toPython’sNoneis worth revisiting.

Because the sentinel is its own type, you can drop it straight into annotations likeint | MISSINGwithout reaching forLiteral. ThePEPwas first submitted back in 2021, so it’s satisfying to see it cross the finish line.

### PEP 829 Graduates From Draft to Accepted

Last month’s roundupfeatured PEP 829 while it was still a draft. It’s since been accepted for Python 3.15, so the change is now official.

As a quick recap,.pthfiles in yoursite-packagesdirectory can do two things:

1. Extendsys.path
1. Run arbitrary code throughimportlines that Python feeds directly toexec()at startup

That second behavior is a long-standing supply-chain vulnerability, since any installedpackagecan run code the moment theinterpreterstarts.

PEP 829 – Package Startup Configuration Filesstarts the deprecation of the code-execution path and introduces a new<name>.startfile format that names explicit entry points using thepkg.module:callableform. The directory-extending behavior of.pthfiles stays, but the import behavior will gradually move to separate.startfiles.

### Other PEP Activity

A few more decisions and one release worth a quick mention:

- Python 3.14.5shippedon May 10with roughly 154 bug fixes. Most notably, it makes theincremental garbage collector reversionofficial, rolling back to the 3.13-era generational collector after reports of memory pressure in production.
- PEP 831 – Frame Pointers EverywherereachedFinalstatus. Compiling CPython with frame pointers enabled by default makes profilers andobservabilitytools likeperfproduce accurate call stacks, for a modest performance cost. It’s a quiet win if you ever need to figure out where your production Python is spending its time.
- PEP 808 – Including Static Values in Dynamic Metadatawas accepted, closing a gap inpyproject.tomlwhere a field had to be either fully static or fully dynamic.
- Several proposals weredeferred to 3.16, includingPEP 797,PEP 813,PEP 828, andPEP 830. The feature freeze helps to clarify what’s truly ready and what needs more time.

All in all, it was a solid month for the core language, with a mix of new features and hardening work that should make Python more robust and easier to use in the long run.

## Community and Ecosystem Highlights

Not everything newsworthy ships as a version number. This month’s community news centered on stewardship: keeping a critical library alive, planning for leaner times at the foundation, and recognizing the people who do the work that never shows up in a changelog.

### Pydantic Forkshttpx

One of the more closely watched stories this month was the fork ofhttpx, the popular async-capable HTTP client. Development on the original project had stalled, with pull requests and performance fixes piling up unmerged, and the community started routing around the impasse.

What makes this one interesting is how it played out. A community maintainer first published a fork calledhttpxyzand wrote upa month-in retrospective. Then Pydantic stepped in to take over stewardship under thehttpx2name, backed by its team and ecosystem.

Rather than start a turf war, thehttpxyzauthorendorsedhttpx2as the “blessed” fork and pledged to rally the community behind it. Thehttpx2project has already swappedcertififortruststore, supportszstd-compressed responses out of the box on Python 3.14+ via the standard library, and depends on its own fork of the transport layer,httpcore2.

It’s a reminder that the health of a widely depended-upon library isn’t guaranteed by its popularity. When maintenance stalls, the open-source answer is sometimes a fork, and the graceful part here is watching two maintainers coordinate instead of compete.

### The PSF Charts a Course and Honors Its Volunteers

ThePython Software Foundationsharedits strategic planning workthis month, laying out priorities as it navigates a tighter funding environment. If your company ships Python, then it’s a good prompt to ask whether you’re contributing back to the foundation that keeps the lights on.

The PSF alsoannounced this year’s Community Service Award recipients, recognizing the volunteers whose behind-the-scenes work keeps conferences running, working groups staffed, and newcomers welcomed. It’s the kind of labor that rarely makes a changelog but holds the whole community together.

### The Django Survey Wants to Hear From You

The2026 Django Developers Surveyis open. These surveys shape how the framework evolves, from which database backends get attention to how the team thinks about async. If you write Django, then spending five minutes here is one of the lowest-effort ways to influence the roadmap.

## Library and Tooling Updates

The wider ecosystem kept pace with the language. Type checkers, web frameworks, and packaging tools all shipped updates worth a look this month, ranging from a major 1.0 release to a fresh batch of security patches that you’ll want to apply sooner rather than later.

### Pyrefly Reaches 1.0

Meta’s Rust-based type checker, Pyrefly, hitversion 1.0this month. The 1.0 stamp signals that the project considers its core stable enough to depend on, and the headline pitch is speed: a checker fast enough to run on every keystroke.

It’s already the default checker for Instagram’s roughly 20-million-line codebase and is used by PyTorch and NumPy, andpyrefly initconverts an existingmypyor Pyright config so you can try it without starting over.

Note:New to static typing in Python? Real Python’s guide toPython type checkingwalks through the concepts before you pick a tool.

The timing lines up with the typing conversation at PyCon US this year, where thetyping summit recapcaptured an ecosystem that’s increasingly spoiled for choice, with Pyrefly andAstral’styboth pushing Rust-speed type checking.

### Django 6.1 Alpha and Security Releases

Django 6.1 alpha 1marks the 6.1 feature freeze and opens the testing window, so it’s a fine time to try your project against it and file regressions early.

Separately, the team shippedsecurity releases 6.0.5 and 5.2.14, fixing three low-severity issues. As always with security patches, the boring move is the right one: upgrade promptly even if you don’t think the affected paths apply to you.

### Other Notable Releases

A few recent releases across the tooling landscape are worth a look:

- pip 26.1arrivedwith support for dependency cooldowns, experimental installs from standardpylock.tomllockfiles, and the end of Python 3.9 support.
- Nuitka 4.1, the Python-to-C compiler,shipped a new release.
- PyPy 7.3.22landedwith new RPythonpickleandjsonencoders that close much of PyPy’s serialization gap with CPython.

Depending on your stack, you might want to check out the release notes for these and other projects to see if there’s anything worth upgrading to or testing against.

## AI Tooling Updates

AI news is a dime a dozen these days, but one of this month’s more interesting developer-facing stories wasn’t about a new model release, even though Anthropic also shipped a notable upgrade withOpus 4.8.

Developers pointedtoday’smodels at decades-old C code to find ancient bugs, and built workflows around existing models that increase performance while decreasingtokenuse and cost.

### AI Goes Bug-Hunting in C Code

This month, developer Daniel Dinizdescribedrunning aClaude Codeplugin that fans out into thirteen parallelagents, each hunting a bug class like reference-counting errors or missing exception checks in Python’s C extensions.LWNalso covered the effort.

The result was more than 575 confirmed bugs across roughly a million lines of code in 44 extensions, with fixes already merged into more than a dozen projects, including Cython and Pillow.

Mozilla ran a similar play on its Firefox codebase. Its engineers built anagentic harnessaround a preview of Anthropic’s restricted Claude Mythos model that could generate and run reproducible test cases, and it surfaced 271 previously unknown Firefox bugs, some latent for well over a decade.

Note:Curious about building agentic workflows yourself? OurAI Coding Agents Guidemaps out different types of agents, and explains where they each fit.

Both bug-hunting projects worked because of the human pipeline wrapped around a capable AI model, including deduplication, triage, and responsible disclosure to maintainers.

Diniz reported a 10–15 percent false-positive rate, which is why you shouldn’t dump raw model output on an open-source maintainer’s issue tracker. Used carefully, though, this can help to improve the C layers that much of Python sits on top of.

### Code With Claude and the Agent-Orchestration Push

Anthropic’sCode with Claude 2026 eventon May 6 focused on orchestration. The headline additions to Claude Code were multi-agent coordination, automatic CI fixes that push corrections back to a pull request, and remote control to steer a running session from your phone. You can watch the recordings of the talks on the event page linked above.

Note:If you want to ramp up quickly using Claude Code for agentic development, then join the next run of our two-day live courseClaude Code for Python Developers.

One interesting practical idea, regardless of which tools you use, is theAdvisor pattern. A cheaper, faster model drives the work and calls in a heavyweight model only for the hard reasoning:

Anthropic’s demo paired Sonnet as the driver with Opus as the advisor, reporting frontier-quality output at roughly five times lower cost. As these tools mature, the skill is shifting from writing a goodpromptto designing a good workflow.

### Pydantic AI v2, PyTorch 2.12, and a New Gemini Flash

There were a few more releases for the AI-adjacent crowd:

- Pydantic AIv2entered beta with a harness-first redesign built aroundcapabilitiesthat bundle an agent’s tools, hooks, and settings into one composable object. It’s a breaking change: provider extras are no longer installed by default, and the OpenAI integration now defaults to the Responses API. The recommended path is to clear your deprecation warnings on the latest v1 release first, then migrate. If you’ve been following along with our newPydantic AI course, it’s worth knowing what’s changing.
- PyTorch 2.12raised its build requirementsto CUDA 12.6 and C++20, and changed the defaulttorchrunport from a fixed 29500 to an OS-assigned one for single-node runs that don’t set--master-port, which can silently break scripts that assumed 29500.
- Gemini3.5 Flashwent generally available atGoogle I/Oon May 19. It’s pricier than its predecessor, so benchmark before you swap model strings in a cost-sensitive app.

With the pace of change in AI tooling, it’s worth keeping an eye on the release notes for the models and frameworks you use, since even a minor version bump can include breaking changes or new features you’ll want to adopt.

## Conferences and Events

PyCon US2026 has wrapped, and the recaps are the gift that keeps giving for those of us who couldn’t attend:

Beyond the typing summit, thepackaging summit recapis a useful read on where Python packaging is headed now that PEP 772 has established the Packaging Council.

Looking ahead,EuroPython 2026runs July 13–19 in Kraków and is calling for onsite volunteers, whileDjangoCon US 2026heads to Chicago on August 24–28, with tickets available now. If you’ve never volunteered at a conference, it’s one of the best ways to meet people and see how the sausage gets made.

## Real Python Roundup

TheReal Python teamkept the publishing engine humming through May. Here’s a look at what’s new on the site.

You can start your next learning session with thesewritten tutorials:

- ChatterBot: Build a Chatbot With Python
- How to Flatten a List of Lists in Python
- How to Use OpenCode for AI-Assisted Python Coding
- Python Built-in Functions: A Complete Guide
- How to Use the Claude API in Python
- How to Make a Scatter Plot in Python With plt.scatter()
- Sending Emails With Python

If you’d rather learn by watching, check out these newvideo courses:

- Use Codex CLI to Enhance Your Python Projects
- Building Type-Safe LLM Agents With Pydantic AI
- Tapping Into the Zen of Python
- Connecting LLMs to Your Data With Python MCP Servers

Want to check what stuck? Test yourself with thesequizzes:

- How to Use the Claude API in Python
- Connecting LLMs to Your Data With Python MCP Servers
- Building Type-Safe LLM Agents With Pydantic AI
- How to Use OpenCode for AI-Assisted Python Coding
- Tapping Into the Zen of Python
- How to Make a Scatter Plot in Python With plt.scatter()
- How to Flatten a List of Lists in Python
- Sending Emails With Python
- Python Metaclasses
- Memory Management in Python

We also rolled out a new kind of quiz this month: end-of-pathwrap-up quizzes. Rather than testing a single tutorial, each one curates the strongest questions from across an entirelearning pathso you can check how well the big ideas stuck after completing it.

More than twenty learning paths now end with one, spanning beginner-to-advanced tracks likeBecome a Python Web Developer,Machine Learning With Python, andData Science With Python Core Skills. If you’ve worked through a path from start to finish, the matching quiz is a quick way to spot which topics are worth revisiting.

And if you learn best by doing, there’s even more to practice now. This month we added nearly one hundredinteractive coding exercisesacross more than thirty-five video courses, so you can write and run code right alongside the lessons instead of only watching.

The new exercises lean toward intermediate skills and span everything fromregular expressionsandpandas GroupBytoPython’s magic methodsand even aWordle clone built with Rich.

OnThe Real Python Podcast,Christopher Baileyand guests worked through a range of topics this month:

- Episode 293:Agentic Data Science Pair Programming Withmarimo pair
- Episode 294:Declarative Charts in Python & Discerning Iterators vs Iterables
- Episode 295:Agentic Architecture: Why Files Aren’t Always Enough
- Episode 296:Managing Polars Schema Issues & Profiling GitHub Users

If you only have time for one, then episode 296 pairs nicely with this month’shttpxfork story: it digs into a tool for vetting a GitHub contributor’s profile. That’s exactly the kind of judgment call open-source maintainers are making more often in the age of AI-generated pull requests.

## What’s Next for Python?

The next few months are all about getting 3.15 across the line. With beta 2 out, therelease candidate phaseopens August 4, and the final release follows in the fall. The feature list is set, so the most useful thing you can do now is run your projects against the beta and report what breaks.

Join Now:Click here to join the Real Python Newsletterand you’ll never miss another Python tutorial, course, or news update.

There was a lot of maintenance this month: PEP 829 hardening how packages start up, AI agents combing through decades-old C code, and a community forking a critical library to keep it alive. None of it is flashy, but it’s the work that keeps the ecosystem trustworthy. So this month, maybe upgrade a dependency, test the beta, or fix a bug nobody asked you to. By the community, for the community!

🐍 Python Tricks 💌

Get a short & sweetPython Trickdelivered to your inbox every couple of days. No spam ever. Unsubscribe any time. Curated by the Real Python team.

AboutMartin Breuss

Martin is Real Python's Head of Content Strategy. With a background in education, he's worked as a coding mentor, code reviewer, curriculum developer, bootcamp instructor, and instructional designer.

Each tutorial at Real Python is created by a team of developers so that it meets our high quality standards. The team members who worked on this tutorial are:

Aldren

Brenda

Bartosz

MasterReal-World Python SkillsWith Unlimited Access to Real Python

Join us and get access to thousands of tutorials, hands-on video courses, and a community of expert Pythonistas:

Level Up Your Python Skills »

MasterReal-World Python SkillsWith Unlimited Access to Real Python

Join us and get access to thousands of tutorials, hands-on video courses, and a community of expert Pythonistas:

Level Up Your Python Skills »

What Do You Think?

What’s your #1 takeaway or favorite thing you learned? How are you going to put your newfound skills to use? Leave a comment below and let us know.

Commenting Tips:The most useful comments are those written with the goal of learning from or helping out other students.Get tips for asking good questionsandget answers to common questions in our support portal.Looking for a real-time conversation? Visit theReal Python Community Chator join the next“Office Hours” Live Q&A Session. Happy Pythoning!

Keep Learning

Related Topics:communitynews

## Keep reading Real Python by creating a free account or signing in:

Continue »

Already have an account?Sign-In


---


## Source: https://realpython.com/tutorials/community/
# Python Community Articles – Real Python

# Python Community Articles and Interviews

Connecting with fellow Python developers happens through conferences, online forums, local meetups, and open source contributions. The Python community is known for its welcoming culture and willingness to help beginners and experienced programmers alike. Join discussions, share your work, and learn from developers building everything from web apps to scientific tools.

Join Now:Click here to join the Real Python Newsletterand you’ll never miss another Python tutorial, course, or news update.

Real Python shares insights and stories from Pythonistas working on interesting projects around the world. Read interviews with core developers, library maintainers, educators, and community organizers. Learn about their workflows, the challenges they solve with Python, and their advice for developers at any stage of their career.

Note:Browse all community resources below. If you’re looking for a structured progression of guided paths with progress tracking, then check out ourPython Learning Paths.

Start by joining online forums like the Python Discord, Reddit’s r/Python, or Python.org discourse. Attend local Python meetups or conferences likePyCon. Contribute to open source projects, answer questions, and share what you learn on blogs or social media.

PyConis the largest annualPython conferencewith regional editions worldwide. PyCon US, EuroPython, and PyCon AU offer talks, tutorials, and networking. Check for regional conferences, Django-specific events, and domain-focused gatherings like SciPy for scientific Python.

Find projects onGitHubthat interest you and check theircontributing guidelines. Start with documentation fixes, bug reports, or small features marked “good first issue.” Join the project’s chat or mailing list, ask questions, and submit pull requests with tests.

Look for local Python user groups on Python.org’s community page or other meetup services. Join online communities like theReal Python Slack. Attend conferences, participate in sprints, and connect with developers on X or Mastodon using Python hashtags.

Python’s community follows a Code of Conduct that promotes respectful, inclusive behavior. The culture emphasizes helping newcomers, sharing knowledge freely, and celebrating diverse contributions. Many Pythonistas actively mentor, teach, and create resources for learners.

## Python 3.15 Hits Feature Freeze and Other News for June 2026

Jun 08, 2026communitynews

## The Real Python Podcast – Episode #297: Improving Python Through PEPs and Protocols

May 29, 2026intermediatecommunitypythonweb-dev

## The Real Python Podcast – Episode #296: Managing Polars Schema Issues & Profiling GitHub Users

May 22, 2026intermediatebest-practicescommunitydata-sciencestdlib

## A New Python Packaging Council and Other News for May 2026

May 04, 2026communitynews

## Welcome to Real Python!

Apr 16, 2026basicscommunity

## D-Strings Could End Your textwrap.dedent() Days and Other Python News for April 2026

Apr 06, 2026communitynews

## The Real Python Podcast – Episode #287: Crafting and Editing In-Depth Tutorials at Real Python

Mar 13, 2026intermediatecommunitypython

## Python Gains frozendict and Other Python News for March 2026

Mar 09, 2026communitynews

## The Real Python Podcast – Episode #284: Running Local LLMs With Ollama and Connecting With Python

Feb 13, 2026intermediateaicommunityeditors

## pandas 3.0 Lands Breaking Changes and Other Python News for February 2026

Feb 09, 2026communitynews

## Why You Should Attend a Python Conference

Feb 04, 2026careercommunity

## How Long Does It Take to Learn Python?

Jan 28, 2026basicscareercommunity

## The Real Python Podcast – Episode #280: Considering Fast and Slow in Python Programming

Jan 16, 2026intermediateapibest-practicescommunityweb-dev

## Learn From 2025's Most Popular Python Tutorials and Courses

Jan 05, 2026basicscommunitynews

## Lazy Imports Land in Python and Other Python News for December 2025

Dec 08, 2025communitynews

## The Real Python Podcast – Episode #275: Building a FastAPI Application & Exploring Python Concurrency

Nov 21, 2025intermediatebest-practicescommunityweb-dev

## Python 3.14 Released and Other Python News for November 2025

Nov 10, 2025communitynews

## The Real Python Podcast – Episode #269: Python 3.14: Exploring the New Features

Oct 10, 2025intermediatebest-practicescommunitystdlib

## It's Almost Time for Python 3.14 and Other Python News

Oct 06, 2025communitynews

## The Python Documentary Celebrates History While Developer Surveys Celebrate Python

Sep 08, 2025communitynews

## The Real Python Podcast – Episode #263: Exploring Mixin Classes in Python

Aug 29, 2025intermediatebest-practicescommunitygui

## The Real Python Podcast – Episode #261: Selecting Inheritance or Composition in Python

Aug 15, 2025intermediatebest-practicescommunity

## Python 3.14 Release Candidate Lands: Faster Code, Smarter Concurrency

Aug 11, 2025communitynews

## The Real Python Podcast – Episode #258: Supporting the Python Package Index

Jul 25, 2025intermediatecareercommunitypython

## Free-Threaded Python Unleashed and Other Python News for July 2025

Jul 07, 2025communitynews

## Python Hits the Big Screen and Other Python News for June 2025

Jun 09, 2025communitynews

## The Real Python Podcast – Episode #250: DjangoCon Europe 2025: Live Recording From Dublin

May 23, 2025communitydjangopython

## How to Get the Most Out of PyCon US

careercommunity

## Python's T-Strings Coming Soon and Other Python News for May 2025

communitynews

## Python 3.14 Pi Day Release and Other Python News for April 2025

communitynews

## PyPI Adds iOS & Android Support—and Other Python News for March 2025

communitynews

## Python 3.14’s New Interpreter and More Python News for February 2025

communitynews

## Learn From 2024's Most Popular Python Tutorials and Courses

basicscommunitynews

## Python News Roundup: December 2024

communitynews

## The Real Python Podcast – Episode #228: Maintaining the Foundations of Python & Cautionary Tales

Nov 15, 2024best-practicescareercommunity

## Python News Roundup: November 2024

communitynews

## Python News Roundup: October 2024

communitynews

## The Real Python Podcast – Episode #221: Thriving as a Developer With ADHD

Sep 20, 2024careercommunity

## Python News Roundup: September 2024

communitynews

## The Real Python Podcast – Episode #219: Astrophysics and Astronomy With Python & PyCon Africa 2024

Sep 06, 2024communitydata-sciencepython

## Python News Roundup: August 2024

communitynews

## The Real Python Podcast – Episode #216: Learning Through Building the Black Python Devs Community

Aug 09, 2024careercommunity

## Python News Roundup: July 2024

communitynews

## Python News: What's New From May 2024

communitynews

## Python News: What's New From April 2024

communitynews

## The Real Python Podcast – Episode #203: Embarking on a Relaxed and Friendly Python Coding Journey

May 03, 2024basicscommunityprojects

## Python News: What's New From March 2024

communitynews

## Python News: What's New From February 2024

communitynews


---


## Source: https://realpython.com/tutorials/news/
# Python News – Real Python

# Python News

Stay current with Python releases, PEPs, and the wider Python ecosystem. On this page you’ll find concise monthly news articles that explain what changed, why it matters, and how to try it in your code. Track core language updates, packaging and tooling, and notable libraries all in one place.

Join Now:Click here to join the Real Python Newsletterand you’ll never miss another Python tutorial, course, or news update.

Explore practical insights on type hints, asyncio, performance gains, pip and PyPI changes, build backends, and virtual environments. Keep up with frameworks and libraries such as Django, Flask, FastAPI, pandas, polars, NumPy, pytest, mypy, and Ruff. Use these updates to plan upgrades, adopt new features with confidence, and discover tools worth your time.

Note:Browse all news resources below. If you’re looking for a structured progression of guided paths with progress tracking, then check out ourPython Learning Paths.

CheckPython’s changelog, the officialPEP page, andPython’s discussion board. For curated summaries of Python releases and notable PEPs, read the articles on this Python News page. News articles include links to official notes and quick context for building real projects.

Check popular packages onPyPI statisticsor read Real Python News articles. Those highlight standout packages, why they matter, and how to start using them. Expect short examples and adoption tips.

Right here. The Real Python team tracks core changes, tooling, data, web, and packaging updates. Read concise roundups that you can act on.

The Real Python News articles cover changes to pip, newer tools such as uv, build backends, PyPI policy updates, and dependency tips. Check this page for practical guidance and upgrade notes.

Yes. Subscribe on this page to get Real Python’s curated newsletter in your inbox. Stay current without endless scrolling.

## Python 3.15 Hits Feature Freeze and Other News for June 2026

Jun 08, 2026communitynews

## A New Python Packaging Council and Other News for May 2026

May 04, 2026communitynews

## The Real Python Podcast – Episode #292: Becoming a Better Python Developer Through Learning Rust

Apr 24, 2026intermediatebest-practicesnewsnumpy

## D-Strings Could End Your textwrap.dedent() Days and Other Python News for April 2026

Apr 06, 2026communitynews

## Python Gains frozendict and Other Python News for March 2026

Mar 09, 2026communitynews

## pandas 3.0 Lands Breaking Changes and Other Python News for February 2026

Feb 09, 2026communitynews

## Learn From 2025's Most Popular Python Tutorials and Courses

Jan 05, 2026basicscommunitynews

## Lazy Imports Land in Python and Other Python News for December 2025

Dec 08, 2025communitynews

## Python 3.14 Released and Other Python News for November 2025

Nov 10, 2025communitynews

## Python 3.14: Cool New Features for You to Try

Oct 08, 2025intermediatenewspython

## Python 3.14: Cool New Features for You to Try

Oct 08, 2025intermediatenewspython

## It's Almost Time for Python 3.14 and Other Python News

Oct 06, 2025communitynews

## Python 3.14: Better Syntax Error Messages

Oct 01, 2025intermediatenewspython

## Python 3.14 Preview: Better Syntax Error Messages

Oct 01, 2025basicsnewspython

## Python 3.14: REPL Autocompletion and Highlighting

Sep 17, 2025basicsnewspython

## Python 3.14 Preview: REPL Autocompletion and Highlighting

Sep 17, 2025basicsnewspython

## The Python Documentary Celebrates History While Developer Surveys Celebrate Python

Sep 08, 2025communitynews

## Python 3.14: Lazy Annotations

Aug 27, 2025intermediatenewspython

## Python 3.14 Release Candidate Lands: Faster Code, Smarter Concurrency

Aug 11, 2025communitynews

## Free-Threaded Python Unleashed and Other Python News for July 2025

Jul 07, 2025communitynews

## Python Hits the Big Screen and Other Python News for June 2025

Jun 09, 2025communitynews

## Python's T-Strings Coming Soon and Other Python News for May 2025

communitynews

## Python 3.14 Pi Day Release and Other Python News for April 2025

communitynews

## PyPI Adds iOS & Android Support—and Other Python News for March 2025

communitynews

## Python 3.14’s New Interpreter and More Python News for February 2025

communitynews

## Learn From 2024's Most Popular Python Tutorials and Courses

basicscommunitynews

## Python News Roundup: December 2024

communitynews

## Python News Roundup: November 2024

communitynews

## Python News Roundup: October 2024

communitynews

## Python News Roundup: September 2024

communitynews

## Python News Roundup: August 2024

communitynews

## Python News Roundup: July 2024

communitynews

## Python News: What's New From May 2024

communitynews

## Python News: What's New From April 2024

communitynews

## Python News: What's New From March 2024

communitynews

## Python News: What's New From February 2024

communitynews

## Python News: What's New From January 2024

communitynews

## Python News: What's New From November 2023

communitynews

## Python News: What's New From October 2023

communitynews

## Python News: What's New From September 2023

communitynews

## Python News: What's New From August 2023

communitynews

## Python News: What's New From July 2023

communitynews

## Python News: What's New From June 2023

communitynews

## Python News: What's New From May 2023

communitynews

## Python News: What's New From April 2023

communitynews

## Python News: What's New From March 2023

communitynews

## Python News: What's New From February 2023

communitynews

## Python News: What's New From January 2023

communitynews


---


## Source: https://realpython.com/podcasts/rpp/
# The Real Python Podcast – Real Python

# The Real Python Podcast

## Python Tips, Interviews, and More

A weekly Python podcast hosted byChristopher Baileywith interviews, coding tips, and conversation with guests from the Python community.

The show covers a wide range of topics including Python programming best practices, career tips, and related software development topics. Join us every Friday morning to hear what’s new in the world of Python programming and become a more effective Pythonista.

### What Listeners Are Saying

“Thanks for starting this channel! Loving Real Python for its courses, articles and exercises. I was looking for something to listen to, to hear some experiences, and keep updated and this is perfect for this. A baby Python from France!”(⭐⭐⭐⭐⭐)

—Lamia(via Apple Podcasts)

“Hello Christopher and Real Python Podcast team,

I’ve quickly become a regular listener of your podcast, and just wanted to drop you a quick email and say how glad I am that you’ve launched this podcast, and how much I appreciate your episodes.

Like you, I’m relatively new to Python. I’ve recently begun using it regularly at work, so the topics and the libraries you highlight have been extremely helpful to me.

A perfect example is your recent episode on Python packaging. This is something veterans are probably all familiar with, but there are a lot of confusing examples out there. I was able to listen to your episode, head over to the tutorial you were talking about, and create my first Python package, which I then shared with several other non-profits.

That’s just one of many examples. But I wanted you to know that your efforts are very helpful, and very much appreciated.

Thanks and keep up the great work!”

—Bryan Hermsen(via email)

“Good interview and great job with the podcast! It is amazing how good this podcast is in such a short time. The timecodes and copious show notes and links really set it apart. Keep up the good work!”

—@DrewEcherd(via Twitter)

“Thanks for your quality contributions with Real Python podcast.
Three things I particularly like about the podcast:1. You ask quality questions.2. Extra course/exploratory links at the bottom is crucial for me.3. Weekly conversation is better than information overdose.”

—Dheeraj Bhosale(via LinkedIn)

“The Real Python Podcast is amazing! Don’t change a thing.”(⭐⭐⭐⭐⭐)

—Farlearner(via Apple Podcasts)

“Listen to this Podcast. I spend most of the week using Python for work. Often, after hours of coding, I see there’s a new episode of The RealPython Podcast and I think, ‘I can’t stand another second of thinking about Python.’ After a long walk or weekend away from my desk, I finally remember these important words, ‘listen to this podcast.’ Christopher and his guests bring the best topics and always seem to renew my love and passion for the Python language.”(⭐⭐⭐⭐⭐)

—JB M’uzuri(via Apple Podcasts)

### We want to hear from you!

Do you have an idea for an episode? Do you want to share your story with us or ask Christopher a question? Send an email topodcast@realpython.com, tweet at@realpython, orleave a voicemail from the comfort of your browser.

### Episode 298: Reducing the Size of Python Docker Containers

Jun 05, 202638m

How can you easily reduce the size of a Python Docker container? What are the exceptions you should catch in your code? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 297: Improving Python Through PEPs and Protocols

May 29, 20261h 20m

Have you ever been confused by the naming of modules you're importing from a package? Is there a standard way to organize and name your Python virtual environments? This week on the show, Brett Cannon returns to discuss the Python Enhancement Proposals (PEPs) he's been working on recently.

### Episode 296: Managing Polars Schema Issues & Profiling GitHub Users

May 22, 202642m

How can you avoid schema problems in your Polars data pipeline when adding new columns? How can you quickly examine a GitHub user's profile to decide how much to invest in their contributions? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 295: Agentic Architecture: Why Files Aren't Always Enough

May 15, 20261h 24m

What are the limitations of using a file-based agent workflow? Why do massive context windows tend to collapse? This week on the show, Mikiko Bazeley from MongoDB joins us to discuss agentic architecture and context engineering.

### Episode 294: Declarative Charts in Python & Discerning Iterators vs Iterables

May 08, 202656m

What if you could build charts in Python by describing what your data means, instead of scripting every visual detail? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 293: Agentic Data Science Pair Programming With marimo pair

May 01, 20261h 4m

How do you add agent skills to your data science workflow? How can a coding agent assist with data wrangling and research? This week on the show, Trevor Manz from marimo joins us to discuss marimo pair.

### Episode 292: Becoming a Better Python Developer Through Learning Rust

Apr 24, 202645m

How can learning Rust help make you a better Python Developer? How do techniques required by a compiled language translate to improving your Python code? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 291: Reassessing the LLM Landscape & Summoning Ghosts

Apr 17, 20261h 15m

What are the current techniques being employed to improve the performance of LLM-based systems? How is the industry shifting from post-training towards context engineering and multi-agent orchestration? This week on the show, Jodie Burchell, data scientist and Python Advocacy Team Lead at JetBrains, returns to discuss the current AI coding landscape.

### Episode 290: Advice on Managing Projects & Making Python Classes Friendly

Apr 10, 202654m

What goes into managing a major project? What techniques can you employ for a project that's in crisis? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 289: Limitations in Human and Automated Code Review

Mar 27, 202651m

With the mountains of Python code that it's possible to generate now, how's your code review going? What are the limitations of human review, and where does machine review excel? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 288: Automate Exploratory Data Analysis & Invent Python Comprehensions

Mar 20, 202656m

How do you quickly get an understanding of what's inside a new set of data? How can you share an exploratory data analysis with your team? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 287: Crafting and Editing In-Depth Tutorials at Real Python

Mar 13, 20261h 21m

What goes into creating the tutorials you read at Real Python? What are the steps in the editorial process, and who are the people behind the scenes? This week on the show, Real Python team members Martin Breuss, Brenda Weleschuk, and Philipp Acsany join us to discuss topic curation, review stages, and quality assurance.

### Episode 286: Overcoming Testing Obstacles With Python's Mock Object Library

Feb 27, 202639m

Do you have complex logic and unpredictable dependencies that make it hard to write reliable tests? How can you use Python's mock object library to improve your tests? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 285: Exploring MCP Apps & Adding Interactive UIs to Clients

Feb 20, 20261h 9m

How can you move your MCP tools beyond plain text? How do you add interactive UI components directly inside chat conversations? This week on the show, Den Delimarsky from Anthropic joins us to discuss MCP Apps and interactive UIs in MCP.

### Episode 284: Running Local LLMs With Ollama and Connecting With Python

Feb 13, 202645m

Would you like to learn how to work with LLMs locally on your own computer? How do you integrate your Python projects with a local model? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 283: Improving Your GitHub Developer Experience

Feb 06, 202659m

What are ways to improve how you're using GitHub? How can you collaborate more effectively and improve your technical writing? This week on the show, Adam Johnson is back to talk about his new book, "Boost Your GitHub DX: Tame the Octocat and Elevate Your Productivity".

### Episode 282: Testing Python Code for Scalability & What's New in pandas 3.0

Jan 30, 202649m

How do you create automated tests to check your code for degraded performance as data sizes increase? What are the new features in pandas 3.0? Christopher Trudeau is back on the show this week with another batch of PyCoder's Weekly articles and projects.

### Episode 281: Continuing to Improve the Learning Experience at Real Python

Jan 23, 202645m

If you haven't visited the Real Python website lately, then it's time to check out a great batch of updates on realpython.com! Dan Bader returns to the show this week to discuss improvements to the site and more ways to learn Python.

### Episode 280: Considering Fast and Slow in Python Programming

Jan 16, 202655m

How often have you heard about the speed of Python? What's actually being measured, where are the bottlenecks---development time or run time---and which matters more for productivity? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 279: Coding Python With Confidence: Beginners Live Course Participants

Jan 09, 20261h 18m

Are you looking for that solid foundation to begin your Python journey? Would the accountability of scheduled group classes help you get through the basics and start building something? This week, two members of the Python for Beginners live course discuss their experiences.

### Episode 278: PyCoder's Weekly 2025 Top Articles & Hidden Gems

Jan 02, 202632m

PyCoder's Weekly included over 1,500 links to articles, blog posts, tutorials, and projects in 2025. Christopher Trudeau is back on the show this week to help wrap up everything by sharing some highlights and uncovering a few hidden gems from the pile.

### Episode 277: Moving Towards Spec-Driven Development

Dec 19, 20251h 1m

What are the advantages of spec-driven development compared to vibe coding with an LLM? Are these recent trends a move toward declarative programming? This week on the show, Marc Brooker, VP and Distinguished Engineer at AWS, joins us to discuss specification-driven development and Kiro.

### Episode 276: Exploring Quantum Computing & Python Frameworks

Dec 05, 202550m

What are the recent advances in the field of quantum computing and high-performance computing? And what Python tools can you use to develop programs that run on quantum computers? This week on the show, Real Python author Negar Vahid discusses her tutorial, "Quantum Computing Basics With Qiskit."

### Episode 275: Building a FastAPI Application & Exploring Python Concurrency

Nov 21, 202535m

What are the steps to get started building a FastAPI application? What are the different types of concurrency available in Python? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 274: Preparing Data Science Projects for Production

Nov 14, 202559m

How do you prepare your Python data science projects for production? What are the essential tools and techniques to make your code reproducible, organized, and testable? This week on the show, Khuyen Tran from CodeCut discusses her new book, "Production Ready Data Science."

### Episode 273: Advice for Writing Maintainable Python Code

Nov 07, 202554m

What are techniques for writing maintainable Python code? How do you make your Python more readable and easier to refactor? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 272: Michael Kennedy: Managing Your Own Python Infrastructure

Oct 31, 20251h 20m

How do you deploy your Python application without getting locked into an expensive cloud-based service? This week on the show, Michael Kennedy from the Talk Python podcast returns to discuss his new book, "Talk Python in Production."

### Episode 271: Benchmarking Python 3.14 & Enabling Asyncio to Scale

Oct 24, 202547m

How does Python 3.14 perform under a few hand-crafted benchmarks? Does the performance of asyncio scale on the free-threaded build? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 270: Evolving Teaching Python in the Classroom

Oct 17, 20251h 4m

How is teaching young students Python changing with the advent of LLMs? This week on the show, Kelly Schuster-Paredes from the Teaching Python podcast joins us to discuss coding and AI in the classroom.

### Episode 269: Python 3.14: Exploring the New Features

Oct 10, 202556m

Python 3.14 is here! Christopher Trudeau returns to discuss the new version with Real Python team member Bartosz Zaczyński. This year, Bartosz coordinated the series of preview articles with members of the Real Python team and wrote the showcase tutorial, "Python 3.14: Cool New Features for You to Try." Christopher's video course, "What's New in Python 3.14", covers the topics from the article and shows the new features in action.

### Episode 268: Advice on Beginning to Learn Python

Oct 03, 202552m

What's changed about learning Python over the last few years? What new techniques and updated advice should beginners have as they start their journey? This week on the show, Stephen Gruppetta and Martin Breuss return to discuss beginning to learn Python.

### Episode 267: Managing Feature Flags & Comparing Python Visualization Libraries

Sep 26, 202542m

What's a good way to enable or disable code paths without redeploying the software? How can you use feature flags to toggle functionality for specific users of your application? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 266: Dangers of Automatically Converting a REST API to MCP

Sep 19, 20251h 24m

When converting an existing REST API to the Model Context Protocol, what should you consider? What anti-patterns should you avoid to keep an AI agent’s context clean? This week on the show, Kyle Stratis returns to discuss his upcoming book, "AI Agents with MCP".

### Episode 265: Python App Hosting Choices & Documenting Python's History

Sep 12, 202543m

What are your options for hosting your Python application or scripts? What are the advantages of a platform as a service, container-based hosts, or setting up a virtual machine? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 264: Large Language Models on the Edge of the Scaling Laws

Sep 05, 20251h 28m

What's happening with the latest releases of large language models? Is the industry hitting the edge of the scaling laws, and do the current benchmarks provide reliable performance assessments? This week on the show, Jodie Burchell returns to discuss the current state of LLM releases.

### Episode 263: Exploring Mixin Classes in Python

Aug 29, 202550m

What is a good way to add isolated, reusable functionality to Python classes? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 262: Travis Oliphant: SciPy, NumPy, and Fostering Scientific Python

Aug 22, 20251h 11m

What went into developing the open-source Python tools data scientists use every day? This week on the show, we talk with Travis Oliphant about his work on SciPy, NumPy, Numba, and many other contributions to the Python scientific community.

### Episode 261: Selecting Inheritance or Composition in Python

Aug 15, 202546m

When considering an object-oriented programming problem, should you prefer inheritance or composition? Why wouldn't it just be simpler to use functions? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 260: Harnessing the Power of Python Polars

Aug 08, 20251h 14m

What are the advantages of using Polars for your Python data projects? When should you use the lazy or eager APIs, and what are the benefits of each? This week on the show, we speak with Jeroen Janssens and Thijs Nieuwdorp about their new book, _Python Polars: The Definitive Guide_.

### Episode 259: Design Patterns That Don't Translate to Python

Aug 01, 202549m

Do the design patterns learned in other programming languages translate to coding in Python? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 258: Supporting the Python Package Index

Jul 25, 202549m

What goes into supporting more than 650,000 projects and nearly a million users of the Python Package Index? This week on the show, we speak with Maria Ashna about her first year as the inaugural PyPI Support Specialist.

### Episode 257: Comparing Real-World Python Performance Against Big O

Jul 11, 202545m

How does the performance of an algorithm hold up when you put it into a realistic context? Where might Python code defy Big O notation expectations when using a profiler? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 256: Solving Problems and Saving Time in Chemistry With Python

Jul 04, 20251h 13m

What motivates someone to learn how to code as a scientist? How do you harness the excitement of solving problems quickly and make the connection to the benefits of coding in your scientific work? This week on the show, we speak with Ben Lear and Christopher Johnson about their book "Coding For Chemists."

### Episode 255: Structuring Python Scripts & Exciting Non-LLM Software Trends

Jun 27, 202554m

What goes into crafting an effective Python script? How do you organize your code, manage dependencies with PEP 723, and handle command-line arguments for the best results? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 254: Scaling Python Web Applications With Kubernetes and Karpenter

Jun 20, 20251h 4m

What goes into scaling a web application today? What are resources for learning and practicing DevOps skills? This week on the show, Calvin Hendryx-Parker is back to discuss the tools and infrastructure for autoscaling web applications with Kubernetes and Karpenter.

### Episode 253: Starting With marimo Notebooks & Python App Config Management

Jun 13, 202551m

Looking for a guide on getting started with marimo notebooks? How do you build a reproducible notebook for sharing or create a dashboard with interactive UI elements? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 252: Rodrigo Girão Serrão: Python Training, itertools, and Idioms

Jun 06, 20251h 2m

Once you've learned the vocabulary and syntax of the Python language, how do you progress into learning the right combinations to put into your code? How can Python's built-in itertools library enhance your skills? This week on the show, we speak with Rodrigo Girão Serrão about teaching Python through his blog and his passion for the itertools library.

### Episode 251: Python Thread Safety & Managing Projects With uv

May 30, 202534m

What are the ways you can manage multithreaded code in Python? What synchronization techniques are available within Python's threading module? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 250: DjangoCon Europe 2025: Live Recording From Dublin

May 23, 202557m

What goes into making video courses at Real Python? How should you build an installable Django application? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 249: Going Beyond requirements.txt With pylock.toml and PEP 751

May 16, 20251h 31m

What is the best way to record the Python dependencies for the reproducibility of your projects? What advantages will lock files provide for those projects? This week on the show, we welcome back Python Core Developer Brett Cannon to discuss his journey to bring PEP 751 and the pylock.toml file format to the community.

### Episode 248: Experiments With Gen AI, Knowledge Graphs, Workflows, and Python

May 09, 202559m

Are you looking for some projects where you can practice your Python skills? Would you like to experiment with building a generative AI app or an automated knowledge graph sentiment analysis tool? This week on the show, we speak with Raymond Camden about his journey into Python, his work in developer relations, and the Python projects featured on his blog.

### Episode 247: Exploring DuckDB & Comparing Python Expressions vs Statements

Apr 18, 202552m

Are you looking for a fast database that can handle large datasets in Python? What's the difference between a Python expression and a statement? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 246: Learning Intermediate Python With a Deep Dive Course

Apr 11, 202556m

Do you want to learn deeper concepts in Python? Would the accountability of scheduled group classes help you get past the basics? This week, five Real Python Intermediate Deep Dive workshop members discuss their experiences.

### Episode 245: GUIs & TUIs: Choosing a User Interface for Your Python Project

Apr 04, 202546m

What are the current Python graphical user interface libraries? Should you build everything in the terminal and create a text-based user interface instead? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 244: A Decade of Automating the Boring Stuff With Python

Mar 21, 20251h 6m

What goes into updating one of the most popular books about working with Python? After a decade of changes in the Python landscape, what projects, libraries, and skills are relevant to an office worker? This week on the show, we speak with previous guest Al Sweigart about the third edition of "Automate the Boring Stuff With Python."

### Episode 243: Manage Projects With pyproject.toml & Explore Polars LazyFrames

Mar 14, 202548m

How can you simplify the management of your Python projects with one file? What are the advantages of using LazyFrames in Polars? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 242: Eric Matthes: Maybe Don't Start With Unit Tests

Mar 07, 20251h 10m

Should you always start testing your code with unit tests? When does it make sense to look at integration or end-to-end testing as a first step instead? This week on the show, we speak with previous guest Eric Matthes about where to begin testing your code.

### Episode 241: Deciphering Python Jargon & Compiling Python 1.0

Feb 28, 202543m

How do you learn the terms commonly used when speaking about Python? How is the jargon similar to other programming languages? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 240: Telling Effective Stories With Your Python Visualizations

Feb 21, 20251h 9m

How do you make compelling visualizations that best convey the story of your data? What methods can you employ within popular Python tools to improve your plots and graphs? This week on the show, Matt Harrison returns to discuss his new book "Effective Visualization: Exploiting Matplotlib & Pandas."

### Episode 239: Behavior-Driven vs Test-Driven Development & Using Regex in Python

Feb 14, 202557m

What is behavior-driven development, and how does it work alongside test-driven development? How do you communicate requirements between teams in an organization? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 238: Charlie Marsh: Accelerating Python Tooling With Ruff and uv

Feb 07, 20251h 30m

Are you looking for fast tools to lint your code and manage your projects? How is the Rust programming language being used to speed up Python tools? This week on the show, we speak with Charlie Marsh about his company, Astral, and their tools, uv and Ruff.

### Episode 237: Testing Your Python Code Base: Unit vs. Integration

Jan 31, 202554m

What goes into creating automated tests for your Python code? Should you focus on testing the individual code sections or on how the entire system runs? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 236: Simon Willison: Using LLMs for Python Development

Jan 24, 20251h 22m

What are the current large language model (LLM) tools you can use to develop Python? What prompting techniques and strategies produce better results? This week on the show, we speak with Simon Willison about his LLM research and his exploration of writing Python code with these rapidly evolving tools.

### Episode 235: Principles for Considering Your Python Tooling

Jan 17, 202546m

What are the principles you should consider when making decisions about which Python tools to use? What anti-patterns get in the way of making the right choices for your team? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 234: Building New Structures for Learning Python

Jan 10, 202552m

What are the new ways we can teach and share our knowledge about Python? How can we improve the structure of our current offerings and build new educational resources for our audience of Python learners? This week on the show, Real Python core team members Stephen Gruppetta and Martin Breuss join us to discuss enhancements to the site and new ways to learn Python.

### Episode 233: PyCoder's Weekly 2024 Top Articles & Missing Gems

Jan 03, 202541m

PyCoder's Weekly included over 1,500 links to articles, blog posts, tutorials, and projects in 2024. Christopher Trudeau is back on the show this week to help wrap it all up by sharing some highlights and uncovering a few missing gems from the pile.

### Episode 232: Exploring Modern Sentiment Analysis Approaches in Python

Dec 20, 20241h 13m

What are the current approaches for analyzing emotions within a piece of text? Which tools and Python packages should you use for sentiment analysis? This week, Jodie Burchell, developer advocate for data science at JetBrains, returns to the show to discuss modern sentiment analysis in Python.

### Episode 231: Good Python Programming Practices When New to the Language

Dec 06, 202451m

What advice would you give to someone moving from another language to Python? What good programming practices are inherent to the language? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 230: marimo: Reactive Notebooks and Deployable Web Apps in Python

Nov 29, 20241h

What are common issues with using notebooks for Python development? How do you know the current state, share reproducible results, or create interactive applications? This week on the show, we speak with Akshay Agrawal about the open-source reactive marimo notebook for Python.

### Episode 229: The Joy of Tinkering & Python Free-Threading Performance

Nov 22, 202445m

What keeps your spark alive for developing software and learning Python? Do you like to try new frameworks, build toy projects, or collaborate with other developers? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 228: Maintaining the Foundations of Python & Cautionary Tales

Nov 15, 20241h 9m

How do you build a sustainable open-source project and community? What lessons can be learned from Python's history and the current mess that the WordPress community is going through? This week on the show, we speak with Paul Everitt from JetBrains about navigating open-source funding and the start of the Python Software Foundation.

### Episode 227: New PEPs: Template Strings & External Wheel Hosting

Nov 08, 202447m

Have you wanted the flexibility of f-strings but need safety checks in place? What if you could have deferred evaluation for logging or avoiding injection attacks? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 226: PySheets: Spreadsheets in the Browser Using PyScript

Nov 01, 20241h 19m

What goes into building a spreadsheet application in Python that runs in the browser? How do you make it launch quickly, and where do you store the cells of data? This week on the show, we speak with Chris Laffra about his project, PySheets, and his book "Communication for Engineers."

### Episode 225: Python Getting Faster and Leaner & Ideas for Django Projects

Oct 25, 202443m

What changes are happening under the hood in the latest versions of Python? How are these updates laying the groundwork for a faster Python in the coming years? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 224: Narwhals: Expanding DataFrame Compatibility Between Libraries

Oct 18, 20241h

How does a Python tool support all types of DataFrames and their various features? Could a lightweight library be used to add compatibility for newer formats like Polars or PyArrow? This week on the show, we speak with Marco Gorelli about his project, Narwhals.

### Episode 223: Exploring the New Features of Python 3.13

Oct 11, 202455m

Python 3.13 is here! Our regular guests, Geir Arne Hjelle and Christopher Trudeau, return to discuss the new version. This year, Geir Arne coordinated a series of preview articles with members of the Real Python team and a showcase tutorial, "Python 3.13: Cool New Features for You to Try." Christopher's video course "What's New in Python 3.13" covers the topics from the article and shows the new features in action.

### Episode 222: Using Virtual Environments in Docker & Comparing Python Dev Tools

Sep 27, 202455m

Should you use a Python virtual environment in a Docker container? What are the advantages of using the same development practices locally and inside a container? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 221: Thriving as a Developer With ADHD

Sep 20, 20241h 6m

What are strategies for being a productive developer with ADHD? How can you help your team members with ADHD to succeed and complete projects? This week on the show, we speak with Chris Ferdinandi about his website and podcast "ADHD For the Win!"

### Episode 220: Configuring Git Pre-Commit Hooks & Estimating Software Projects

Sep 13, 202454m

How do you take advantage of Git pre-commit hooks? How do you build custom software checks and rules that run every time you commit your code? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 219: Astrophysics and Astronomy With Python & PyCon Africa 2024

Sep 06, 20241h 6m

Are you interested in practicing your Python skills while learning how to solve astrophysics and astronomy problems? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 218: Exploring Robotics and Python Through Electronic Projects

Aug 23, 20241h 6m

Are you interested in learning robotics with Python? Can physical electronics-based projects grow a child's interest in coding? This week on the show, we speak with author Marwan Alsabbagh about his book "Build Your Own Robot - Using Python, CRICKIT, and Raspberry Pi."

### Episode 217: Packaging Data Analyses & Using pandas GroupBy

Aug 16, 202455m

What are the best practices for organizing data analysis projects in Python? What are the advantages of a more package-centric approach to data science? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 216: Learning Through Building the Black Python Devs Community

Aug 09, 20241h 12m

What hurdles must be cleared when starting an international organization? How do you empower others in a community by sharing responsibilities? This week on the show, we speak with Jay Miller about Black Python Devs.

### Episode 215: Using GraphQL in Django With Strawberry & Prototype Purgatory

Aug 02, 202449m

How do you integrate GraphQL into your Python web development? How about quickly building graph-based APIs inside Django's battery-included framework? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 214: Build Captivating Display Tables in Python With Great Tables

Jul 26, 20241h 10m

Do you need help making data tables in Python look interesting and attractive? How can you create beautiful display-ready tables as easily as charts and graphs in Python? This week on the show, we speak with Richard Iannone and Michael Chow from Posit about the Great Tables Python library.

### Episode 213: Constraint Programming & Exploring Python's Built-in Functions

Jul 19, 202448m

What are discrete optimization problems? How do you solve them with constraint programming in Python? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects

### Episode 212: Digging Into Graph Theory in Python With David Amos

Jul 12, 20241h 4m

Have you wondered about graph theory and how to start exploring it in Python? What resources and Python libraries can you use to experiment and learn more? This week on the show, former co-host David Amos returns to talk about what he's been up to and share his knowledge about graph theory in Python.

### Episode 211: Python Doesn't Round Numbers the Way You Might Think

Jul 05, 202448m

Does Python round numbers the same way you learned back in math class? You might be surprised by the default method Python uses and the variety of ways to round numbers in Python. Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 210: Creating a Guitar Synthesizer & Generating WAV Files With Python

Jun 28, 202455m

What techniques go into synthesizing a guitar sound in Python? What higher-level programming and Python concepts can you practice while building advanced projects? This week on the show, we talk with Real Python author and core team member Bartosz Zaczyński about his recent step-by-step project, Build a Guitar Synthesizer: Play Musical Tablature in Python.

### Episode 209: Python's Command-Line Utilities & Music Information Retrieval Tools

Jun 21, 202451m

What are the built-in Python modules that can work as useful command-line tools? How can these tools add more functionality to Windows machines? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 208: Detecting Outliers in Your Data With Python

Jun 14, 20241h 7m

How do you find the most interesting or suspicious points within your data? What libraries and techniques can you use to detect these anomalies with Python? This week on the show, we speak with author Brett Kennedy about his book "Outlier Detection in Python."

### Episode 207: Decomposing Software Problems & Avoiding the Trap of Clever Code

Jun 07, 202455m

How do you effectively break a software problem into individual steps? What are signs you're writing overly clever code? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 206: Building Python Unit Tests & Exploring a Data Visualization Gallery

May 31, 202442m

How do you start adding unit tests to your Python code? Can the built-in unittest framework cover most or all of your needs? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 205: Considering Accessibility & Assistive Tech as a Python Developer

May 17, 20241h 1m

What's it like to learn Python as a visually impaired or blind developer? How can you improve the accessibility of your Python web applications and learn current guidelines? This week on the show, Real Python community member Audrey van Breederode discusses her programming journey, web accessibility, and assistive technology.

### Episode 204: Querying OpenStreetMaps via API & Lazy Evaluation in Python

May 10, 202453m

Would you like to get more practice working with APIs in Python? How about exploring the globe using the data from OpenStreetMap? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 203: Embarking on a Relaxed and Friendly Python Coding Journey

May 03, 20241h 4m

Do you get stressed while trying to learn Python? Do you prefer to build small programs or projects as you continue your coding journey? This week on the show, Real Python author Stephen Gruppetta is here to talk about his new book, "The Python Coding Book."

### Episode 202: Pydantic Data Validation & Python Web Security Practices

Apr 26, 202459m

How do you verify and validate the data coming into your Python web application? What tools and security best practices should you consider as a developer? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 201: Decoupling Systems to Get Closer to the Data

Apr 19, 20241h 9m

What are the benefits of using a decoupled data processing system? How do you write reusable queries for a variety of backend data platforms? This week on the show, Phillip Cloud, the lead maintainer of Ibis, will discuss this portable Python dataframe library.

### Episode 200: Avoiding Error Culture and Getting Help Inside Python

Apr 12, 20241h 5m

What is error culture, and how do you avoid it within your organization? How do you navigate alert and notification fatigue? Hey, it's episode #200! Real Python's editor-in-chief, Dan Bader, joins us this week to celebrate. Christopher Trudeau also returns to bring another batch of PyCoder's Weekly articles and projects.

### Episode 199: Leveraging Documents and Data to Create a Custom LLM Chatbot

Apr 05, 20241h 8m

How do you customize a LLM chatbot to address a collection of documents and data? What tools and techniques can you use to build embeddings into a vector database? This week on the show, Calvin Hendryx-Parker is back to discuss developing an AI-powered, Large Language Model-driven chat interface.

### Episode 198: Build a Video Game With Python Turtle & Visualize Data in Seaborn

Mar 29, 202449m

Can you build a Space Invaders clone using Python's built-in turtle module? What advantages does the Seaborn data visualization library provide compared to Matplotlib? Christopher Trudeau is back on the show this week, along with special guest Real Python core team member Bartosz Zaczyński. We're sharing another batch of PyCoder's Weekly articles and projects.

### Episode 197: Using Python in Bioinformatics and the Laboratory

Mar 22, 202450m

How is Python being used to automate processes in the laboratory? How can it speed up scientific work with DNA sequencing? This week on the show, Chemical Engineering PhD Student Parsa Ghadermazi is here to discuss Python in bioinformatics.

### Episode 196: Exploring Duck Typing in Python & Dynamics of Monkey Patching

Mar 15, 202450m

What are the advantages of determining the type of an object by how it behaves? What coding circumstances are not a good fit for duck typing? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 195: Building a Healthy Developer Mindset While Learning Python

Mar 08, 20241h

How do you get yourself unstuck when facing a programming problem? How do you develop a positive developer mindset while learning Python? This week on the show, Bob Belderbos from Pybites is here to talk about learning Python and building healthy developer habits.

### Episode 194: Automate Tasks With Python & Building a Small Search Engine

Mar 01, 202444m

What are the typical computer tasks you do manually every week? Could you automate those tasks with a Python script? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 193: Wes McKinney on Improving the Data Stack & Composable Systems

Feb 23, 20241h 9m

How do you avoid the bottlenecks of data processing systems? Is it possible to build tools that decouple storage and computation? This week on the show, creator of the pandas library Wes McKinney is here to discuss Apache Arrow, composable data systems, and community collaboration.

### Episode 192: Practical Python Decorator Uses & Avoiding datetime Pitfalls

Feb 16, 202457m

What are real-life examples of using Python decorators? How can you harness their power in your code? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 191: Focusing on Data Science & Less on Engineering and Dependencies

Feb 09, 20241h 1m

How do you manage the dependencies of a large-scale data science project? How do you migrate that project from a laptop to cloud infrastructure or utilize GPUs and multiple instances in parallel? This week on the show, Savin Goyal returns to discuss the updates to the open-source framework Metaflow.

### Episode 190: Great Starting Points for Contributing to Open Source

Feb 02, 20241h 19m

What's it like to sit down for your first developer sprint at a conference? How do you find an appropriate issue to work on as a new open-source contributor? This week on the show, author and software engineer Stefanie Molin is here to discuss starting to contribute to open-source projects.

### Episode 189: Building a Python Debugger & Preparing for NumPy 2.0

Jan 26, 202447m

How does a debugger work? What can you learn about Python by building one from scratch? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 188: Measuring Bias, Toxicity, and Truthfulness in LLMs With Python

Jan 19, 20241h 15m

How can you measure the quality of a large language model? What tools can measure bias, toxicity, and truthfulness levels in a model using Python? This week on the show, Jodie Burchell, developer advocate for data science at JetBrains, returns to discuss techniques and tools for evaluating LLMs With Python.

### Episode 187: Serializing Data With Python & Underscore Naming Conventions

Jan 12, 202454m

Do you need to transfer an extensive data collection for a science project? What's the best way to send executable code over the wire for distributed processing? What are the different ways to serialize data in Python? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 186: Exploring Python in Excel

Jan 05, 20241h 14m

Are you interested in using your Python skills within Excel? Would you like to share a data science project or visualization as a single Office file? This week on the show, we speak with Principal Architect John Lam and Sr. Cloud Developer Advocate Sarah Kaiser from Microsoft about Python in Excel.

### Episode 185: 2023 Real Python Tutorial & Video Course Wrap-Up

Dec 29, 202353m

Three members of the Real Python team are joining us this week: Kate Finegan, Tappan Moore, and Philipp Acsany. We wanted to share a year-end wrap-up with tutorials, step-by-step projects, code conversations, and video courses that showcase what our team created this year.

### Episode 184: PyCoder's Weekly 2023 Wrap Up

Dec 22, 202338m

It's been a fascinating year for the Python language and community. PyCoder's Weekly included over 1,500 links to articles, blog posts, tutorials, and projects in 2023. Christopher Trudeau is back on the show this week to help wrap up everything by sharing some highlights and Python trends from across the year.

### Episode 183: Exploring Code Reviews in Python and Automating the Process

Dec 08, 20231h 6m

What goes into a code review in Python? Is there a difference in how a large organization practices code review compared to a smaller one? What do you do if you're a solo developer? This week on the show, Brendan Maginnis and Nick Thapen from Sourcery return to talk about code review and automated code assistance.

### Episode 182: Building a Python JSON Parser & Discussing Ideas for PEPs

Dec 01, 202356m

Have you thought of a way to improve the Python language? How do you share your idea with core developers and start a discussion in the Python community? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 181: Computational Thinking & Learning Python During an AI Revolution

Nov 17, 202354m

Has the current growth of artificial intelligence (AI) systems made you wonder what the future holds for Python developers? What are the hidden benefits of learning to program in Python and practicing computational thinking? This week on the show, we speak with author Lawrence Gray about his upcoming book "Mastering Python: A Problem Solving Approach."

### Episode 180: Studying Python Software Architecture & Creating Lambda Expressions

Nov 10, 202348m

Have you moved through the fundamentals of Python, and are you now considering building a more extensive project or complete application? Where can you study the architecture of existing Python projects and learn best practices? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 179: Improving Your Git Developer Experience in Python

Nov 03, 202356m

Are you getting by with a few fundamental commands for Git when building your Python projects? Would you like to improve your version control techniques and become more efficient with the Git command line? This week on the show, Adam Johnson is back to talk about his new book, "Boost Your Git DX."

### Episode 178: Guiding Scientific Python Library Development

Oct 27, 202357m

How do you prepare a scientific Python project for sharing with others? Could you use some best practices and guidance for packaging, documentation, and testing? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 177: Welcoming PyPI's Safety & Security Engineer Mike Fiedler

Oct 20, 202358m

You may remember a recent Python Package Index (PyPI) announcement about hiring a full-time security engineer. We've also mentioned several current security initiatives from PyPI. This week on the show, we talk with Mike Fiedler about accepting this new role and securing accounts on PyPI.

### Episode 176: Building Python Best Practices and Fundamental Skills

Oct 13, 20231h 3m

What fundamental developer skills are new Python users missing? What best practices might developers without a computer science background be lacking? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 175: Exploring the New Features of Python 3.12

Oct 06, 20231h 6m

Python 3.12 is here! Our regular guests, Geir Arne Hjelle and Christopher Trudeau, return to discuss the new version. Geir Arne coordinated a series of preview articles with several members of the Real Python team this year, and his showcase tutorial, "Python 3.12: Cool New Features for You to Try," came out on October 2. Christopher's video course was posted the next day, covering the topics from the article with visual examples of Python 3.12 in action.

### Episode 174: Considering ChatGPT's Technical Review of a Programming Book

Sep 29, 20231h 10m

What can you learn from feeding an entire book on Python programming into ChatGPT-4 and asking it to provide a technical review? What are the potential pitfalls of using an LLM as a learning tool? This week on the show, author Al Sweigart talks about his recent experiments using ChatGPT and Python.

### Episode 173: Getting Involved in Open Source & Generating QR Codes With Python

Sep 22, 202347m

Have you thought about contributing to an open-source Python project? What are possible entry points for intermediate developers? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 172: Measuring Multiple Facets of Python Performance With Scalene

Sep 15, 20231h 3m

When choosing a tool for profiling Python code performance, should it focus on the CPU, GPU, memory, or individual lines of code? What if it looked at all those factors and didn't alter code performance while measuring it? This week on the show, we talk about Scalene with Emery Berger, Professor of Computer Science at the University of Massachusetts Amherst.

### Episode 171: Making Each Line of Code Efficient & Python In Excel

Sep 08, 202350m

Are you writing efficient Python with as few lines of code as possible? Are you familiar with the many built-in language features that will simplify your code and make it more Pythonic? Christopher Trudeau is back on the show this week, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 170: Finding the Right Coding Font for Programming in Python

Sep 01, 20231h 5m

What should you consider when picking a font for coding in Python? What characters and their respective glyphs should you check before making your decision? This week on the show, we talk with Real Python author and core team member Philipp Acsany about his recent article, Choosing the Best Coding Font for Programming.

### Episode 169: Improving Classification Models With XGBoost

Aug 25, 20231h 5m

How can you improve a classification model while avoiding overfitting? Once you have a model, what tools can you use to explain it to others? This week on the show, we talk with author and Python trainer Matt Harrison about his new book Effective XGBoost: Tuning, Understanding, and Deploying Classification Models.

### Episode 168: Common Python Stumbling Blocks & Quirky Behaviors

Aug 11, 202349m

Have you ever encountered strange behavior when trying something new in Python? What are common quirks hiding within the language? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 167: Exploring pandas 2.0 & Targets for Apache Arrow

Aug 04, 20231h 14m

What are the new ways to describe your data in pandas 2.0? Will the addition of Apache Arrow to the data back end foster the growth of data interoperability? This week on the show, we talk with pandas core developer Marc Garcia about the release of pandas 2.0.

### Episode 166: Differentiating the Versions of Python & Unlocking IPython's Magic

Jul 28, 202346m

What are all the different versions of Python? You may have heard of Cython, Brython, PyPy, or others and wondered where they fit into the Python landscape. This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 165: Leveraging the Features of Your Database With Postgres and Python

Jul 21, 20231h

Are you getting the most out of your Postgres database? What features could you leverage to improve your Python project? This week on the show, Craig Kerstiens from Crunchy Data is here to discuss getting the most out of Postgres.

### Episode 164: Constructing Python Library APIs & Tackling Jinja Templating

Jul 14, 202350m

What principles should you consider when designing a Python library? How do you construct a library API that's understandable and easy to use? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 163: Python Crash Course & Learning Enough to Start Creating

Jul 07, 20231h 13m

How much Python do you need to learn to start creating projects? What's a good balance of information and hands-on practice? This week on the show, Eric Matthes is here to discuss his book Python Crash Course.

### Episode 162: Exploring the Zen of Python & pandas Features for Finance

Jun 30, 202350m

What advice can you extract from the Zen of Python? How can these nineteen guiding principles help you write more idiomatic Python? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 161: Resources and Advice for Building CircuitPython Projects

Jun 23, 20231h 13m

Are you looking to advance your CircuitPython projects? Would you like a collection of resources and tools to help you along your path? This week on the show, Tod Kurt is here to discuss building projects with CircuitPython.

### Episode 160: Inheriting a Large Python Code Base & Building a GUI With Kivy

Jun 16, 202349m

What are the unique challenges of a large Python code base? What techniques can you implement to simplify the management of a big project? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 159: Volunteering, Organizing, and Finding a Python Community

Jun 09, 20231h

Have you thought about getting more involved in the Python community? Are you interested in volunteering for an event or becoming an organizer? This week on the show, we speak with organizers from this year's PyCascades conference about making connections, learning new skills, and rationing your time.

### Episode 158: Building Python CI With Docker & Applying for a Hacker Initiative Grant

Jun 02, 202352m

Do you need a refresher on using Docker with Python? Would you like to learn how to configure a continuous integration pipeline with modern tools and Docker? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 157: Discussing Mojo & Improving Python Object-Oriented Programming

May 26, 202354m

Would you like to speed up your Python machine-learning code dramatically? What if you only had to change a few keywords and add a couple of type hints on portions of your code? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 156: Virtual Environment Structure & Surveying the Packaging Ecosystem

May 12, 20231h 9m

How do Python virtual environments work under the hood? How does understanding these concepts help you with managing them for your projects? This week on the show, CPython core developer Brett Cannon returns to discuss his recent articles about virtual environments and the Python packaging landscape.

### Episode 155: Checking Project Dependencies & Python Dev Resource Collections

May 05, 202338m

How can you ensure that you've appropriately declared your project's required dependencies? How do you determine what dependencies are missing from a third-party project that you can't run? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 154: Targeting WebAssembly Platforms & Distilling a Minimum Viable Python

Apr 28, 20231h 19m

Are you familiar with the different versions of WebAssembly? Could WASM be the "write once, run everywhere" solution that developers have searched for? Where does distributing Python applications fit in the narrative? This week on the show, we have CPython core developer Brett Cannon to discuss his recent articles about WebAssembly and MVPy.

### Episode 153: Seeking Faster Text Processing & Python's .__repr__() vs .__str__()

Apr 14, 202342m

What can you do if your text manipulation in Python is slowing you down? Are there faster alternatives using a compiled extension? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 152: Automate Processes and Distribute Python Tools With RPA and RCC

Apr 07, 202349m

Are you exploring automation of your repetitive business tasks with Python? How are you going to share your helpful tools with co-workers? This week on the show, Sampo Ahokas from Robocorp is here to discuss robotic process automation (RPA) and distribution of these robots.

### Episode 151: Evaluating Python Packages & Celebrating 20 Years of PyCon US

Mar 31, 20231h

Have you ever installed a Python package without knowing anything about it? What best practices should you employ to ensure the quality of your next package installation? Christopher Trudeau is back this week, bringing another batch of PyCoder's Weekly articles and projects. We also have Python Software Foundation executive director, Deb Nicholson, to share details about PyCon US 2023.

### Episode 150: Lessons Learned From Four Years Programming With Python

Mar 24, 20231h 2m

What are the core lessons you've learned along your Python development journey? What are key takeaways you would share with new users of the language? This week on the show, Duarte Oliveira e Carmo is here to discuss his recent talk, "Four Years of Python."

### Episode 149: Coding With namedtuple & Python's Dynamic Superpowers

Mar 17, 202353m

Have you explored Python's collections module? Within it, you'll find a powerful factory function called namedtuple(), which provides multiple enhancements over the standard tuple for writing clearer and cleaner code. This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 148: Sharing Your Python App Across Platforms With BeeWare

Mar 10, 20231h 11m

Are you interested in deploying your Python project everywhere? This week on the show, Russell Keith-Magee, founder and maintainer of the BeeWare project, returns. Russell shares recent updates to Briefcase, a tool that converts a Python application into native installers on macOS, Windows, Linux, and mobile devices.

### Episode 147: Django Deployment Strategies & Preparing for PyCascades 2023

Mar 03, 20231h 7m

Have you decided how you're going to deploy your Django project? Should you use a VPS or a PaaS? Christopher Trudeau is back this week, bringing another batch of PyCoder's Weekly articles and projects. We also have organizers from PyCascades to share details about this year's hybrid in-person and virtual conference.

### Episode 146: Using NumPy and Linear Algebra for Faster Python Code

Feb 24, 20231h 8m

Are you still using loops and lists to process your data in Python? Have you heard of a Python library with optimized data structures and built-in operations that can speed up your data science code? This week on the show, Jodie Burchell, developer advocate for data science at JetBrains, returns to share secrets for harnessing linear algebra and NumPy for your projects.

### Episode 145: Creating a Python Wordle Clone & Testing Environments With Nox

Feb 17, 202359m

Would you like to practice your Python skills while building a challenging word game? Have you been wanting to learn more about creating command-line interfaces and  making them colorful and interactive? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 144: Wrangling Business Process Models With Python and SpiffWorkflow

Feb 10, 202352m

Can you describe your business processes with flowcharts? What if you could define the steps in a standard notation and implement the workflows in pure Python? This week on the show, Dan Funk from Sartography is here to discuss SpiffWorkflow.

### Episode 143: Create Interactive Maps & Geospatial Data Visualizations With Python

Feb 03, 20231h 2m

Would you like to quickly add data to a map with Python? Have you wanted to create beautiful interactive maps and export them as a stand-alone static web page? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 142: Orchestrating Large and Small Projects With Apache Airflow

Jan 27, 202354m

Have you worked on a project that needed an orchestration tool? How do you define the workflow of an entire data pipeline or a messaging system with Python? This week on the show, Calvin Hendryx-Parker is back to talk about using Apache Airflow and orchestrating Python projects.

### Episode 141: Exploring Python With bpython & Formalizing f-String Grammar

Jan 20, 202356m

Have you used the Python Read-Eval-Print Loop (REPL) to explore the language and learn about how it operates? Would it help if it provided syntax highlighting, definitions, and code completion and behaved more like an IDE? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 140: Speeding Up Your DataFrames With Polars

Jan 13, 202357m

How can you get more performance from your existing data science infrastructure? What if a DataFrame library could take advantage of your machine's available cores and provide built-in methods for handling larger-than-RAM datasets? This week on the show, Liam Brannigan is here to discuss Polars.

### Episode 139: Surveying Comprehension Constructs & Python Parallelism Infighting

Jan 06, 202344m

Have you embraced the use of comprehensions in your Python journey? Are you familiar with all the varieties of comprehension constructs? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 138: 2022 Real Python Tutorial & Video Course Wrap Up

Dec 23, 20221h 16m

It's been another year of changes at Real Python! The Real Python team has written, edited, curated, illustrated, and produced a mountain of Python material this year. We added some new members to the team, updated the site's features, and created new styles of tutorials and video courses.

### Episode 137: Start Using a Build System & Continuous Integration in Python

Dec 16, 20221h

What advantages can a build system provide for a Python developer? What new skills are required when working with a team of developers? This week on the show, Benjy Weinberger from Toolchain is here to discuss the Pants build system and getting started with continuous integration (CI).

### Episode 136: Package Python Code With pyproject.toml & Listing Files With pathlib

Dec 09, 202254m

How do you start packaging your code with pyproject.toml? Would you like to join a conversation that gently walks you through setting up your Python projects to share? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 135: Preparing Data to Measure True Machine Learning Model Performance

Dec 02, 202257m

How do you prepare a dataset for machine learning (ML)? How do you go beyond cleaning the data and move toward measuring how the model performs? This week on the show, Jodie Burchell, developer advocate for data science at JetBrains, returns to talk about strategies for better ML model performance.

### Episode 134: Building Python REST APIs With Flask & Structuring Pull Requests

Nov 25, 202257m

How do you build a REST API using the Flask web framework? How can you quickly add endpoints while automatically generating documentation? This week on the show, Real Python author Philipp Acsany is here to discuss his tutorial series "Python REST APIs With Flask, Connexion, and SQLAlchemy." Christopher Trudeau is also here with another batch of PyCoder's Weekly articles and projects.

### Episode 133: Moving Projects Away From Passwords With WebAuthn and Python

Nov 18, 202244m

What if you didn't have to worry about managing user passwords as a Python developer? That's where the WebAuthn protocol and new hardware standards are heading. This week on the show, Dan Moore from FusionAuth returns to discuss a password-less future.

### Episode 132: Creating Tic-Tac-Toe With an AI Player & Shortcuts for Python Decorators

Nov 11, 202254m

How do you create a computer opponent for a simple game within Python? Would you also like to learn how to adapt the game to run in a web browser or graphical user interface (GUI)? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 131: Exploring the New Features of Python 3.11

Nov 04, 20221h 2m

Python 3.11 is here! Our regular guests, Geir Arne Hjelle and Christopher Trudeau, return to talk about the new version. Geir Arne wrote a series of preview tutorials earlier this year, and his annual piece, titled "Python 3.11: Cool New Features for You to Try," was published on October 24. Christopher's video course came out the next day, covering the topics from the tutorial with visual examples of Python 3.11 in action.

### Episode 130: Fostering an Internal Python Community & Managing the 3.11 Release

Oct 21, 20221h 9m

Does your company have a plan for growing an internal Python community? What are the attributes to look for when bringing someone into your department? This week on the show, Pablo Galindo Salgado returns to talk about building community through the Python Guild at Bloomberg and managing the release of Python 3.11.

### Episode 129: Using an Ellipsis in Python & Goals for CPython 3.12

Oct 14, 202256m

Where should you use an ellipsis in Python? How does it behave as a placeholder in a script, project, or stub file? What are the next goals for the Faster CPython project? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 128: Using a Memory Profiler in Python & What It Can Teach You

Oct 07, 20221h 3m

Have you used a memory profiler to gauge the performance of your Python application? Maybe you're using it to troubleshoot memory issues when loading a large data science project. What could running a profiler show you about a codebase you're learning? This week on the show, Pablo Galindo Salgado returns to talk about Memray, a powerful tracing memory profiler.

### Episode 127: Explaining Access Control Using Python & Cautiously Handling Pickles

Sep 30, 202258m

Have you ever used code to help explain a topic? How can Python scripts be used to understand the intricacies of access control? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 126: Python as an Efficiency Tool for Non-Developers

Sep 23, 20221h 10m

Are you interested in using Python in an industry outside of software development? Would adding a few custom software tools increase efficiency and make your coworkers' jobs easier? This week on the show, Josh Burnett talks about using Python as a mechanical engineer.

### Episode 125: Improve Matplotlib With Style Sheets & Python Async for the Web

Sep 16, 202253m

Have you thought the standard output from Matplotlib is a bit generic looking? Would you like a quick way to add style and consistency to your data visualizations? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 124: Exploring Recursion in Python With Al Sweigart

Sep 09, 20221h 20m

Have you wanted to understand recursion and how to use it in Python? Are you familiar with the call stack and how it relates to tracebacks? This week on the show, Al Sweigart talks about his new book, "The Recursive Book of Recursion."

### Episode 123: Creating a Python Code Completer & More Abstract Syntax Tree Projects

Sep 02, 20221h 13m

How does a code completion tool work? What is an Abstract Syntax Tree, and how is it created in Python? How does an AST help you write programs and projects that inspect and modify your Python code? This week on the show, Meredydd Luff, co-founder of Anvil, shares his PyCon talk, "Building a Python Code Completer."

### Episode 122: Configuring a Coding Environment on Windows & Using TOML With Python

Aug 19, 20221h 1m

Have you attempted to set up a Python development environment on Windows before? Would it be helpful to have an easy-to-follow guide to get you started? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 121: Moving NLP Forward With Transformer Models and Attention

Aug 12, 202250m

What's the big breakthrough for Natural Language Processing (NLP) that has dramatically advanced machine learning into deep learning? What makes these transformer models unique, and what defines "attention?" This week on the show, Jodie Burchell, developer advocate for data science at JetBrains, continues our talk about how machine learning (ML) models understand and generate text.

### Episode 120: Inspiring Young People to Learn Python With Mission Encodeable

Aug 05, 202243m

Is there someone in your life you'd like to inspire to learn Python? Mission Encodeable is a website designed to teach people to code, built by two high-school students. This week on the show, Anna and Harry Wake talk about creating their site and motivating people to start coding.

### Episode 119: Natural Language Processing and How ML Models Understand Text

Jul 29, 202258m

How do you process and classify text documents in Python? What are the fundamental techniques and building blocks for Natural Language Processing (NLP)? This week on the show, Jodie Burchell, developer advocate for data science at JetBrains, talks about how machine learning (ML) models understand text.

### Episode 118: Creating Documentation With MkDocs & When to Use a Python dict

Jul 22, 202254m

How do you start building your project documentation? What if you had a tool that could do the heavy lifting and automatically write large portions directly from your code? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 117: Measuring Python Code Quality, Simplicity, and Maintainability

Jul 15, 20221h 6m

How maintainable is your Python code? Is it possible to hold the code for your functions in your head? When is it appropriate to use measurements in a code review? This week on the show, Reka Horvath and Ben Martineau from Sourcery are here to discuss their recent PyCon talk, "Actionable insights vs ranking: How to use and how NOT to use code quality metrics."

### Episode 116: Exploring Functional Programming in Python With Bruce Eckel

Jul 01, 20221h 14m

Would you like to explore the functional programming side of Python? What are the advantages of this approach, and what tools are built into the language? This week on the show, author Bruce Eckel talks about functional programming in Python.

### Episode 115: Digging Into PyScript & Preventing or Handling Python Errors

Jun 24, 202256m

Have you heard about PyScript? The brand-new framework has the community excited about building interactive Python applications that run entirely within the user's browser. Would you like to dig into the details beyond the "Hello World" examples? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 114: Getting Started in Python Cybersecurity and Forensics

Jun 17, 20221h 1m

Are you interested in a career in security using Python? Would you like to stay ahead of potential vulnerabilities in your Python applications? This week on the show, James Pleger talks about Python information security, incident response, and forensics.

### Episode 113: Build Streamlit Data Science Dashboards & Verbose Regex f-Strings

Jun 10, 202250m

Would you like a fast way to share your data science project results as an interactive dashboard instead of a Jupyter notebook? Streamlit is a library for creating simple web apps and dashboards using just Python. This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 112: Managing Large Python Data Science Projects With Dask

Jun 03, 202246m

What do you do when your data science project doesn't fit within your computer's memory? One solution is to distribute it across multiple worker machines. This week on the show, Guido Imperiale from Coiled talks about Dask and managing large data science projects through distributed computing.

### Episode 111: Questions for New Dependencies & Comparing Python Game Libraries

May 27, 202251m

What are the differences between the various Python game frameworks? Would it help to see a couple of game examples across several libraries to understand the distinctions? This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 110: Advantages of Protobuf for Serialization in Python

May 20, 202258m

Would you like a way to send structured serialized data between different platforms and languages? What if the data was self-documenting, could automatically generate Python code, and would validate itself? This week on the show, Liran Haimovitch talks about protocol buffers and communicating with microservices through Remote Procedure Calls (RPC).

### Episode 109: Start Testing Your Python with doctest & Pagination in Django

May 13, 202256m

Did you know you can add testing to your Python code while simultaneously documenting it? Using docstrings, you can create examples of how your functions should interact in a Python REPL and test them with the built-in doctest module. This week on the show, Christopher Trudeau is here, bringing another batch of PyCoder's Weekly articles and projects.

### Episode 108: Run Python in a Browser With Pyodide & The Power of f-Strings

May 06, 202256m

Have you heard about the projects working toward getting Python to run in the browser? Maybe you would like to try it out for yourself, by building an interactive Python REPL with Pyodide and WebAssembly (WASM). This week on the show, Christopher Trudeau is here, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 107: Type-Safe ORM With Prisma Client & Real Python at PyCon US 2022

Apr 22, 202258m

Are you using an Object-Relational Mapper (ORM) for your Python projects? What if it could work with SQL or No-SQL databases and be fully type-safe? This week on the show, Robert Craigie talks about Prisma Client Python.

### Episode 106: Class Constructors & Pythonic Image Processing

Apr 15, 202258m

Do you know the difference between creating a class instance and initializing it? Would you like an interactive tour of the Python Pillow library? This week on the show, Christopher Trudeau is here, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 105: Creating Better Error Messages for Python 3.10 & 3.11

Apr 08, 20221h 21m

What goes into creating those enhanced error messages in the latest versions of Python? How does the new PEG parser help to pinpoint where errors have occurred? This week on the show, Pablo Galindo Salgado talks about the work that goes into creating these improvements.

### Episode 104: Building a Hash Table in Python and Thoughtful REST API Design

Apr 01, 202253m

Do you understand how a hash table works? What if you could learn about building one while practicing test-driven development? What are best practices when designing a REST API? This week on the show, Christopher Trudeau is here, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 103: Becoming More Effective at Manipulating Data With Pandas

Mar 25, 202259m

Do you wonder if you're taking the right approach when shaping data in pandas? Is your Jupyter workflow getting out of hand? This week on the show, Matt Harrison talks about his new book, "Effective Pandas: Patterns for Data Manipulation."

### Episode 102: Making Your Notebook Interactive and Using Python's Assert

Mar 18, 202247m

Would you like to build visualizations that allow your audience to play with data? How do you effectively use Python's assert statement during development? This week on the show, Christopher Trudeau is here, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 101: Tools for Setting Up Python on a New Machine

Mar 11, 20221h 3m

There are many ways to get Python installed on your computer. If you were going to start fresh, what tools would you use? What if you need to manage multiple versions of Python and virtual environments? What about all the additional tools that make your coding workflow complete? This week on the show, Calvin Hendryx-Parker is here to talk about bootstrapping your Python environment.

### Episode 100: Defining Optional Arguments and Moving Beyond "Beginner" Python

Mar 04, 202253m

How do you define Python functions that accept optional arguments or default values? Are you wondering how to go beyond being a beginner with Python? This week on the show, Christopher Trudeau is here, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 99: OAuth 2 and Authentication Choices for Your Python Project

Feb 25, 202258m

Have you thought about what authentication system you want to use for your Python project? Should you use an existing Python library or a third-party service? This week on the show, Dan Moore is here to talk about authentication systems and OAuth 2.

### Episode 98: Drawing Fractals With Python and Working With a Weather API

Feb 18, 202251m

Have you been wanting to explore fractals and complex numbers in Python? Would you like to practice working with APIs in Python through a new project? This week on the show, Christopher Trudeau is here, and he's taking on the task of curating new issues of PyCoder's Weekly going forward. He'll be joining me as a cohost every other week and bringing a fresh batch of PyCoder's Weekly articles and projects.

### Episode 97: Improving Your Django and Python Developer Experience

Feb 11, 202249m

How often have you thought about your Developer Experience (DX)? How do you improve your workflow, find documentation, and simplify code formatting? This week on the show, Adam Johnson is here to talk about his new book, "Boost Your Django DX."

### Episode 96: Manipulating and Analyzing Audio in Python

Feb 04, 202259m

Would you like to experiment with analyzing or manipulating audio with Python? This week on the show, we have Braden Riggs from DolbyIO to discuss extracting audio features and Python libraries for reshaping audio. Braden shares techniques from his recent talk at PyData Global, "Unlocking More From Your Audio Data!"

### Episode 95: What Is a JIT and How Can Pyjion Speed Up Your Python?

Jan 28, 20221h 6m

How can you can speed up Python? Have you thought of using a JIT (Just-In-Time Compiler)? This week on the show, we have Real Python author and previous guest Anthony Shaw to talk about his project Pyjion, a drop-in JIT compiler for CPython 3.10.

### Episode 94: Designing for Users and Building a Social Network With Django

Jan 21, 202258m

Are you looking for a project to practice your Django skills? Designing the fundamental interactions of a social network is an instructive way to explore models and relationships while learning advanced Django skills. This week on the show, we talk with previous guest Martin Breuss about his new four-part series, "Build a Social Network With Django".

### Episode 93: Launching Python, Virtual Environments, and Locking Dependencies With Brett Cannon

Jan 14, 202250m

Would you like a simple command to launch your Python programs using the newest version of the language installed on your machine? This week on the show, we continue our conversation with Brett Cannon. Brett discusses his project, the Python Launcher for Unix.

### Episode 92: Continuing to Unravel Python's Syntactic Sugar With Brett Cannon

Jan 07, 202258m

A year ago, we had Brett Cannon on the show to discuss his blog series about unravelling Python's syntactic sugar. Brett has written 15 more entries in the series, and he returns to the show this week to continue our conversation. We dive into unravelling 'async' and 'await' statements and their relationship with Python's generators.

### Episode 91: 2021 Real Python Articles Wrap Up

Dec 24, 20211h 3m

It's been a year of change at Real Python! The Real Python team has written, edited, curated, illustrated, and produced a mountain of Python articles this year. We also added many new members to the team, updated the site's features, and created new styles of tutorials and projects.

### Episode 90: A Python Journey: Cyber Security, Automating AWS, and TDD

Dec 17, 202154m

The Python community continually grows, with many users coming from different languages and backgrounds. This week on the show, we talk with developer Hugh Tipping about his Python journey. Hugh is also a member of the Real Python community.

### Episode 89: Solving Advent of Code Puzzles With Python

Dec 10, 202157m

Are you ready to break open the first days of puzzles from the annual Advent of Code challenge? Advent of Code is an advent calendar of twenty-five programming puzzles published each December. Practicing solving puzzles is a great way to build your Python skills. This week on the show, we have previous guest and Real Python author Geir Arne Hjelle to discuss his recent article titled, "Advent of Code: Solving Your Puzzles With Python."

### Episode 88: Discussing Type Hints, Protocols, and Ducks in Python

Dec 03, 20211h 21m

There seem to be three kinds of Python developers: those unaware of type hints or have no opinion, ones that embrace them, and others who have an allergic reaction at the mention of them. Python is famously a dynamically typed language, but there are advantages to adding type hints to your code. This week on the show, we have Luciano Ramalho to discuss his recent talk titled, "Type hints, protocols, and good sense."

### Episode 87: Building a Content Aggregator and Working With RSS in Python

Nov 19, 202157m

Have you wanted to work with RSS feeds in Python? Maybe you're looking for a new project to build for your portfolio that uses Django, unit tests, and custom commands. This week on the show, we have Real Python author Ricky White to talk about his recent step-by-step project titled, "Build a Content Aggregator in Python."

### Episode 86: The Legacy of OLPC and Charismatic Pitfalls in Teaching Programming

Nov 12, 20211h 22m

Do you remember the One Laptop Per Child program? What went wrong, and what can we learn from the program's failure? What are the potential pitfalls of charismatic technology, and how can we avoid them when introducing students to programming? This week on the show, former guest Al Sweigart and author Morgan Ames are here to talk about her book "The Charisma Machine - The Life, Death, and Legacy of One Laptop per Child."

### Episode 85: Exploring Django Templates, Tags, and Filters

Nov 05, 20211h 1m

Are you getting the most out of the Django framework? It's a powerful web framework if you're not interested in reinventing the wheel. Django includes a useful template system with inheritance for composing reusable HTML. This week on the show, we have previous guest and Real Python author Christopher Trudeau to talk about his recent articles and courses about Django.

### Episode 84: Creating and Manipulating PDFs in Python With borb

Oct 29, 20211h 1m

Have you wanted to generate PDFs from your Python project? Many of the current libraries require designing the document down at the pixel level. Would you be interested in a tool that lets you specify the page layout while it handles the specific details of laying out the text? This week on the show, we talk with Joris Schellekens about his library for creating and manipulating PDFs named borb.

### Episode 83: Ready to Publish Your Python Packages?

Oct 22, 20211h 1m

Are you interested in sharing your Python project with the broader world? Would you like to make it easily installable using pip? How do you create Python packages that share your code in a scalable and maintainable way? This week on the show, Real Python author and former guest Dane Hillard returns to talk about his new book, "Publishing Python Packages."

### Episode 82: Welcoming the CPython Developer in Residence

Oct 15, 20211h 32m

Earlier this year, the Python Software Foundation announced the creation of the Developer in Residence role. The first Visionary Sponsors of the PSF have provided funding for this new role for one year. What development responsibilities does this job address? This week on the show, we talk to previous guest Łukasz Langa about becoming the first CPython Developer in Residence.

### Episode 81: Exploring the New Features of Python 3.10

Oct 08, 202154m

Python 3.10 is here! This week on the show, two former guests and Real Python authors return to talk about the new version. Geir Arne Hjelle's article was posted to the site Monday, and it's titled "Python 3.10: Cool New Features for You to Try". Christopher Trudeau's video course came out on Tuesday, and it covers the topics from the article with multiple visual examples of Python 3.10 code.

### Episode 80: Make Your Python App Interactive With a Text User Interface (TUI)

Oct 01, 20211h 2m

Have you wanted to create a Python application that goes further than a command-line interface? You would like it to have a friendly interface but don't want to make a GUI (Graphical User Interface) or web application. Maybe a TUI (Text User Interface)would be a perfect fit for the project. This week on the show, we have Will McGugan to talk about his projects Textual and Rich.

### Episode 79: Measuring Your Python Learning Progress

Sep 24, 202155m

Where are you along the path of learning Python? Do you feel like you're making progress? What are ways you can put the learning path into a more precise focus? This week on the show, we talk with previous guest Martin Breuss about his recent article "How Long Does It Take to Learn Python?"

### Episode 78: Learning Python Through Illustrated Stories

Sep 17, 202148m

Are you a visual learner? Does it help to have programming concepts shared with concrete examples and images? Would you like to see if your child might be interested in programming? This week on the show, we talk with author Shari Eskenas about her books, "A Day in Code - Python: Learn to Code in Python Through an Illustrated Story" and "Learn Python Through Nursery Rhymes & Fairy Tales."

### Episode 77: Advantages of Completing Small Python Projects

Sep 10, 20211h 9m

Are you a beginner or intermediate Python programmer who has made it through some of the fundamentals? Have you tried to tackle a big project but got stuck and frustrated? Completing some small projects might be the answer. This week on the show, we have author Al Sweigart and talk about his new book, "The Big Book of Small Python Projects."

### Episode 76: Harnessing Python's math Module and Exposing Practical Pandas Functions

Sep 03, 202150m

How well do you know Python's math module? Maybe you've used a few of the constants or arithmetic functions. You may be surprised by the amount of functionality hiding within this built-in library, and perhaps you don't need to reach for an additional outside library. This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 75: Building With CircuitPython & Constraints of Python for Microcontrollers

Aug 27, 20211h 24m

Can you make a version of Python that fits within the memory constraints of a microcontroller and have it still feel like Python? That is the intention behind CircuitPython. This week on the show, we have Scott Shawcroft, who is the project lead for CircuitPython.

### Episode 74: Python's Assignment Expressions and Fixing a Botched Release to PyPI

Aug 20, 202158m

Have you started to use Python's assignment expression in your code? Maybe you have heard them called the walrus operator. Now that the controversy over the introduction in Python 3.8 has settled down, how can you use assignment expressions effectively in your code? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 73: Supporting Python Open Source Projects and Maintainers

Aug 13, 20211h

How do you define open source software? What are the challenges an open source project and maintainers face? How do maintainers receive financial, legal, security, or other types of help? This week on the show, we have Josh Simmons from Tidelift and the Open Source Initiative to help answer these questions.

### Episode 72: Starting With FastAPI and Examining Python's Import System

Aug 06, 202145m

Have you heard of FastAPI?  An application programming interface is vital to make your software accessible to users across the internet. FastAPI is an excellent option for quickly creating a web API that implements best practices. This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 71: Start Using a Debugger With Your Python Code

Jul 30, 20211h 5m

Are you still sprinkling print statements throughout your code while writing it? Print statements are often clunky and offer only a limited view of the state of your code. Have you thought there must be a better way? This week on the show, we have Nina Zakharenko to discuss her conference talk titled "Goodbye Print, Hello Debugger."

### Episode 70: What Can You Do With Python and Counting Objects Using "Counter"

Jul 23, 202156m

How is Python being used today, and what can you do with the language? Do you want to develop software, dive into data science and math, automate parts of your job and  digital life, or work with electronics? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 69: Planning a Faster Future at the Python Language Summit

Jul 16, 202158m

Do you wonder what the future may hold for the Python language? Are there speed improvements coming soon? What if you could be in the room while the core developers discuss Python's future? This week on the show, we have Joanna Jablonski, who was invited to the Python Language Summit 2021 as a journalist to summarize and document the event.

### Episode 68: Exploring the functools Module and Complex Numbers in Python

Jul 09, 202155m

Are you ready to expand your Python knowledge into the intermediate to advanced territory? What tools are awaiting your discovery inside Python's functools module? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 67: Securing Your Python Software Supply Chain With Dustin Ingram

Jul 02, 20211h 11m

How well do you know your software supply chain? When you PIP install a package, what steps can you take to minimize the risk of installing something malicious? This week on the show, we have Dustin Ingram, a director of the Python Software Foundation (PSF) and a maintainer of the Python Package Index (PyPI).

### Episode 66: Practicing Python With CSV Files and Extracting Values With "filter()"

Jun 25, 202155m

Are you ready to practice your Python skills some more? There is a new set of practice problems prepared for you to tackle, and this time they're based on working with CSV files. This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 65: Expanding the International Python Community With the PSF

Jun 18, 20211h

The popularity of Python is continuing to grow Developers across the globe are embracing the language. How is Python being used in all of these different countries? How does an organization like the Python Software Foundation (PSF) work toward the goals in its mission statement for supporting and growing this international community? This week on the show, we have Marlene Mhangami, a PSF board member and part of the Diversity and Inclusion Work Group.

### Episode 64: Detecting Deforestation With Python & Using GraphQL With Django and Vue

Jun 11, 20211h 1m

Are you looking for an in-depth data science project to practice your skills on? Perhaps you would like to add new tools to your Python web development projects instead? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 63: Create Web Applications Using Only Python With Anvil

Jun 04, 20211h 11m

What if you could create an application and deploy it to the web with just Python? Wouldn't it be nice to skip the additional full-stack development steps of learning three different languages in addition to Python? That's the idea behind Anvil. This week on the show, we have Meredydd Luff, co-founder of Anvil.

### Episode 62: Selecting the Ideal Data Structure & Unravelling Python's "pass" and "with"

May 28, 202148m

How do you know you're using the correct data structure for your Python project? There are so many built into Python and even more that are importable from the collections module. This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects. We discuss a recent three-part video course on selecting the ideal data structure.

### Episode 61: Scaling Data Science and Machine Learning Infrastructure Like Netflix

May 21, 202159m

Would you move your data science project from a laptop to the cloud? Would you also like to have snapshots of your project saved along the way so that you can go back in time or share the state of your project with another team member? This week on the show, we have Savin Goyal from Netflix. Savin is the technical lead for machine learning infrastructure at Netflix. He joins us to talk about Metaflow, an open-source tool to simplify building, managing, and scaling data science projects.

### Episode 60: Building a Platform Game With Arcade and Covering Python News Monthly

May 14, 202154m

Did you know the Python Software Foundation is hiring! With the recent support of three Visionary Sponsors, the PSF has been able to open positions for a developer-in-residence and a Python packaging project manager. Real Python now has a monthly Python news article. Frequent guest of the show, David Amos compiles and summarizes the biggest Python news from the past month.

### Episode 59: Organizing and Restructuring DjangoCon Europe 2021

May 07, 202153m

Are you interested in learning more about Django? Would you like to meet other professionals and learn how they are using Django? DjangoCon Europe 2021 is virtual this year, and you can join in from anywhere in the world. This week on the show, we have Miguel Magalhães and David Vaz, two of the organizers of the conference.

### Episode 58: Podcast Rewind With Guest Highlights for 2020-2021

Apr 30, 202144m

This week's show is a bit different. We are taking a well-deserved short break, but we still wanted to share an episode with you. This rewind episode highlights clips from the many interviews over the past year or so of the show.

### Episode 57: Taking the Next Step in Python Game Development

Apr 23, 20211h 15m

Are you interested in creating video games but feel limited in what you can accomplish within Python? Is there a platform where you can take advantage of your Python skills and provide the benefits of a dedicated game engine? This week on the show, we have Paweł Fertyk. Paweł is a Real Python author and has been creating games as Miskatonic Studio for several years now.

### Episode 56: OrderedDict vs dict and Object Oriented Programming in Python vs Java

Apr 16, 202150m

Are you looking for a bit of order when working with dictionaries in Python? Are you aware that the Python dict has changed over the last several versions and now keeps items in order? Could you learn more about object-oriented programming in Python by comparing it to another language? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 55: Getting Started With Refactoring Your Python Code

Apr 09, 202158m

Do you think it's time to refactor your Python code? What should you think about before starting this task? This week on the show, we have Brendan Maginnis and Nick Thapen from Sourcery. Sourcery is an automated refactoring tool that integrates into your IDE and suggests improvements to your code.

### Episode 54: Building a Neural Network and How to Write Tests in Python

Apr 02, 202146m

Do you know how a neural network functions? What goes into building one from scratch using Python? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 53: Improving the Learning Experience on Real Python

Mar 26, 20211h 10m

If you haven't visited the website lately, then you're missing out on the updates to realpython.com! The site features a completely refreshed layout with multiple sections to help you take advantage of even more great educational Python content. This week on the show, we have Dan Bader, the person behind Real Python, and all these architectural changes.

### Episode 52: Connecting to MongoDB and Updates on the Python Packaging Landscape

Mar 19, 202145m

Have you heard about NoSQL databases, or wondered how to use one with Python? How does MongoDB store information and what packages can you use to connect this type of database to your Python project? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 51: Navigating Options for Deploying Your Python Application

Mar 12, 20211h 3m

What goes into the decision of how to host your Python code or application in the cloud? Which technology stack is the right size for your project? This week on the show, we have Calvin Hendryx-Parker. Calvin talks about cloud hosting options, infrastructure choices, and deployment tools.

### Episode 50: Consuming APIs With Python and Building Microservices With gRPC

Mar 05, 202153m

Have you wanted to get your Python code to consume data from web-based APIs? Maybe you've dabbled with the requests package, but you don't know what steps to take next. This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 49: The Challenges of Developing Into a Python Professional

Feb 26, 202151m

What's the difference between writing code for yourself and developing for others? What new  considerations do you need to take into account as a professional Python developer? This week on the show, we talk to Dane Hillard about his book "Practices of the Python Pro".

### Episode 48: Stochastic Gradient Descent and Deploying Your Python Scripts on the Web

Feb 19, 20211h 1m

Do you know the initial steps to get your Python script hosted on the web? You may have built something with Flask, but how would you stand it up so that you can share it with others? This week on the show, we have the previous guest Martin Breuss back on the show. Martin shares his recent article titled, "Python Web Applications: Deploy Your Script as a Flask App".  David Amos also returns, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 47: Unraveling Python's Syntax to Its Core With Brett Cannon

Feb 12, 20211h 32m

Do you feel like you understand how Python works under the hood? What is syntactic sugar, and how much of it should be in Python? This week on the show, we have Brett Cannon. Brett is a Python core developer and he's been working on a series of articles where he is unraveling the syntax of Python. His series is a fantastic resource for those wanting to learn how Python is structured and works at its core.

### Episode 46: C for Python Developers and Data Visualization With Dash

Feb 05, 202144m

Are you interested in building interactive dashboards with Python? How about a project that takes a flat data file all the way to a web-hosted interactive  dashboard? This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 45: Processing Images in Python With Pillow

Jan 29, 202147m

Are you interested in processing images in Python? Do you need to load and modify images for your Flask or Django website or CMS? Then you most likely will be working with Pillow, the friendly fork of PIL, the Python imaging library. This week on the show, we have Mike Driscoll, who is writing a new book about image processing in Python.

### Episode 44: Creating an Interactive Online Python Conference for PyCascades 2021

Jan 22, 20211h 4m

How do you create a virtual conference that retains the interactivity of an in-person event? What are the tools needed for talk submissions, ticketing, and live hosting? Can you find those tools written in Python? 
This week on the show, we have several of the organizers of the PyCascades 2021 conference. They share the process of restructuring a Python conference to meet those challenges.

### Episode 43: Deep Reinforcement Learning in a Notebook With Jupylet + Gaming and Synthesis

Jan 15, 20211h 2m

What is it like to design a Python library for three different audiences?  This week on the show, we have Nir Aides, creator of Jupylet. His new library is designed for deep reinforcement learning researchers, musicians interested in live music coding, and kids interested in learning to program. Everything is designed to run inside of a Jupyter notebook.

### Episode 42: What Is Data Engineering and Researching 10 Million Jupyter Notebooks

Jan 08, 202155m

Are you familiar with the role data engineers play in the modern landscape of data science and Python? Data engineering is a sub-discipline that focuses on the transportation, transformation, and storage of data.  This week on the show, David Amos is back, and he's brought another batch of PyCoder's Weekly articles and projects.

### Episode 41: 2020 Real Python Articles in Review

Dec 25, 202047m

It's been quite the year! The Real Python team has written, edited, curated, illustrated, and produced a mountain of Python articles this year. We also upgraded the site and membership with office hours, transcripts, this podcast, and much more. 

We are joined by two members of the Real Python team, David Amos and Joanna Jablonski. We wanted to share a year-end wrap-up with a collection of articles that showcase a diversity of Python topics and the quality of what our team created this year.

### Episode 40: How Python Manages Memory and Creating Arrays With np.linspace

Dec 18, 202057m

Have you wondered how Python manages memory? How are your variables stored in memory, and when do they get deleted? This week on the show, David Amos is here, and he has brought another batch of PyCoder's Weekly articles and projects.

Along with the Real Python article on Python memory management, we also talk about another article about creating even and non-even spaced arrays in Python with np.linspace.

### Episode 39: Generators, Coroutines, and Learning Python Through Exercises

Dec 11, 20201h 5m

Have you started to use generators in Python? Are you unsure why you would even use one over a regular function? How do you use the special "send" method and the "yield from" syntax? This week on the show, we have Reuven Lerner to talk about his PyCon Africa 2020 talk titled "Generators, coroutines, and nanoservices."

### Episode 38: Looping With enumerate() and Python GUIs With PyQt

Dec 04, 202043m

If you're coming to Python from a different language, you may not know about a useful tool for working with loops, Python's built-in enumerate function. This week on the show, David Amos is here, and he has brought another batch of PyCoder's Weekly articles and projects.

Along with the Real Python article covering the details of the enumerate function, we also talk about another article about constructing Python graphical user interface elements in PyQt.

### Episode 37: Teaching Python and Finding Resources for Students

Nov 27, 202049m

One of the best ways to learn something well is to teach it. This week on the show, we have Kelly Schuster-Paredes and Sean Tibor from the Teaching Python podcast.

Sean and Kelly teach middle school students Python and share their art and science of teaching Python on their podcast. They wanted to come on the show to talk about the Real Python articles, quizzes, and other resources they use when teaching their students.

### Episode 36: Sentiment Analysis, Fourier Transforms, and More Python Data Science

Nov 20, 202057m

Are you interested in learning more about Natural Language Processing? Have you heard of sentiment analysis? This week on the show, Kyle Stratis returns to talk about his new article titled, Use Sentiment Analysis With Python to Classify Movie Reviews. David Amos is also here, and all of us cover another batch of PyCoder’s Weekly articles and projects.

### Episode 35: Security and Authorization in Your Python Web Applications

Nov 13, 202051m

So you built a web application in Python. Now how are you going to authorize users? Security goes beyond authentication. Who gets to do what, where, and when? This week on the show, we have Sam Scott, chief technology officer from Oso. Oso is an open-source policy engine for authorization that you embed in your application.

### Episode 34: The Python Modulo Operator & Managing Data With SQLite and SQLAlchemy

Nov 06, 202052m

Are you ready to move beyond flat files for your data in Python? Maybe you're not sure where to start with databases and SQL. This week on the show, David Amos returns with another batch of PyCoder’s Weekly articles and projects. We cover a Real Python article about managing data with SQLite and SQLAlchemy.

### Episode 33: Going Beyond the Basic Stuff With Python and Al Sweigart

Oct 30, 20201h 27m

You probably have heard of the bestselling Python book, "Automate the Boring Stuff with Python."  What are the next steps after starting to dabble in the Python basics? Maybe you've completed some tutorials, created a few scripts, and automated repetitive tasks in your life. This week on the show, we have author Al Sweigart to talk about his new book, "Beyond the Basic Stuff with Python: Best Practices for Writing Clean Code."

### Episode 32: Our New "Python Basics" Book & Filling the Gaps in Your Learning Path

Oct 23, 202050m

Do you have gaps in your Python learning path? If you're like me, you may have followed a completely random route to learn Python. This week on the show, David Amos is here to talk about the release of the Real Python book, "Python Basics: A Practical Introduction to Python 3". The book is designed not only to get beginners up to speed but also to help fill in the gaps many intermediate learners may still have.

### Episode 31: Python Return Statement Best Practices and Working With the map() Function

Oct 16, 202046m

The Python return statement is such a fundamental part of writing functions. Is it possible you missed some best practices when writing your own return statements? This week on the show, David Amos returns with another batch of PyCoder’s Weekly articles and projects. We also talk functional programming again with an article on the Python map function and processing iterables without a loop.

### Episode 30: Exploring the New Features of Python 3.9

Oct 09, 20201h 14m

Python 3.9 has arrived! This week on the show, former guest and Real Python author Geir Arne Hjelle returns to talk about his recent article, "Python 3.9: Cool New Features for You to Try". Also joining the conversation is Real Python video course instructor and author Christopher Trudeau. Christopher has created a video course, which was released this week also, based on Geir Arne's article. We talk about time zones, merging dictionaries, the new parser, type hints, and more.

### Episode 29: Resolving Package Dependencies With the New Version of Pip

Oct 02, 20201h 9m

If you use Python, then you probably have used pip to install additional packages from the Python package index. Part of the magic behind pip is the dependency resolver, and there is a new version of it in the latest version of pip. This week on the show, we have Sumana Harihareswara and Georgia Bullen, who have been working on the recent releases of pip. Sumana is the project manager for pip, and Georgia has been working on pip's user experience (UX).

### Episode 28: Using Pylance to Write Better Python Inside of Visual Studio Code

Sep 25, 202050m

A big decision a developer has to make is what tool to use to write code? Would you like an editor that understands Python, and is there to help with suggestions, definitions, and analysis of your code? For many developers, its the free tool, Visual Studio Code. This week on the show, we have Savannah Ostrowski, program manager for the Python Language Server and Python in Visual Studio. We discuss Pylance, a new language server with fast, feature-rich language support for Python in VS Code.

### Episode 27: Preparing for an Interview With Python Practice Problems

Sep 18, 202047m

What is an effective way to prepare for a Python interview? Would you like a set of problems that increase in difficulty to practice and hone your Python skills?  This week on the show, we have Jim Anderson to talk about his new Real Python article, "Python Practice Problems: Get Ready for Your Next Interview."  This article provides several problems, which include skeleton code, unit tests, and solutions for you to compare your work.

### Episode 26: 5 Years Podcasting Python With Michael Kennedy: Growth, GIL, Async, and More

Sep 11, 20201h 27m

Why is Python pulling in so many new programmers? Maybe some of that growth is from Python being a full-spectrum language. This week on the show we have Michael Kennedy, the host of the podcast "Talk Python to Me". Michael reflects on five years of podcasting about Python, and many of the changes he has seen in the Python landscape.

### Episode 25: Data Version Control in Python and Real Python Video Transcripts

Sep 04, 20201h

Wouldn't it be nice to a use a form of version control for data? Something that would allow you to track and version your datasets and models. Well, that's what the tool called DVC is designed to do. This week on the show, David Amos is here and he's brought another batch of PyCoder’s Weekly articles and projects.

### Episode 24: Options for Packaging Your Python Application: Wheels, Docker, and More

Aug 28, 20201h 14m

Have you wondered, how should I package my Python code? You've written the application, but now you need to distribute it to the machines it's intended to run on. It depends on what the code is, the libraries it depends on, and with whom do you want to share it. This week on the show we have Itamar Turner-Trauring, creator of the website pythonspeed.com. We discuss his article "Options for Packaging Your Python Code: Wheels, Conda, Docker, and More," covering the how of sharing your code.

### Episode 23: Python Wheels and Pass by Reference in Python

Aug 21, 20201h 4m

Have you wondered what Python wheels are? How are they used to package Python code? Does Python use pass by value or pass by reference? This week on the show, David Amos is here to help answer these questions, and he has brought another batch of PyCoder’s Weekly articles and projects.

### Episode 22: Create Cross-Platform Python GUI Apps With BeeWare

Aug 14, 20201h 23m

Do you want to distribute your Python applications to other users who don't have or even use Python? Maybe you're interested in seeing your Python application run on iOS or Android mobile devices. This week on the show we have Russell Keith-Magee, the founder and maintainer of the BeeWare project. Russell talks about Briefcase, a tool that converts a Python application into native installers on macOS, Windows, Linux, and mobile devices.

### Episode 21: Exploring K-means Clustering and Building a Gradebook With Pandas

Aug 07, 20201h 1m

Do you  want to learn the how and when of implementing K-means clustering in Python? Would you like to practice your pandas skills with a real-world project? This week on the show, David Amos is back with another batch of PyCoder’s Weekly articles and projects.

### Episode 20: Building PDFs in Python with ReportLab

Jul 31, 202053m

Have you wanted to generate advanced reports as PDFs using Python? Maybe you want to build documents with tables, images, or fillable forms. This week on the show we have Mike Driscoll to talk about his book "ReportLab - PDF Processing with Python."

### Episode 19: Advanced Python Import Techniques and Managing Users in Django

Jul 24, 202051m

Would you like to clearly understand what's happening when you use the Python import keyword? Do you want to use modules more effectively to structure your code? Or maybe you're ready to move to the next level with your Django project by adding user management. This week on the show, David Amos is back with another batch of PyCoder's Weekly articles and projects.

### Episode 18: Ten Years of Flask: Conversation With Creator Armin Ronacher

Jul 17, 20201h 17m

This week on the show we have Armin Ronacher to talk about the first 10 years of Flask. Armin talks about the origins of Flask and the components that make up the framework. He talks about what goes into documenting a framework or API. He also talks about the community working on the ongoing development of Flask.

### Episode 17: Linear Programming, PySimpleGUI, and More

Jul 10, 202049m

Are you familiar with linear programming, and how it can be used to solve resource optimization problems? Would you like to free your Python code from a clunky command line and start making convenient graphical interfaces for your users? This week on the show, David Amos is back with another batch of PyCoder's Weekly articles and projects.

### Episode 16: Thinking in Pandas: Python Data Analysis the Right Way

Jul 03, 20201h 2m

Are you using the Python library Pandas the right way? Do you wonder about getting better performance, or how to optimize your data for analysis? What does normalization mean?  This week on the show we have Hannah Stepanek to discuss her new book "Thinking in Pandas".

### Episode 15: Python Regular Expressions, Views vs Copies in Pandas, and More

Jun 26, 202044m

Have you wanted to learn Regular Expressions in Python, but don't know where to start? Have you stumbled into the dreaded pink SettingWithCopyWarning in Pandas? This week on the show, we have David Amos from the Real Python team to discuss a recent two-part series on Regex in Python. We also talk about another recent article on the site about views vs copies in Pandas. David also brings a few other articles and projects from the wider Python community for us to discuss.

### Episode 14: Going Serverless with Python

Jun 19, 202054m

Would you like to run your Python code in the cloud without having to become an infrastructure engineer? Do you want to have Python functions that run when triggered by specific events? This week on the show we have Anthony Chu to discuss serverless computing and running python functions in the cloud. Anthony Chu is program manager for Microsoft's Azure Functions.

### Episode 13: PDFs in Python and Projects on the Raspberry Pi

Jun 12, 202045m

Have you wanted to work with PDF files in Python? Maybe you want to extract text, merge and concatenate files, or even create PDFs from scratch. Are you interested in building hardware projects using a Raspberry Pi? This week on the show we have David Amos from the Real Python team to discuss his recent article on working with PDFs. David also brings a few other articles from the wider Python community for us to discuss.

### Episode 12: Web Scraping in Python: Tools, Techniques, and Legality

Jun 05, 202050m

Do you want to get started with web scraping using Python? Are you concerned about the potential legal implications? What are the tools required and what are some of the best practices? This week on the show we have Kimberly Fessel to discuss her excellent tutorial created for PyCon 2020 online titled "It's Officially Legal so Let's Scrape the Web."

### Episode 11: Advice on Getting Started With Testing in Python

May 29, 202058m

Have you wanted to get started with testing in Python? Maybe you feel a little nervous about diving in deeper than just confirming your code runs. What are the tools needed and what would be the next steps to level up your Python testing? This week on the show we have Anthony Shaw to discuss his article on this subject. Anthony is a member of the Real Python team and has written several articles for the site.

### Episode 10: Python Job Hunting in a Pandemic

May 22, 20201h 19m

Do you know someone in the Python community who recently was let go from their job due to the pandemic? What does the job landscape currently look like? What are skills and techniques that will help you in your job search? This week we have Kyle Stratis on the show to discuss how he is managing his job search after just being let go from his data engineering job. Kyle is a member of the Real Python team and has written several articles for the site.

### Episode 9: Leveling Up Your Python Literacy and Finding Python Projects to Study

May 15, 20201h 16m

In your quest to become a better developer, how do you find Python code that is at your reading level? What are good code bases or projects to study? What are the things holding you back from leveling up your Python literacy? This week we have Cecil Phillip on the show to discuss all of these common questions. Cecil is a Senior Cloud Advocate at Microsoft.

### Episode 8: Docker + Python for Data Science and Machine Learning

May 08, 202055m

Docker is a common tool for Python developers creating and deploying applications, but what do you need to know if you want to use Docker for data science and machine learning? What are the best practices if you want to start using containers for your scientific projects? This week we have Tania Allard on the show. She is a Sr. Developer Advocate at Microsoft focusing on Machine Learning, scientific computing, research and open source.

### Episode 7: AsyncIO + Music, Origins of Black, and Managing Python Releases

May 01, 20201h 27m

Want to learn more about AsyncIO in Python, with an example where you can see and hear events being triggered in real-time? This week we have Łukasz Langa on the show. Łukasz has created a talk for PyCon 2020 online about using AsyncIO with Music.

### Episode 6: Python REST APIs and The Well-Grounded Python Developer

Apr 24, 202054m

Are you interested in building REST APIs with Flask and SQLAlchemy? This week we have Doug Farrell on the show. We talk about his four-part Real Python article series on Python REST APIs.

### Episode 5: Exploring CircuitPython

Apr 17, 20201h 3m

Have you ever wanted to explore using Python with electronics? CircuitPython is a great platform to get started with. This week we have Thea Flowers on the show. Thea has been creating several hardware projects based around CircuitPython, and she talks about getting started on the platform.

### Episode 4: Learning Python Through Errors

Apr 10, 20201h 10m

Do you get upset and frustrated when you experience errors running your Python code? This week we have Martin Breuss on the show. We discuss how to learn Python *through* errors, and how errors really are your friends.

### Episode 3: Effective Python and Python at Google Scale

Apr 03, 202042m

Have you been using Python for a while, but want to be more effective with your code?  This week we have Brett Slatkin on the show. We talk about the 2nd edition of his book Effective Python.

### Episode 2: Learn Python Skills While Creating Games

Mar 27, 202055m

Is game programming a good way to develop your Python programming skills? This week we have Jon Fincher on the show. Jon is an author on the Real Python team, and we talk about his recent articles on PyGame and Arcade.

### Episode 1: Python Decorators and Writing for Real Python

Mar 20, 202050m

Do you want to learn more about Python decorators? Have you ever wondered what goes on behind the scenes to create a Real Python article? In this first episode, We have Geir Arne Hjelle from the Real Python team on the show.

### Episode 0: About the Show

Mar 06, 20202m

A weekly Python podcast hosted by Christopher Bailey with interviews, coding tips, and conversation with guests from the Python community.
