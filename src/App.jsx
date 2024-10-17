import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import QuestionsPage from './pages/QuestionsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Route for QuestionsPage */}
        <Route path="/questions" element={<QuestionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
