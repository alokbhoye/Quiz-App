import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import logo from '../assets/Frame.png';
import quizbutton from '../assets/Group 3.svg';
import startButton from '../assets/Start button.png';

const Homepage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartClick = () => {
    navigate('/questions'); // Navigate to QuestionsPage
  };

  return (
    <div
      className="h-screen flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)',
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center pt-[40px]">
        <img 
          className="w-[291px] h-[70px]" 
          src={logo} 
          alt="Logo" 
        />
      </div>

      {/* Quiz Button Section */}
      <div className="flex items-center justify-center h-screen">
        <img 
          className="w-[350px] h-[396px]" 
          src={quizbutton} 
          alt="Quiz Button" 
        />
      </div>

      {/* Start Button */}
      <div className="flex items-center justify-center">
        <img 
          className="mb-[20px]" 
          src={startButton} 
          alt="Start Button" 
          onClick={handleStartClick} // Call handleStartClick on click
          style={{ cursor: 'pointer' }} // Optional: Change cursor to pointer
        />
      </div>
    </div>
  );
};

export default Homepage;
