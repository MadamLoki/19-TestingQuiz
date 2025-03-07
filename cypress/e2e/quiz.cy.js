describe("Quiz Application E2E", () => {
    beforeEach(() => {
        // Visit the application before each test
        cy.visit("/");
    });

    it("should display initial quiz screen with start button", () => {
        cy.contains("Start Quiz").should("be.visible");
    });

    it("should be able to start and complete a quiz", () => {
        // Start the quiz
        cy.contains("Start Quiz").click();

        // Wait for questions to load (increasing timeout to handle real API)
        cy.get("h2", { timeout: 10000 }).should("be.visible");

        // Answer all questions
        for (let i = 0; i < 10; i++) {
        // Wait for question to be visible before clicking
        cy.get(".btn-primary").first().should("be.visible");
        cy.get(".alert-secondary").should("have.length", 4); // Make sure all answers loaded
        cy.get(".btn-primary").first().click();
        }

        // Verify quiz completion
        cy.contains("Quiz Completed", { timeout: 10000 }).should("be.visible");
        cy.contains("Your score:").should("be.visible");

        // Verify we can take a new quiz
        cy.contains("Take New Quiz").click();
        cy.get("h2", { timeout: 10000 }).should("be.visible"); // First question visible again
    });

    it("should track different questions through the quiz", () => {
        cy.contains("Start Quiz").click();

        // Wait for first question to load
        cy.get("h2", { timeout: 10000 }).should("be.visible");

        // Keep track of questions to verify they change
        const questions = [];

        // First question
        cy.get("h2")
        .invoke("text")
        .then((text) => {
            questions.push(text);
            cy.log(`Question 1: ${text}`);
        });

        // Click first answer and check second question
        cy.get(".btn-primary").first().click();
        cy.get("h2")
        .invoke("text")
        .then((text) => {
            questions.push(text);
            cy.log(`Question 2: ${text}`);
            // Verify the second question is different from the first
            expect(text).not.to.equal(questions[0]);
        });

        // Click again and check third question
        cy.get(".btn-primary").first().click();
        cy.get("h2")
        .invoke("text")
        .then((text) => {
            questions.push(text);
            cy.log(`Question 3: ${text}`);
            // Verify the third question is different
            expect(text).not.to.equal(questions[0]);
            expect(text).not.to.equal(questions[1]);
        });
    });

    it("should display appropriate answers for each question", () => {
        cy.contains("Start Quiz").click();

        // Wait for first question to load
        cy.get("h2", { timeout: 10000 }).should("be.visible");

        // Check that we have 4 answer options
        cy.get(".alert-secondary").should("have.length", 4);

        // Each answer should have corresponding button
        cy.get(".alert-secondary").each(($el, index) => {
        cy.get(".btn-primary")
            .eq(index)
            .should("contain", index + 1);
        });
    });

    it("should complete the quiz and show score", () => {
        cy.contains("Start Quiz").click();

        // Wait for first question to load
        cy.get("h2", { timeout: 10000 }).should("be.visible");

        // Answer all questions correctly (if we can determine which is correct)
        // For simplicity, we'll just click the second answer each time
        for (let i = 0; i < 10; i++) {
        cy.get(".btn-primary").eq(1).click();
        }

        // Verify quiz completion
        cy.contains("Quiz Completed").should("be.visible");

        // Score should be displayed as X/10
        cy.contains(/Your score: \d+\/10/).should("be.visible");
    });
});
