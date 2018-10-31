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

  request: {
    type: 'repairs',
    title: 'Broken hedges',
    description: 'We will need to check and get the hedges fixed',
  },

  requestResponse: {
    data: {
      data: {
        request: {
          id: 3,
          title: 'Broken hedges',
          type: 'repairs',
          description: 'We will need to check and get the hedges fixed',
          user_id: 2,
        },
      },
      message: 'A new request was just created',
      status: 'success',
    },
  },

  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTQwOTI1MzkwLCJleHAiOjE1NDEwMTE3OTB9.2mF07KKBxiAjJKopEJESzFLCDMW45HUL0FSgX0oaAow',

  currentUser: {
    id: 2,
    iat: 1540925390,
    exp: 1541011790,
  },

  requestError: 'The request could not be handled',

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

