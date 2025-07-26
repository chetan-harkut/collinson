Feature: City Search and Activity Ranking

  This feature allows users to search for cities and receive activity recommendations based on weather conditions.

  Scenario: Happy Path -> Valid city with suggestions and ranked activities
    Given the user is on the city search page
    When the user types "Berlin" into the search box
    And selects "Berlin" from the suggestions
    Then the system should display 7-day weather-based activity rankings for the selected city

  Scenario: Edge Case -> No suggestions returned
    Given the user is on the city search page
    And the network connection is disabled or suggestion API is down
    When the user types "Ban" into the search box
    Then the system should show a message "Can’t fetch suggestions now" and not crash

  Scenario: Error Handling -> Invalid input or API failure
    Given the user is on the city search page
    When the user enters "123@" or "@#!" into the search box
    Then the system should show a message like "Invalid characters" or ignore the input gracefully

  Scenario: Search suggestions show matching cities
    Given the user is on the city search page
    When the user types "Del" into the search box
    Then the system should display matching suggestions like "Delhi", "Delaware"

  Scenario: API returns required fields
    Given a valid city "Dallas" is selected
    When the activity ranking API is triggered
    Then each result should include Date, Activity name, Rank (1-10), and Reasoning

  Scenario: Weather data not available for selected city
    Given the user selects a city with no weather data like "Unknown Island"
    When the activity ranking API is triggered
    Then the system should display "Weather data not available for this location"

  Scenario: Clear weather returns outdoor activities with high rank
    Given the API is mocked to return clear weather for "Mumbai"
    When the activity ranking API is triggered
    Then activities like "Outdoor Sightseeing" or "Surfing" should have high ranks with reason "Clear skies and 30°C"

  Scenario: City names with multiple locations
    Given the user types "Springfield" into the search box
    Then the suggestions should include context like "Springfield, Illinois" and "Springfield, Massachusetts"

  Scenario: Invalid city name input
    Given the user is on the city search page
    When the user types "Test" and presses enter
    Then the system should show a message like "City not found" and not crash

  Scenario: Simulated slow internet or API delay
    Given the user throttles the network connection
    When the user selects "London"
    Then the system should show a loading spinner and handle delays gracefully with a timeout message

  Scenario: Lose network connection after city selection
    Given the user selects "Bangkok" from suggestions
    And immediately loses network connection
    Then the system should show "Connection lost. Please try again" and not become unresponsive