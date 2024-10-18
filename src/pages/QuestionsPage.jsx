import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import upperIMG from '../assets/effect.svg';

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(50); // Timer for each question

  const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy';

  const fetchData = async (retryCount = 0) => {
    const cachedQuestions = localStorage.getItem('questions');
    if (cachedQuestions) {
      console.log('Using cached questions');
      setQuestions(JSON.parse(cachedQuestions));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl);
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || (retryCount + 1) * 2;
        console.warn(`429 Too Many Requests. Retrying in ${retryAfter} seconds...`);
        if (retryCount < 5) {
          setTimeout(() => fetchData(retryCount + 1), retryAfter * 1000);
          return;
        } else {
          throw new Error('Too many requests. Please try again later.');
        }
      }

      const data = await response.json();
      if (data.response_code !== 0) {
        throw new Error('API returned an error. Please try again.');
      }

      localStorage.setItem('questions', JSON.stringify(data.results));
      setQuestions(data.results);
    } catch (err) {
      console.error('Error fetching questions:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch questions on mount
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Clean up on unmount
    } else {
      handleNext(); // Move to the next question when time runs out
    }
  }, [timeLeft]);

  const handleOptionChange = (option) => {
    setSelectedOption(option); // Set selected option
  };

  const handleNext = () => {
    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestion].question,
        selectedOption,
        correctAnswer: questions[currentQuestion].correct_answer,
      },
    ];

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(''); // Reset option
      setTimeLeft(50); // Reset timer
    } else {
      navigate('/results', { state: { answers: updatedAnswers } });
    }
  };

  if (loading) return <div className="font-Nunito">Loading...</div>;
  if (error) return <div className="font-Nunito">Error: {error}</div>;

  const currentQ = questions[currentQuestion];
  const allOptions = [...currentQ.incorrect_answers, currentQ.correct_answer].sort();

  return (
    <div className="bg-[#AF9CF3] h-screen w-screen flex flex-col items-center justify-between font-Nunito">
      <img src={upperIMG} alt="Decoration" className="absolute top-0" />

      <div className="bg-white h-full w-full rounded-t-3xl p-10 flex flex-col items-center relative mt-[150px]">
        {/* Circular Progress Bar */}
        <div className="absolute bg-white h-36 w-36 p-2 rounded-full top-0 -translate-y-1/2 flex items-center justify-center">
          <CircularProgressbarWithChildren
            value={(timeLeft / 50) * 100}
            styles={buildStyles({
              pathColor: timeLeft <= 3 ? '#FF3B3F' : '#44B77B',
              textColor: 'black',
            })}
          >
            <div className="flex flex-row items-end">
              <h2 className="text-5xl font-bold">{currentQuestion + 1}</h2>
              <h2 className="text-xl font-bold text-gray">/{questions.length}</h2>
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <div className="mt-10 flex flex-col gap-4 items-center">
          <h3 className="text-2xl font-bold text-center">{currentQ.question}</h3>

          <div className="flex flex-col gap-4 mt-4 w-full">
            {allOptions.map((option, index) => (
              <div
                key={index}
                className={`bg-white border w-full h-16 rounded-xl flex items-center gap-4 px-6 text-xl font-semibold cursor-pointer ${
                  selectedOption === option ? 'border-blue-500 bg-blue-100' : 'border-transparent'
                }`}
                onClick={() => handleOptionChange(option)}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedOption === option ? 'bg-blue-500 border-transparent' : 'border-gray-400'
                  } flex items-center justify-center`}
                >
                  {selectedOption === option && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z" />
                    </svg>
                  )}
                </span>
                <label className="cursor-pointer">{option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Next Button */}
        <button
          className="w-[90%] bg-red-500 text-white font-bold py-4 text-xl hover:bg-red-600 fixed bottom-0 z-50 rounded-full mb-[20px]"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentQuestion < questions.length - 1 ? 'Next →' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default QuestionsPage;
