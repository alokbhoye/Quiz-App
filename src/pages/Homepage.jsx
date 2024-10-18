import { useNavigate } from 'react-router-dom';
import logo from '../assets/Frame.png';
import quizbutton from '../assets/Group 3.svg';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="flex items-center justify-center pt-10">
        <img className="w-60 h-13 m-0 " src={logo} alt="Logo" />
      </div>

      <div className="flex items-center justify-center h-screen">
        <img className="w-[300px] h-[300px]" src={quizbutton} alt="Quiz Button" />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="w-[90%] h-[78px] bg-red-500 text-white text-3xl font-bold rounded-full shadow-md hover:bg-red-600 transition-all mb-7 font-nunito"
          onClick={() => navigate('/questions')}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Homepage;
