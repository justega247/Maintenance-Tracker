import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../../server/app';
import { fakeToken, nextfakeToken, expiredToken, secondfakeToken } from './mock';

describe('GET /api/v1/requests/', () => {
  it('should return all the requests when accessed by the admin', (done) => {
    request(app)
      .get('/api/v1/requests')
      .set('x-auth', fakeToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Here are the request(s), that have been made');
        expect(res.body.requests).to.be.an('array');
      })
      .end(done);
  });

  it('should not return all the requests when the token supplied is expired', (done) => {
    request(app)
      .get('/api/v1/requests')
      .set('x-auth', expiredToken)
      .expect(401)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Current session expired,please login to continue');
      })
      .end(done);
  });

  it('should return an error when a normal user tries to access the route', (done) => {
    request(app)
      .get('/api/v1/requests')
      .set('x-auth', nextfakeToken)
      .expect(403)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, you are not allowed to access this route');
      })
      .end(done);
  });

  it('should return an error when the user does not exist', (done) => {
    request(app)
      .get('/api/v1/requests')
      .set('x-auth', secondfakeToken)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, no user with a matching id was found');
      })
      .end(done);
  });

  it('should return an error when no token is sent', (done) => {
    request(app)
      .get('/api/v1/requests')
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Please, you have not added your token');
      })
      .end(done);
  });
});

describe('PUT /:requestId/approve', () => {
  it('should change the status of a request from pending to approve', (done) => {
    const id = 2;

    request(app)
      .put(`/api/v1/requests/${id}/approve`)
      .set('x-auth', fakeToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully approved this request');
      })
      .end(done);
  });

  it('should not change the status of a request when the current status is not pending', (done) => {
    const id = 2;

    request(app)
      .put(`/api/v1/requests/${id}/approve`)
      .set('x-auth', fakeToken)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, the status of this request is no longer pending');
      })
      .end(done);
  });

  it('should return an error message if the id provided is invalid', (done) => {
    const id = 22;

    request(app)
      .put(`/api/v1/requests/${id}/approve`)
      .set('x-auth', fakeToken)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, there is no request with that id');
      })
      .end(done);
  });
});

describe('PUT /:requestId/disapprove', () => {
  it('should change the status of the request to disapproved', (done) => {
    const id = 2;

    request(app)
      .put(`/api/v1/requests/${id}/disapprove`)
      .set('x-auth', fakeToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('You have successfully disapproved this request');
      })
      .end(done);
  });

  it('should return an error message if the id provided is invalid', (done) => {
    const id = 22;

    request(app)
      .put(`/api/v1/requests/${id}/disapprove`)
      .set('x-auth', fakeToken)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, there is no request with that id');
      })
      .end(done);
  });
});
