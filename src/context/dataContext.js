import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
      // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);
  const [counter,setCounter] = useState(0);
  const [showAnswerTimer,setShowAnswerTimer] = useState(true);


  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  // Load JSON Data
  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => setQuizs(data))
  }, []);

  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setCounter(0);
    setShowRules(false);
    setShowQuiz(true);
  }


  //Show rules
  const dispRules = () => {
    setShowStart(false);
    setShowRules(true);
  }

  //quit quiz
  const quitQuiz = () => {
    setShowStart(true);
    setShowResult(false);
    setCounter(0);
    setShowAnswerTimer(false);
    setShowQuiz(false);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
  }
  
  // Check Answer
  const checkAnswer = (event, selected) => {

    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    setCounter(0);
    setShowAnswerTimer(false);
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setCounter(0);
    setShowAnswerTimer(false);
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  }
    return (
        <DataContext.Provider value={{quitQuiz,
            startQuiz,dispRules,setCounter,showAnswerTimer,setShowAnswerTimer,counter,showRules,showStart,showQuiz,question,quizs,checkAnswer,correctAnswer,
            selectedAnswer,questionIndex,nextQuestion,showTheResult,showResult,marks,
            startOver
        }} >
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

