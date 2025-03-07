import Quiz from "../../client/src/components/Quiz";

describe("Quiz Component", () => {
    beforeEach(() => {
        // Mount the Quiz component before each test
        cy.mount(<Quiz />);
    });

    it("should display start quiz button initially", () => {
        cy.contains("Start Quiz").should("be.visible");
    });

    it("should show loading state when starting quiz", () => {
        // Intercept API request to delay response
        cy.intercept("GET", "/api/questions/random", {
        delay: 500,
        fixture: "questions.json",
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.get(".spinner-border").should("be.visible");
    });

    it("should display questions after fetching data", () => {
        // Intercept API request with mock data
        cy.intercept("GET", "/api/questions/random", {
        fixture: "questions.json",
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // The first question should be visible
        cy.get("h2").should("be.visible");
        // There should be 4 answer options
        cy.get(".btn-primary").should("have.length.at.least", 1);
        cy.get(".alert-secondary").should("have.length", 4);
    });

    it("should update score and move to next question when selecting an answer", () => {
        // Intercept API request with mock data
        cy.intercept("GET", "/api/questions/random", {
        fixture: "questions.json",
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // Save the text of the first question
        cy.get("h2").invoke("text").as("firstQuestion");

        // Click on the correct answer (assuming second answer is correct)
        cy.get(".btn-primary").eq(1).click();

        // Next question should be displayed (different from first)
        cy.get("@firstQuestion").then((firstQuestion) => {
        cy.get("h2").should("not.have.text", firstQuestion);
        });
    });

    it("should show completion screen after answering all questions", () => {
        // Intercept API request with mock data
        cy.intercept("GET", "/api/questions/random", {
        fixture: "questions.json",
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer all 10 questions
        for (let i = 0; i < 10; i++) {
        cy.get(".btn-primary").first().click();
        }

        // Quiz completed screen should be shown
        cy.contains("Quiz Completed").should("be.visible");
        cy.contains("Your score:").should("be.visible");
        cy.contains("Take New Quiz").should("be.visible");
    });

    it("should restart quiz when clicking Take New Quiz", () => {
        // Intercept API request with mock data
        cy.intercept("GET", "/api/questions/random", {
        fixture: "questions.json",
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // Complete the quiz by answering all questions
        for (let i = 0; i < 10; i++) {
        cy.get(".btn-primary").first().click();
        }

        // Verify completion screen
        cy.contains("Quiz Completed").should("be.visible");

        // Intercept the request for the new quiz
        cy.intercept("GET", "/api/questions/random", {
        fixture: "questions.json",
        }).as("getQuestionsAgain");

        // Start a new quiz
        cy.contains("Take New Quiz").click();
        cy.wait("@getQuestionsAgain");

        // Should have reset to the first question
        cy.get("h2").should("be.visible");
        // Should have reset score
        cy.contains("Quiz Completed").should("not.exist");
    });
});
