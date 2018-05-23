import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../../server/app';

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
