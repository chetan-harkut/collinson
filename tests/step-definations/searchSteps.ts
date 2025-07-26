// searchSteps.ts 

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { browser, $, $$ } from '@wdio/globals';

// Step: Navigate to city search page
Given('the user is on the city search page', async () => {
  await browser.url('https://app-url.com'); // Enter your URL here
});

// Step: Type in the search box
When(/^the user types "([^"]*)" into the search box$/, async (input: string) => {
  const searchBox = await $('#search-box');
  await searchBox.waitForDisplayed({ timeout: 4000 });
  await searchBox.setValue(input);
});

// Step: Press Enter (optional in some cases)
When(/^the user types "([^"]*)" and presses enter$/, async (input: string) => {
  const searchBox = await $('#search-box');
  await searchBox.waitForDisplayed({ timeout: 4000 });
  await searchBox.setValue(input);
  await browser.keys('Enter');
});

// Step: Select a suggestion
When(/^selects "([^"]*)" from the suggestions$/, async (city: string) => {
  const suggestions = await $$('.suggestion-item');
  for (const item of suggestions) {
    const text = await item.getText();
    if (text === city) {
      await item.click();
      break;
    }
  }
});

// Step: Validate 7-day activities displayed
Then('the system should display 7-day weather-based activity rankings for the selected city', async () => {
  const cards = await $$('.activity-day'); // Adjust selector if needed
  expect(cards.length).to.be.at.least(7);
});

// Step: Handle no suggestions (edge case)
Then('the system should show a message "Cant fetch suggestions now" and not crash', async () => {
  const errorBox = await $('#error-message');
  await errorBox.waitForDisplayed({ timeout: 5000 });
  const text = await errorBox.getText();
  expect(text).to.include("Cant fetch suggestions now");
});

// Step: Error handling for invalid characters or input
Then(/^the system should show a message like "([^"]*)" or ignore the input$/, async (message: string) => {
  const errorBox = await $('#error-message');
  await errorBox.waitForDisplayed({ timeout: 5000 });
  const text = await errorBox.getText();
  expect(text).to.include(message);
});

// Step: Suggestions contain city names
Then(/^the system should display matching suggestions like "([^"]*)"$/, async (suggestion: string) => {
  const suggestions = await $$('.suggestion-item');
  const texts = await Promise.all(suggestions.map(el => el.getText()));
  const matched = texts.some(t => t.includes(suggestion));
  expect(matched).to.be.true;
});

// Step: Validate API response contains required fields
Then('each result should include Date, Activity name, Rank and Reasoning', async () => {
  const cards = await $$('.activity-card'); // Adjust selectors
  for (const card of cards) {
    const date = await card.$('.date').getText();
    const name = await card.$('.activity-name').getText();
    const rank = parseInt(await card.$('.rank').getText(), 10);
    const reason = await card.$('.reason').getText();

    expect(date).to.not.be.empty;
    expect(name).to.not.be.empty;
    expect(rank).to.be.within(1, 10);
    expect(reason).to.not.be.empty;
  }
});

// Step: Weather data not available
Then('the system should display "Weather data not available for this location"', async () => {
  const errorBox = await $('#error-message');
  await errorBox.waitForDisplayed({ timeout: 5000 });
  const text = await errorBox.getText();
  expect(text).to.include('Weather data not available');
});

// Step: Activity rank check for clear weather
Then(/^activities like "([^"]*)" or "([^"]*)" should have high ranks with reason "([^"]*)"$/, async (activity1: string, activity2: string, reasonText: string) => {
  const cards = await $$('.activity-card');
  let matched = false;
  for (const card of cards) {
    const name = await card.$('.activity-name').getText();
    const rank = parseInt(await card.$('.rank').getText(), 10);
    const reason = await card.$('.reason').getText();

    if ((name === activity1 || name === activity2) && rank >= 8 && reason.includes(reasonText)) {
      matched = true;
      break;
    }
  }
  expect(matched).to.be.true;
});

// Step: Spinner visible during slow response
Then('a loading spinner should be visible', async () => {
  const spinner = await $('#loading-spinner');
  await spinner.waitForDisplayed({ timeout: 5000 });
});

// Step: Timeout message after delay
Then('a timeout message should be displayed', async () => {
  const timeoutMsg = await $('#timeout-message');
  await timeoutMsg.waitForDisplayed({ timeout: 10000 });
  const msg = await timeoutMsg.getText();
  expect(msg.toLowerCase()).to.include('timeout');
});

// Step: Connection lost handling
Then('the system should show "Connection lost. Please try again" and not become unresponsive', async () => {
  const errorBox = await $('#error-message');
  await errorBox.waitForDisplayed({ timeout: 5000 });
  const text = await errorBox.getText();
  expect(text).to.include('Connection lost');
});
