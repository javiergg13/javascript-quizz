import { Card, Stack, IconButton, Typography, List, ListItemText, ListItemButton, ListItem } from '@mui/material'
import { useQuestionStore } from './store/questions'
import { Question as QuestionType } from './types'
import SyntaxHighligther from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

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
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
