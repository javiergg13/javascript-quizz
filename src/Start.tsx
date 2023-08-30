import { Button } from '@mui/material'
import { useQuestionStore } from './store/questions'

const LIMIT_QUESTIONS = 10

export const Start = (): any => {
  const fetchQuestions = useQuestionStore(state => state.fetchQuestions)

  const handleClick = (): any => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      ¡Empezar!
    </Button>
  )
}
