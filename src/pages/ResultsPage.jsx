// ResultsPage.js
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GaugeChart from '../components/GaugeChart.jsx';
import upperIMG from '../assets/effect.svg'; // Ensure this asset exists

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const { answers } = location.state || { answers: [] };
    if (answers.length === 0) {
      navigate('/');
      return;
    }

    const correctAnswers = answers.filter(
      (answer) => answer.selectedOption === answer.correctAnswer
    ).length;

    const totalQuestions = answers.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    setReport({
      score,
      answers,
      correctAnswers,
      totalQuestions,
    });
  }, [location, navigate]);

  if (!report) {
    return <div>Loading report...</div>;
  }

  return (
    <div className="h-screen w-screen bg-[#AF9CF3] flex flex-col items-center font-Nunito">
      <img src={upperIMG} alt="Decoration" className="" />

      <div className="bg-white w-full rounded-t-3xl p-4 flex-grow mt-2">
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-4xl font-bold mt-2">Your result</h1>

          {/* Gauge Chart with Centered Value Circles */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            <GaugeChart value={report.score} />

            {/* Outer Gray Circle - Adjusted Downwards */}
            <div
              className="
                absolute 
                w-[250px] 
                h-[250px] 
                bg-gray-100 
                rounded-full 
                shadow-2xl shadow-gray-400 
                flex 
                items-center 
                justify-center 
                z-40
                transform 
                translate-y-10  /* Adjust vertical position */
                mt-10
              "
            >
              {/* Inner White Circle with Percentage */}
              <div
                className="
                  w-[200px] 
                  h-[200px] 
                  bg-white 
                  rounded-full 
                  shadow-2xl shadow-gray-400 
                  flex 
                  items-center 
                  justify-center 
                  z-50
                "
              >
                {report.score}%
              </div>
            </div>
          </div>

          <div className="w-11/12 max-w-lg mt-5">
            <div className="flex items-center justify-between bg-green-100 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <span className="w-5 h-5 bg-green-500 rounded-full mr-2"></span>
                <h3 className="text-xl font-bold">Correct</h3>
              </div>
              <h3 className="text-xl font-bold">{report.correctAnswers}</h3>
            </div>

            <div className="flex items-center justify-between bg-red-100 rounded-lg p-4">
              <div className="flex items-center">
                <span className="w-5 h-5 bg-red-500 rounded-full mr-2"></span>
                <h3 className="text-xl font-bold">Incorrect</h3>
              </div>
              <h3 className="text-xl font-bold">
                {report.totalQuestions - report.correctAnswers}
              </h3>
            </div>
          </div>

          <button
            className="w-11/12 max-w-lg bg-red-500 text-white font-bold py-4 text-xl hover:bg-red-600 rounded-full"
            onClick={() => navigate('/')}
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
