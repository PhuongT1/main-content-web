import { COURSE_APPLICATION_HISTORY_RESULT } from '@/constants/certificate.constant'
import { TCourse, TCourseApplications, TCourseResult } from '@/types/certificate.type'
import { TUser } from '@/types/user.type'

// export const COURSE_QUIZ: TCourseInfo = {
//   courseQuiz: {
//     id: 1,
//     uuid: '32402977-6181-47fd-bc67-43323d24de6e',
//     createdAt: '2024-03-13T04:51:48.242Z',
//     updatedAt: '2024-03-13T04:52:15.000Z',
//     deletedAt: '',
//     status: 'ACTIVE',
//     typeOrder: COURSE_QUIZ_TYPE_ORDER.DESC,
//     categoryId: 1,
//     title: 'Quiz 1',
//     code: 'QUIZ0001',
//     hasShuffle: true,
//     testTimeDuration: 90,
//     userId: null,
//     isPublic: true,
//     isUsed: true,
//     totalQuestion: 2,
//     totalPoint: 40,
//     courseQuestions: [
//       {
//         id: 2,
//         uuid: '65eb3e89-b3cd-48fd-8982-b1ae468ddc82',
//         createdAt: '2024-03-13T04:51:48.143Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.OX,
//         question: 'Câu 2',
//         content: 'Bhihi',
//         point: 20,
//         totalAnswers: 2,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: false
//           },
//           {
//             content: 'B',
//             isAnswer: true
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 1,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 3,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 4,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 5,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 6,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 7,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 8,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 9,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       },
//       {
//         id: 10,
//         uuid: 'db6f8387-98d5-4017-a199-1f48848f2be7',
//         createdAt: '2024-03-13T04:51:48.136Z',
//         updatedAt: '2024-03-13T04:51:48.000Z',
//         deletedAt: '',
//         type: COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE,
//         question: 'Câu 1',
//         content: 'Ahihi',
//         point: 20,
//         totalAnswers: 3,
//         answers: [
//           {
//             content: 'A',
//             isAnswer: true
//           },
//           {
//             content: 'B',
//             isAnswer: false
//           },
//           {
//             content: 'C',
//             isAnswer: false
//           }
//         ],
//         courseQuizId: 1
//       }
//     ],
//     user: null
//   }
// }

export const COURSE_RESULT: TCourseResult = {
  id: 1,
  uuid: 'a4f3da00-845e-4bd7-8231-c1930b11586f',
  createdAt: '2024-03-13T04:52:38.575Z',
  updatedAt: '2024-03-13T04:52:38.575Z',
  deletedAt: '',
  type: 'TEST',
  result: COURSE_APPLICATION_HISTORY_RESULT.FAIL,
  questions: [
    {
      id: 2,
      point: 20,
      answers: [
        {
          content: 'A',
          isAnswer: false,
          hasSelect: false,
          isCorrect: false
        },
        {
          content: 'B',
          isAnswer: true,
          hasSelect: true,
          isCorrect: true
        }
      ],
      content: 'Bhihi',
      question: 'Câu 2',
      isCorrect: true
    },
    {
      id: 1,
      point: 20,
      answers: [
        {
          content: 'A',
          isAnswer: true,
          hasSelect: false,
          isCorrect: false
        },
        {
          content: 'B',
          isAnswer: false,
          hasSelect: true,
          isCorrect: false
        },
        {
          content: 'C',
          isAnswer: false,
          hasSelect: true,
          isCorrect: false
        }
      ],
      content: 'Ahihi',
      question: 'Câu 1',
      isCorrect: false
    }
  ],
  point: 20,
  passingPoint: 80,
  totalPoint: 40,
  timeTaken: 3600,
  wrongAnswer: 1,
  courseId: 1,
  courseApplicationId: 1,
  userId: 28,
  course: {} as TCourse,
  courseApplication: {} as TCourseApplications,
  user: {} as TUser
}
