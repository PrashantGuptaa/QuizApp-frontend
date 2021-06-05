let baseUrl = ''
if(process.env.environment === 'production')
baseUrl = 'https://quizapp-backend-pg.herokuapp.com/api/';
else
baseUrl = 'http://localhost:7888/api/';

export const APIEndPoints = {
      login: `${baseUrl}signin`,
      signup: `${baseUrl}signup`,
      verifyUser: `${baseUrl}verifyUser`,
      addQuestion: `${baseUrl}addquestion`,
      getQuestions: (category) => `${baseUrl}getquestions/${category}`,
}
 