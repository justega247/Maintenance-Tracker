import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../../server/app';
import { fakeToken, expiredToken, secondfakeToken } from './mock';

describe('POST /auth/signup', () => {
  it('should sign up a new user if valid data is sent', (done) => {
    const newUser = {
      username: 'elNinoperezo',
      fullname: 'Fernando Torres',
      email: 'torreso@andela.com',
      password: 'passworded',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(201)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
      })
      .end(done);
  });

  it('should not sign up a new user if user data already exists', (done) => {
    const newUser = {
      username: 'elNinoperezo',
      fullname: 'Fernando Torres',
      email: 'torreso@andela.com',
      password: 'passworded',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(409)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
      })
      .end(done);
  });

  it('should not sign up a new user with invalid email', (done) => {
    const newUser = {
      username: 'elNinope',
      fullname: 'Fernando Torres',
      email: 'torresoandela.com',
      password: 'passworded',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.email).to.equal('Sorry, your email is invalid');
      })
      .end(done);
  });

  it('should not sign up a new user with invalid username', (done) => {
    const newUser = {
      username: '    ',
      fullname: 'Fernando Torres',
      email: 'torreso@andela.com',
      password: 'passworded',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.username).to.equal('Sorry, your username is invalid');
      })
      .end(done);
  });

  it('should not sign up a new user with no password', (done) => {
    const newUser = {
      username: 'iamnofour',
      fullname: 'Fernando Torres',
      email: 'torreso@andela.com',
      password: '',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.password).to.equal('Sorry, your password is invalid');
      })
      .end(done);
  });

  it('should not sign up a new user with invalid fullname', (done) => {
    const newUser = {
      username: 'iamnofour',
      fullname: 'Fernando99 Torres',
      email: 'torreso@andela.com',
      password: 'passworded',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.fullname).to.equal('Sorry, your fullname is invalid');
      })
      .end(done);
  });

  it('should throw an error when the request cannot be processed', (done) => {
    const newUser = {
      username: 'iamnofourthhhhhhhhhhhhhhhy',
      fullname: 'Fernando Torres',
      email: 'thorreso@andela.com',
      password: 'passworded',
    };
    request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, your request could not be processed');
      })
      .end(done);
  });
});

describe('POST /auth/login', () => {
  it('should login a registered user when valid data is sent', (done) => {
    const userLogin = {
      username: 'johnson',
      password: 'password',
    };
    request(app)
      .post('/api/v1/users/auth/login')
      .send(userLogin)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You signed in successfully');
      })
      .end(done);
  });

  it('should not login a user when invalid email is sent', (done) => {
    const userLogin = {
      username: 'johnsono',
      password: 'password',
    };
    request(app)
      .post('/api/v1/users/auth/login')
      .send(userLogin)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('No user found with that username.');
      })
      .end(done);
  });

  it('should not login a user when invalid password is sent', (done) => {
    const userLogin = {
      username: 'johnson',
      password: 'passwordd',
    };
    request(app)
      .post('/api/v1/users/auth/login')
      .send(userLogin)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, your password does not match');
      })
      .end(done);
  });

  it('should not login a user when no username is sent', (done) => {
    const userLogin = {
      password: 'password',
    };
    request(app)
      .post('/api/v1/users/auth/login')
      .send(userLogin)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.username).to.equal('Sorry, you have to specify a valid username');
      })
      .end(done);
  });

  it('should not login a user when no password is sent', (done) => {
    const userLogin = {
      username: 'johnson',
    };
    request(app)
      .post('/api/v1/users/auth/login')
      .send(userLogin)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.password).to.equal('Sorry, you have to specify a valid password');
      })
      .end(done);
  });
});

describe('POST /users/requests', () => {
  it('should create a new request when valid data is sent', (done) => {
    const newRequest = {
      title: 'A broken desk',
      type: 'repairs',
      description: 'I have a desk that is badly broken, and i will like it fixed',
    };
    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', fakeToken)
      .send(newRequest)
      .expect(201)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('A new request was just created');
      })
      .end(done);
  });

  it('should not create a new request when invalid data is sent', (done) => {
    const newRequest = {
      title: '',
      type: 'repairs',
      description: 'I have a desk that is badly broken, and i will like it fixed',
    };
    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', fakeToken)
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.title).to.equal('Sorry, the title you have entered is invalid');
      })
      .end(done);
  });

  it('should not create a new request when invalid data is sent', (done) => {
    const newRequest = {
      title: 'broken desk',
      type: 'repairs',
      description: '',
    };
    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', fakeToken)
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.error.description).to.equal('Sorry, the description you have entered is invalid');
      })
      .end(done);
  });

  it('should not create a new request when the user does not exist', (done) => {
    const newRequest = {
      title: 'broken desk',
      type: 'repairs',
      description: 'A very bad desk to begin with',
    };
    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', secondfakeToken)
      .send(newRequest)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, no user with a matching id was found');
      })
      .end(done);
  });

  it('should not create a new request when the type does not exist', (done) => {
    const newRequest = {
      title: 'broken desk',
      type: 'fixing',
      description: 'A very bad desk to begin with',
    };
    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', fakeToken)
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Please check the details you have entered');
      })
      .end(done);
  });

  it('should not create a new request the token is expired', (done) => {
    const newRequest = {
      title: 'broken desk',
      type: 'repairs',
      description: '',
    };
    request(app)
      .post('/api/v1/users/requests')
      .set('x-auth', expiredToken)
      .send(newRequest)
      .expect(401)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Current session expired,please login to continue');
      })
      .end(done);
  });

  it('should not create a new request the token is not supplied', (done) => {
    const newRequest = {
      title: 'broken desk',
      type: 'repairs',
      description: '',
    };
    request(app)
      .post('/api/v1/users/requests')
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Please, you have not added your token');
      })
      .end(done);
  });
});
