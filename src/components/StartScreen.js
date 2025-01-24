
import { useQuiz } from '../context/ReactQuizContext';

export default function StartScreen() {
  const {numQuestions,dispatch}=useQuiz();
  return (
    <div>
      <h2>Welcome to the React quizz </h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button className='btn btn-ui'
      onClick={()=>dispatch({type:"start"})}>Let's start</button>
    </div>
  );
}
