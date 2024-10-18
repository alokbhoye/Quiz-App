
# Quiz App with Gauge Chart and Results Page 🧑‍🏫

This project is a **Quiz App** built using **React** and **React Router**, featuring interactive quiz questions and a visually appealing **results page**. The results are represented with a **semi-circle gauge chart** to display the user’s score, along with detailed feedback on correct and incorrect answers.

---

## 🎯 Features

- **Dynamic Quiz Questions**: Uses the **Open Trivia API** to load random questions.
- **Gauge Chart for Results**: Displays the user’s percentage score using a semi-circle **gauge chart**.
- **Timer for Questions**: Each question has a countdown timer to answer within a limited time.
- **Restart Quiz Functionality**: Users can easily restart the quiz from the results page.
- **Responsive Design**: Styled using **Tailwind CSS** for a sleek, mobile-friendly interface.
- **Page Navigation**: Smooth transitions between pages using **React Router**.

---

## 🛠️ Tech Stack

- **React.js**: Frontend framework for building the UI.
- **React Router**: For client-side routing and page transitions.
- **Chart.js & react-chartjs-2**: For rendering the gauge chart on the results page.
- **Tailwind CSS**: For styling the application.
- **Open Trivia API**: For fetching quiz questions dynamically.

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **Internet connection** (for fetching quiz questions from the API).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📁 Project Structure

```
├── src
│   ├── assets            // Images and static files
│   ├── components        // Reusable components (GaugeChart, etc.)
│   ├── pages             // Individual pages (Homepage, QuestionsPage, ResultsPage)
│   ├── App.js            // Main application file
│   └── index.js          // React entry point
├── package.json          // Dependencies and scripts
└── README.md             // Project documentation
```

---

## 📋 How It Works

### Homepage

- Displays the **start button** that navigates to the **Questions Page**.

### Questions Page

- Loads a quiz with **random questions** from the Open Trivia API.
- Displays **multiple-choice options** with a countdown timer for each question.
- Stores the selected answer for each question.
- On completion, redirects to the **Results Page**.

### Results Page

- Shows the **percentage score** using a **gauge chart**.
- Displays the **number of correct and incorrect answers** in colored cards.
- Provides a **restart button** to retake the quiz.

---

## 🧩 Key Components

### 1. **GaugeChart.js**

- Displays the user's score as a **semi-circle gauge** using `react-chartjs-2`.
- Custom **needle** positioned based on the user’s percentage score.

### 2. **ResultsPage.js**

- Shows the **gauge chart** along with correct/incorrect counts.
- Provides a **restart button** to reset the quiz.

### 3. **QuestionsPage.js**

- Fetches **questions** from the Open Trivia API.
- **Tracks user answers** and redirects to the **ResultsPage** on completion.

---

## 📦 Dependencies

- **React**: Frontend framework.
- **React Router**: For routing between pages.
- **Chart.js & react-chartjs-2**: For creating the gauge chart.
- **Tailwind CSS**: For styling components.
- **Open Trivia API**: For fetching quiz questions.

Install the required packages:

```bash
npm install react react-router-dom chart.js react-chartjs-2 tailwindcss
```

---

## 🐛 Troubleshooting

1. **Needle not showing on the gauge chart?**  
   Ensure that the correct **canvas** settings are applied. Double-check the `GaugeChart.js` component for correct needle positioning.

2. **API returning 429 Too Many Requests?**  
   Add retry logic to the **API fetch** function to handle rate limits properly.

3. **Styling issues?**  
   Make sure **Tailwind CSS** is correctly configured in the project.

---

## 📜 License

This project is licensed under the MIT License. Feel free to modify and use it in your projects.

---

## 🙌 Acknowledgements

- **Open Trivia API** for providing the quiz questions.
- **Chart.js** for the beautiful gauge chart.
- **Tailwind CSS** for seamless styling.

---

## 📞 Contact

For any inquiries, feel free to reach out:

- **Email**: alokbhoye21@gmail.com  
- **GitHub**: https://github.com/alokbhoye

---

Thank you for checking out this project! Happy Coding! 🎉
