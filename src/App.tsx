import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavasScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionStore } from './store/questions'
import { Game } from './Game'

function App (): any {
  const questions = useQuestionStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavasScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 ? <Start /> : <Game />}

      </Container>
    </main>
  )
}

export default App
