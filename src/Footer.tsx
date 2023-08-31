import { useQuestionData } from './hooks/useQuestionsData'
import { Button } from '@mui/material'
import { useQuestionStore } from './store/questions'

export const Footer = (): any => {
  const { correctAnswers, incorrectAnswers, unanswered } = useQuestionData()
  const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ margin: '16px' }}>
      <strong>{`✅ ${correctAnswers} correctas - ❌ ${incorrectAnswers} incorrectas - ❓${unanswered} sin responder`}</strong>
      <Button onClick={() => reset()}>
        Resetear juego
      </Button>
    </footer>
  )
}
