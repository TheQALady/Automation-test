Feature: User Authentication tests

  Background: 
    Given User navigates to the E-commerce website

  Scenario: Login should fail
    Given User enters the username as "locked_out_user"
    Given User enters the password as "secret_sauce"
    When User clicks login button
    But Login should fail

  Scenario: Login susessful
    And User enters the username as "standard_user"
    And User enters the password as "secret_sauce"
    When User clicks login button
    Then Login should be success

  
