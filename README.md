# Awesome Web Testing with Playwright

This repository contains the [Automation Panda](https://automationpanda.com/)'s official Playwright tutorial!

In this tutorial, you will progressively create and build a new test automation project using Playwright in TypeScript.
This GitHub repository provides:

1. an [`app`](/app/) directory with the web app to test
2. a [`tutorial`](/tutorial/) directory with all instructions by chapter
3. a [`chapter-code`](/chapter-code/) directory with example code for each chapter


## Prerequisites

You will need the following tools:

1. A recent version of [Node.js](https://nodejs.org/).
2. A good editor like [Visual Studio Code](https://code.visualstudio.com/) with the [Playwright extension](https://playwright.dev/docs/getting-started-vscode).
3. A [GitHub](https://github.com/) account with a [Git](https://git-scm.com/) client.


## Tutorial setup

Before starting this tutorial, clone this repository to your machine and set up the project:

```sh
# Clone the repository
git clone https://github.com/AutomationPanda/awesome-web-testing-playwright.git

# Change directory into the web app directory
cd awesome-web-testing-playwright/app

# Install the dependencies
npm install

# Initialize Playwright
npm init playwright@latest
```

Choose the default options for each prompt.
Choose YES to install the Playwright browsers.
This tutorial was created with Playwright 1.36.1,
but later versions of Playwright should be okay to use.

*Warning:*
**Complete these steps *before* taking this tutorial as part of a live session** (like at a conference or a webinar).
The Playwright browsers are a few hundred MBs large,
and you could fall behind if you are stuck waiting for slow downloads over WiFi.


## Tutorial instructions

There are eight chapters in total:

1. Setting modern web testing goals
2. Exploring Playwright's features
3. Writing our first test
4. Refactoring interactions with page objects
5. Breaking down tests by behaviors
6. Scaling tests with parallel execution
7. Running tests with GitHub Actions
8. Learning and practicing more

Chapter-by-chapter tutorial instructions are provided under the `tutorial` folder.
This repository also contains a branch for each chapter's example code.


## Ready to get started?

Go to [Chapter 1](tutorial/01-testing-goals.md) to start the tutorial!
