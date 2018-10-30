const mockData = {
  loginData: {
    username: 'jasmine',
    password: 'password',
  },

  signUpDetails: {
    username: 'jasmine',
    email: 'jasmine@yahoo.com',
    password: 'password',
    fullname: 'jasmine pearl',
  },

  authResponse: {
    data: {
      data: {
        user: {
          id: 1,
          username: 'jasmine',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3',
        },
        message: 'You signed in successfully',
        status: 'success',
      },
    },
  },
};

export default mockData;

