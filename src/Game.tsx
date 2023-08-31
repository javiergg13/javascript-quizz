import { Card, Typography, List, ListItemText, ListItemButton, ListItem } from '@mui/material'
import { useQuestionStore } from './store/questions'
import { Question as QuestionType } from './types'
import SyntaxHighligther from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const getBackgroundColor = (info: QuestionType, index: number): string => {
  const { userSelectedAnswer, isCorrectUserAnswer, correctAnswer } = info

  if (userSelectedAnswer === null) return 'transparent'

  if (correctAnswer !== index && userSelectedAnswer !== index) return 'transparent'

  if (isCorrectUserAnswer) return 'green'

  if (userSelectedAnswer !== correctAnswer && userSelectedAnswer === index) return 'red'

  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }): any => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer)

  const handleClick = (answerIndex: number) => {
    // good practice to prevent the user from changing the answer after selecting it (although the answers are disabled)
    if (info.userSelectedAnswer !== undefined) return
    // select the answer
    selectAnswer(info.id, answerIndex)
  }

  const isButtonDisabled = (answerIndex: number): boolean => {
    if (info.userSelectedAnswer === undefined) return false
    if (info.userSelectedAnswer === answerIndex) return false // remove this line if you want to disable the selected answer after the user selects it
    return true
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}>

      <Typography variant='h5'>
        {info.question}
      </Typography>

      <SyntaxHighligther language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighligther>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={isButtonDisabled(index)}
              onClick={() => handleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Card>
  )
}

export const Game = (): any => {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestion = useQuestionStore(state => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
