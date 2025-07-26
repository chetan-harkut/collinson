# Activity Ranking Search - Test Automation Suite

## Overview of Approach

This project demonstrates a structured testing approach for a city-based activity ranking feature powered by weather forecasts. The work is divided into three key stages:

**Manual Testing**: Covered basic UI validations, system integration checks, and ensured that weather-based ranking logic is functioning as expected.

**BDD Scenarios**: Real-world user flows were described using Gherkin syntax to ensure test coverage reflects actual usage patterns and edge cases.

**Automation**: Gherkin scenarios were implemented using Cucumber, TypeScript, and WebDriverIO. Test cases simulate end-user behavior including search actions, error handling, and activity ranking validation.

The code is designed to be modular and maintainable, with readable assertions and comments added for clarity.

---

## How AI Assisted

I used ChatGPT (GPT-4o) mainly as a sanity-checking and brainstorming tool to support the process, specifically for:

- Reviewing and polishing Gherkin syntax for better clarity and completeness.
- Cross-checking grammar and formatting of the `.md` documentation.
- Generating example test structures which I later refined and adapted based on the actual application flow.

All final implementations: manual test cases, BDD flows were curated and written by me to align with the real behavior and expectations of the feature. For code generation of Typescript AI was used.

---

## Omissions & Trade-offs

- Performance and load testing were intentionally skipped to focus on functional behavior.
- Cross-browser and device compatibility tests were not set up within the scope.
- Some manual edge validations (like network throttling) were noted but not automated.

The emphasis was on clean, readable, and behavior-driven test logic with reusable components.
