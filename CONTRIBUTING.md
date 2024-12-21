# ✨ Contributing Guide

First of all, thank you for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to ThunderDOM. These are just guidelines, not rules, so use your best judgment and feel free to propose changes to this document in a pull request.

Before contributing, we encourage you to read our [Code of Conduct](https://github.com/SedatUygur/ThunderDOM/blob/main/.github/CODE_OF_CONDUCT.md).

## Table of Contents

- [Reporting Bugs](#reporting-bugs)
  - [How Do I Submit A Good Bug Report?](#good-bug-report)
- [Suggesting Enhancements/Features](#suggesting-enhancements-and-features)
  - [How Do I Submit A Good Feature Request?](#good-feature-request)
- [Understanding the Project](#understanding-the-project)
  - [Prerequisite](#prerequisite)
  - [Project Structure](#project-structure)
- [Contributing to the Project](#contributing-to-the-project)
  - [Cloning the Repository (repo)](#cloning-the-repo)
  - [Making your Changes](#making-your-changes)
  - [Opening a Pull Request(PR)](#opening-a-pull-request)

## <span id="reporting-bugs">💣 Reporting Bugs</span>

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating a new issue, **[Perform a cursory search](https://github.com/SedatUygur/ThunderDOM/issues)** to see if the report exists. If it does, go through the discussion thread and leave a comment instead of opening a new one.

If you find a **Closed** issue that is the same as what you are experiencing, open a new issue and include a link to the original case in the body of your new one.

If you cannot find an open or closed issue addressing the problem, [open a new issue](https://github.com/SedatUygur/ThunderDOM/issues).

Be sure to include a **clear title and description**, as much **relevant information** as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### <span id="good-bug-report"> How Do I Submit A Good Bug Report?</span>

A good Bug Report should include the following:

- A clear and descriptive title for the bug report
- The exact steps to reproduce the bug
- The behavior you observed after following the steps
- The behavior you expected to see instead
- What might be causing the issue (if you have any idea)
- Screenshots or animated GIFs of the issue (if applicable)
- If you use the keyboard while following the steps, use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://gitlab.gnome.org/Archive/byzanz) on Linux.

[🔝 Back to top](#table-of-content)

## <span id="suggesting-enhancements-and-features">🛠 Suggesting Enhancements/Features</span>

We track Enhancements and Feature Requests as GitHub issues.

Before submitting an enhancement/feature request, **[perform a cursory search](https://github.com/SedatUygur/ThunderDOM/issues)** to see if the request exists. If it does, go through the conversation thread to see if there is additional information and contribute to the conversation instead of opening a new one.

If you find a **Closed** issue, go through the conversation thread to see if the feature has already been implemented or rejected. If not, you can open a new issue.

### <span id="good-feature-request">How Do I Submit A Good Feature Request?</span>

A good Feature Request should include the following:

- A clear and descriptive title of the request
- A detailed description of the request, including:
  - The problem you are trying to solve
  - How you are currently working around the lack of this feature
  - Any possible drawbacks of the feature
  - How the feature can be implemented
- An explanation of why this enhancement would be helpful to the project and the community
- Any links to resources or other projects that might help in implementing the feature

[🔝 Back to top](#table-of-content)

## <span id="understanding-the-project">✨ Understanding the Project</span>

Before contributing to the project, you need to understand the project structure and how it works. This section guides you through the project structure and how to run the project locally.

### <span id="prerequisite">Prerequisite</span>



### <span id="project-structure">Project Structure</span>

The project uses a [monorepo](https://monorepo.tools/) structure and is divided into three main folders:

1. 
2. 
3. 

#### 1. 



#### 2. 



#### 3. 



[🔝 Back to top](#table-of-content)

## <span id="contributing-to-the-project">📝 Contributing to the Project</span>

If you want to do more than report an issue or suggest an enhancement, you can contribute to the project by:

- cloning the repository (repo)
- making your changes
- opening a pull request

### <span id="cloning-the-repo">Cloning the Repository (repo)</span>

#### 1. Fork the repo

Click the fork button at the top right of the page to create a copy of this repo in your account, or go to the [ThunderDOM fork page](https://github.com/SedatUygur/ThunderDOM/fork).

After successfully forking the repo, you will be directed to your repo copy.

#### 2. Clone the forked repo

On your forked repo, click the green button that says `Code`. It will open a dropdown menu. Copy the link in the input with the label `HTTPS` or `GitHub CLI` depending on your preferred cloning mode.

For HTTPS, open up your terminal and run the following command:

```bash
git clone <your-clone-link>
# or
git clone https://github.com/<your-username>/ThunderDOM.git
```

Replace `<your-username>` with your GitHub username.

You can also clone the repo using the GitHub CLI. To do this, run the following command:

```bash
gh repo clone <your-username>/ThunderDOM
```

#### 3. Set up the project

To set up the project, navigate into the project directory and open up the project in your preferred code editor.

```bash
cd ThunderDOM
code . # Opens up the project in VSCode
```

Install the dependencies using npm. You need to have [npm](https://npmjs.com/) installed; see the [prerequisite](#prerequisite) section.

```bash
npm install
```

### <span id="making-your-changes">Making your Changes</span>

#### 1. Create a new branch

Create a new branch from the `main` branch. Your branch name should be descriptive of the changes you are making. E.g., `docs-updating-the-readme-file`. Some ideas to get you started:

- For Feature Updates: `feat-<brief 2-4 words-Description>-<ISSUE_NO>`
- For Bug Fixes: `fix-<brief 2-4 words-Description>-<ISSUE_NO>`
- For Documentation: `docs-<brief 2-4 words-Description>-<ISSUE_NO>`

To create a new branch, use the following command:

```bash
git checkout -b <your-branch-name>
```

#### 2. Run the project

The project is a mono repo containing the codes for the **website**, the **core ThunderDOM package**, the **playground**, and the **tests**.

If you want to run the website locally, you need to `cd` into the website folder before running the development server:

```bash
cd website # Takes you to the website mono-repo
npm run dev
```

#### 3. Make your changes

You are to make only one contribution per pull request. It makes it easier to review and merge. If you have multiple bug fixes or features, create separate pull requests for each.

#### 4. Commit your changes

Your commit message should give a concise idea of the issue you are solving. It should follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, as this helps us generate the project changelog automatically. A traditional structure of commit looks like so:

```bash
<type>(optional scope): <description>
```

To commit your changes, run the following command:

```bash
git add .
git commit -m "<your_commit_message>"
```

Eg:

```bash
git commit -m "feat: add support for Next.js"
```

#### 5. Clean up your code and push changes

After committing your changes, run the following command before pushing your local commits to the remote repository and ensure that all tests pass and there are no linting errors.

```bash
npm cleanup
npm lint
npm test
```

Once all tests and linting pass, push your local commits to your remote repository.

```bash
git push origin your-branch-name
```

### <span id="opening-a-pull-request">Opening a Pull Request(PR)</span>

#### 1. Create a new [Pull Request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

Go to the [ThunderDOM repository](https://github.com/SedatUygur/ThunderDOM/tree/main) and click the `compare & pull request` button or go to the [Pull Request page](https://github.com/SedatUygur/ThunderDOM/pulls) and click on the `New pull request` button. It will take you to the `Open a pull request` page.

> Note: Make sure your PR points to the `main` branch, not any other one.

#### 2. Wait for review

🎉 Congratulations! You've made your pull request! A maintainer will review and merge your code or request changes. If changes are requested, make them and push them to your branch. Your pull request will automatically track the changes on your branch and update.

[🔝 Back to top](#table-of-content)

## <span id="license">📄 License</span>

ThunderDOM is [MIT licensed](https://github.com/SedatUygur/ThunderDOM/blob/main/LICENSE).