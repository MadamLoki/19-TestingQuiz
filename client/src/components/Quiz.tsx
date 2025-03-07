import { useState, } from 'react';
import type { Question } from '../models/Question.js';
import { getQuestions } from '../services/questionApi.js';

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomQuestions = async () => {
    try {
      setIsLoading(true); // Set loading state before API call
      const questions = await getQuestions();
  
      if (!questions) {
        throw new Error('something went wrong!');
      }
  
      setQuestions(questions);
      setQuizStarted(true); // Move this here, AFTER the data is loaded
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // Make sure to reset loading state
    }
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    await getRandomQuestions(); // This will set quizStarted to true after getting questions
  };

  // Show loading indicator when loading data
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Not started yet - show start button
  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  // Quiz is completed - show results
  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  // Quiz is in progress - show current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='card p-4'>
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
      {currentQuestion.answers.map((answer, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <button className="btn btn-primary" onClick={() => handleAnswerClick(answer.isCorrect)}>{index + 1}</button>
          <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">{answer.text}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Quiz;
