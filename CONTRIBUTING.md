<h1 class="page-title">Contributing</h1>

Discovered a bug or have an idea for how the NPMap Builder might be improved? Can you write code, documentation, or Or maybe you are a coder, documenter, or ______ and you want to help improve the Builder.

Thanks!

If this is the first time you have submitted feedback, please take a minute to look at the guidelines below. Following them will ensure that your bug reports/enhancement requests can be easily turned into actionable tasks that maintainers of the Builder can act on.

## Reporting issues

A bug is a _demonstrable problem_. Please read the following guidance before reporting an issue:

1. Use the search to see if the issue has already been reported. If it already exists, do not open a new issue - simply comment on the existing one.
2. Isolate the problem and ensure that the issue is in NPMap itself and not in your code.
3. Create a [reduced test case](http://css-tricks.com/6263-reduced-test-cases/).
4. If possible, provide a link to a live example. You can use [jsFiddle](http://jsfiddle.net) to host examples.

Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) can you reproduce the problem in? All these details will make it easier for NPMap contributors to assess and fix any potential issues.

Here's an example of a good bug report:

> Short and descriptive title
>
> A summary of the issue and the environment in which it occurs. If applicable, include the steps required to reproduce the bug:
>
> 1. First step
> 2. Second step
> 3. Etc.
>
> `<url>` (a link to the reduced test case)
>
> Any other information you want to share that is relevant to the issue being reported. This might include the file or module name and the line numbers of the code that is causing the bug. You may also want to include potential solutions.

A good bug report should be clear and to the point, and should provide enough information for an NPMap contributor to assess and/or fix the bug without coming back to you for more information.

Ready to submit an issue? [Here you go](https://github.com/nationalparkservice/npmap/issues/).

## Pull requests

We encourage you to submit pull requests! These requests should remain focused in scope and should not contain commits that are unrelated to the feature you are adding or bug you are fixing.

If your contribution involves a significant amount of work or substantial changes to any part of the library, please open an issue to discuss it first.

Please follow this process. It's the best way to get your work included in the project:

1. [Fork](http://help.github.com/fork-a-repo/) the project.
2. Clone your fork (`git clone https://github.com/<your-username>/npmap.git`).
3. Add an `upstream` remote (`git remote add upstream https://github.com/nationalparkservice/npmap.git`).
4. Get the latest changes from upstream (`git pull upstream <dev-branch>`).
5. Create a new topic branch to contain your feature, change, or fix (`git checkout -b <topic-branch-name>`).
6. Make sure that your changes adhere to the [coding conventions](http://www.nps.gov/npmap/library/api/coding-conventions.html) used throughout the project - indentation, commenting, etc.
7. Commit your changes in logical chunks. Use git's [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up your commits before making them public. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your pull request may not be merged into the main project.
8. Locally merge (or rebase) the upstream branch into your topic branch.
9. Push your topic branch up to your fork (`git push origin <topic-branch-name>`).
10. [Open a Pull Request](http://help.github.com/send-pull-requests/) with a clear title and description. Please mention which browsers you tested in.