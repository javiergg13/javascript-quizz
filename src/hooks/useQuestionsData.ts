import { useQuestionStore } from '../store/questions'

export const useQuestionData = (): any => {
  const questions = useQuestionStore(state => state.questions)

  let correctAnswers = 0
  let incorrectAnswers = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correctAnswers++
    else incorrectAnswers++
  })

  return { correctAnswers, incorrectAnswers, unanswered }
}
