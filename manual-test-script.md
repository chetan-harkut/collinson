# Manual Test Scenarios

## 1. Verify if type to search functionality is working correctly.

**Preconditions:**  
User is on the search page with the search input box visible for entering City name.

**Test Steps:**  
Click on the search input box.  
Start typing a city name like "Del".  
Wait for suggestions to appear.

**Expected Result:**  
The system should show matching city names such as "Delhi", "Delaware", etc. below the search box.

---

## 2. Verify if selecting a city triggers Activity ranking API and displays the ranked activities.

**Preconditions:**  
User is on the search page with search suggestions enabled and weather API is functional.

**Test Steps:**  
Start typing "Berlin" in the search box.  
Select "Berlin" from the suggestions.  
Wait for the activity ranking results to be displayed and observe the Actions.

**Expected Result:**  
The system should fetch the 7day forecast and display a ranked list of activities for each day based on weather conditions

---

## 3. Verify if API returns data with required fields.

**Preconditions:**  
Weather API is functional. A valid city is selected.

**Test Steps:**  
Type and select “Dallas” from suggestions.  
Inspect the activity ranking response in dev tools or via UI.  
Verify if each result includes: Date, Activity name, Rank, and Reasoning.

**Expected Result:**  
Each API response item should contain:  
A valid date,  
Activity name (e.g: Skiing),  
Rank between 1–10,  
Reasoning message (e.g: "Clear skies and 22°C").

---

## 4. Verify system behavior when weather data is not available for selected city.

**Preconditions:**  
Weather API is functional. City selected has no data coverage in the API.

**Test Steps:**  
Type and select “Unknown Island” (or any unsupported location).  
Wait for the activity results.

**Expected Result:**  
The system should show a meaningful error message like "Weather data not available for this location" without breaking the UI.

---

## 5. Verify Activity Ranking Logic for Clear Weather

**Preconditions:**  
Open-Meteo is mocked to return clear, warm weather (eg: 30°C, no rain).

**Test Steps:**  
Type and select a known city (eg: “Mumbai”).  
Trigger the ranking API.  
Observe the activity rankings.

**Expected Result:**  
Activities like "Outdoor Sightseeing" or "Surfing" should receive high ranks (eg: 9 or 10) with reasons like “Clear skies and 30°C”.

---

## 6. Verify the case of search with city names that exist in multiple countries

**Preconditions:**  
Autocomplete list includes location context.

**Test Steps:**  
Type “Springfield” (exists in multiple countries).  
Observe suggestions.

**Expected Result:**  
Suggestions should include location context (eg: “Springfield, Illinois”, “Springfield, Massachusetts”).

---

## 7. Edge Case: Enter an invalid city name and check system behavior

**Preconditions:**  
User is on the search page with the city input field visible.  
Autocomplete and activity ranking API are functional.  
System allows free-text input or selection of invalid city names.

**Test Steps:**  
Type “Test” and press Enter or select if allowed.  
Wait for results.

**Expected Result:**  
System should not crash. It should show a message like "City not found" or "Please enter a valid location".

---

## 8. Edge case: Simulate slow internet or API delay

**Preconditions:**  
User is on the search page.  
Network throttling tools (e.g., browser dev tools) are available.  
Weather API is functional but set to delayed response.

**Test Steps:**  
Select a city like “London”.  
Throttle your network or simulate slow response using browser dev tools.  
Wait for a long time.

**Expected Result:**  
A loading spinner should appear. If it takes too long, system should show “Request timed out” or “Please try again later”.

---

## 9. Edge case: Test the behavior when suggestions fail to load

**Preconditions:**  
User is on the search page with internet access initially.  
Autocomplete suggestion service is functional under normal conditions.  
The tester can disconnect the network or simulate a failure.

**Test Steps:**  
Disconnect from the internet or simulate failure in suggestions API.  
Type "Ban" in the search box.

**Expected Result:**  
The system should not crash. Either no suggestions appear or a message like "Can’t fetch suggestions now" is shown.

---

## 10. Edge case: Select a city but lose network connection before API returns

**Preconditions:**  
User is on the search page with working autocomplete.  
Weather API is functional.  
Tester can disconnect internet immediately after selection.

**Test Steps:**  
Select “Bangkok” from suggestions.  
Immediately turn off Wi-Fi or simulate offline mode.  
Wait for the activity list.

**Expected Result:**  
System should show: “Connection lost. Please try again.”  
No blank screen or unresponsive page.

---

## 11. Verify the case when user inputs special characters or numbers in search

**Preconditions:**  
User is on the search page with the search input field visible.  
Autocomplete system is running.  
System allows any keyboard input in the field.

**Test Steps:**  
Enter "123@" or "@#!" in the search field.  
Observe suggestions and behavior.

**Expected Result:**  
System should show a message like “Invalid characters” or gracefully ignore symbols.