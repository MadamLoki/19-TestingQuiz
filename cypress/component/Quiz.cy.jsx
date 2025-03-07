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
        // Mock the API call to never resolve (will keep loading)
        cy.intercept("GET", "/api/questions/random", {
            delay: 2000, // Add delay to ensure loading state is visible
            fixture: "questions.json"
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        
        // The component shows a spinner while loading
        cy.get(".spinner-border").should("exist");
    });

    it("should display questions after fetching data", () => {
        // Intercept API request with mocked data
        cy.intercept("GET", "/api/questions/random", {
            fixture: "questions.json"
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // The first question should be visible
        cy.get("h2").should("be.visible");
        // There should be 4 answer options
        cy.get(".alert-secondary").should("have.length", 4);
    });

    it("should update score and move to next question when selecting an answer", () => {
        // Use a custom array with just 2 questions to test navigation
        cy.intercept("GET", "/api/questions/random", {
            body: [
                {
                    _id: "test1",
                    question: "Test Question 1",
                    answers: [
                        { text: "Answer 1", isCorrect: false },
                        { text: "Answer 2", isCorrect: true },
                        { text: "Answer 3", isCorrect: false },
                        { text: "Answer 4", isCorrect: false }
                    ]
                },
                {
                    _id: "test2",
                    question: "Test Question 2",
                    answers: [
                        { text: "Answer 1", isCorrect: false },
                        { text: "Answer 2", isCorrect: true },
                        { text: "Answer 3", isCorrect: false },
                        { text: "Answer 4", isCorrect: false }
                    ]
                }
            ]
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // Verify first question is displayed
        cy.contains("Test Question 1").should("be.visible");

        // Click on an answer and verify we move to the next question
        cy.get(".btn-primary").first().click();
        
        // Check we're now on the second question
        cy.contains("Test Question 2").should("be.visible");
    });

    it("should show completion screen after answering all questions", () => {
        // Use a single question to easily test quiz completion
        cy.intercept("GET", "/api/questions/random", {
            body: [
                {
                    _id: "test1",
                    question: "Single Test Question",
                    answers: [
                        { text: "Answer 1", isCorrect: true },
                        { text: "Answer 2", isCorrect: false },
                        { text: "Answer 3", isCorrect: false },
                        { text: "Answer 4", isCorrect: false }
                    ]
                }
            ]
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer the only question to complete the quiz
        cy.get(".btn-primary").first().click();

        // Verify completion screen is displayed
        cy.contains("Quiz Completed").should("be.visible");
        cy.contains("Your score:").should("be.visible");
    });

    it("should restart quiz when clicking Take New Quiz", () => {
        // Use a single question for first quiz attempt
        cy.intercept("GET", "/api/questions/random", {
            body: [
                {
                    _id: "test1",
                    question: "Single Test Question",
                    answers: [
                        { text: "Answer 1", isCorrect: true },
                        { text: "Answer 2", isCorrect: false },
                        { text: "Answer 3", isCorrect: false },
                        { text: "Answer 4", isCorrect: false }
                    ]
                }
            ]
        }).as("getQuestions");

        cy.contains("Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer the only question to complete the quiz
        cy.get(".btn-primary").first().click();

        // Verify completion screen
        cy.contains("Quiz Completed").should("be.visible");

        // Mock the new quiz request with different data
        cy.intercept("GET", "/api/questions/random", {
            body: [
                {
                    _id: "test2",
                    question: "New Quiz Question",
                    answers: [
                        { text: "New Answer 1", isCorrect: true },
                        { text: "New Answer 2", isCorrect: false },
                        { text: "New Answer 3", isCorrect: false },
                        { text: "New Answer 4", isCorrect: false }
                    ]
                }
            ]
        }).as("getNewQuestions");

        // Start a new quiz
        cy.contains("Take New Quiz").click();
        cy.wait("@getNewQuestions");

        // Verify we see the new question
        cy.contains("New Quiz Question").should("be.visible");
    });
});