export default {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://maintenance-tracker-andela.herokuapp.com/api/v1' : 'http://localhost:8000/api/v1',
};
