import { Card, Typography, List, ListItemText, ListItemButton, ListItem } from '@mui/material'
import { useQuestionStore } from './store/questions'
import { Question as QuestionType } from './types'
import SyntaxHighligther from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const getBackgroundColor = (info: QuestionType, index: number): string => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'

  if (correctAnswer !== index && userSelectedAnswer !== index) return 'transparent'

  if (correctAnswer === index) return 'green'

  if (userSelectedAnswer !== correctAnswer && userSelectedAnswer === index) return 'red'

  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }): any => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer)

  const handleClick = (answerIndex: number): void => {
    selectAnswer(info.id, answerIndex)
  }

  const isButtonDisabled = (): boolean => {
    if (info.userSelectedAnswer === undefined) return false
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
              disabled={isButtonDisabled()}
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
