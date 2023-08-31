import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionStore = create<State>()(persist((set, get) => {
  return {
    loading: false,
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const data = await res.json()

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)

      const questionIndex = newQuestions.findIndex(question => question.id === questionId)
      const questionInfo = newQuestions[questionIndex]

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }

      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const newCurrentQuestion = currentQuestion + 1

      if (newCurrentQuestion >= questions.length) return

      set({ currentQuestion: newCurrentQuestion })
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const newCurrentQuestion = currentQuestion - 1

      if (newCurrentQuestion < 0) return

      set({ currentQuestion: newCurrentQuestion })
    },

    reset: () => {
      set({
        questions: [],
        currentQuestion: 0
      })
    }
  }
}, {
  name: 'questions'
}))
