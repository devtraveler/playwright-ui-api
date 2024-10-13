# Playwright Framework for Web UI and API 
This framework is built for Web UI and API testing using Playwright Typescript programming language.
And while preparing this framework the Page Object Modal (POM) is used for Web UI tests. You can find the page objects under the page-objects folder. 
The web UI tests are also placed in the ui_tests folder. Moreover, the POM approach is utilized for the API tests as well.
You can find objects that relate to the corresponding microservice under the api-microservices folder.
And also the API tests are located under the api_tests folder.

## Prerequisites
Before running the requirements, make sure you downloaded Node.js
- Node.js (v18 or higher)
- VSCode IDE
Then clone the repo and type the given command below on the terminal to install Playwright 
- npm init playwright@latest

## To run the test file
- If you want to run the WEb UI tests in Chromium;
  - npx playwright test --project="UI - Chromium"
- If you want to run the API tests;
  - npx playwright test --project="API tests"

## Reach the HTML report
- npx playwright show-report 
- If you want to find the HTML report file named index.html, you should look under the playwright-report folder.
