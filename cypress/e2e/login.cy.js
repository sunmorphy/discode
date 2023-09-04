/**
 * - Login spec
 *   - should display home page correctly
 *   - should display login modal correctly
 *   - should display toast when username and password are wrong
 *   - should display home page when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display homepage correctly", () => {
    // verify the elements that should appear on the home page
    cy.get("header").should("be.visible");

    cy.get("button")
      .contains(/^Register$/)
      .should("be.visible");

    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should display login modal correctly", () => {
    // click the login button to show the modal
    cy.get("button")
      .contains(/^Login$/)
      .click();
  });

  it("should display toast when username and password are wrong", () => {
    // click the login button to show the modal
    cy.get("button")
      .contains(/^Login$/)
      .click();

    // fill email
    cy.contains("label", "Email").next("input").type("email@test.com");

    // fill password
    cy.contains("label", "Password").next("input").type("passwordtest");

    // click login button
    cy.get("button")
      .contains(/^Login$/)
      .click({ force: true });

    // submit form
    cy.get("form").submit();

    // verify the toast to display the message from the API
    cy.get("div")
      .contains(/^email or password is wrong$/)
      .should("be.visible");
  });

  it("should display home page when username and password are correct", () => {
    // click the login button to show the modal
    cy.get("button")
      .contains(/^Login$/)
      .click();

    // fill email
    cy.contains("label", "Email").next("input").type("bbb@mail.com");

    // fill password
    cy.contains("label", "Password").next("input").type("bbbbbb");

    // click login button
    cy.get("button")
      .contains(/^Login$/)
      .click({ force: true });

    // submit form
    cy.get("form").submit();

    // verify the elements that should appear on the home page
    cy.get("header").should("be.visible");

    cy.get("button")
      .contains(/^Register$/)
      .should("be.visible");

    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });
});
