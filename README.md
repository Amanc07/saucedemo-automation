# saucedemo-automation

This project contains UI automation suite for saucedemo application buildt using Playwright and Javascript following Page Object Model and industry best practices.

## Table of Contents
- [TestCoverage](#TestCoverage)
- [Prerequisites](#Prerequisites)
- [Installation and Test Execution](#installation-and-test-execution)


## TestCoverage
 1. should login successfully with valid credentials
 2. should fail to login with locked out user
 3. checkout product
 4. shows an error if last name is missing
 5. sort low to high

## Prerequisites
1. Node.js
2. npm
3. git

## Installation and Test Execution
1. clone or unzip the project
    cd saucedemo-automation
2. Playwright Initialization
   npm init playwright@latest
   follow the command as prompt on terminal
3. Run the test
   npx playwright test (default set ot headless)

   Note: The .env file is intentionally included to simplify setup and allow immediate execution. In real-world scenarios, environment variables should be managed securely and excluded from version control.
   The local Git history is included within the project folder.