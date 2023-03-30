Feature: Prodcuts test

  Background: 
    Given User navigates to the E-commerce website

  Scenario Outline: Add to cart
    And User enters the username as "standard_user"
    And User enters the password as "secret_sauce"
    When User clicks login button
    Then Lets scrape everything
    When user selects a "<product>" and adds it to the cart
    Then user verifies cart badge
    Then user navigates to the cart
    Then user removes products from cart

    Examples: 
      | product       | price |
      | Fleece Jacket | 49.99 |
      | Backpack      | 29.99 |