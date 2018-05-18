import { expect } from 'chai';
import request from 'supertest';
import requests from '../seedData/request';
import testRequests from '../seedData/testRequest';
import app from '../../server/app';

describe('GET /users/request', () => {
  it('should return all a users request', (done) => {
    request(app)
      .get('/api/v1/users/requests')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to
          .equal('Your requests, have been retrieved successfuly');
        expect(res.body.myRequests).to.be.an('array');
      })
      .end(done);
  });

  describe('# When no request has been made', () => {
    before(() => {
      requests.splice(0);
    });

    it('should return an error message when there are no requests', (done) => {
      request(app)
        .get('/api/v1/users/requests')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to
            .equal('Sorry, you have not made any request');
          expect(res.body.requests).to.have.lengthOf(0);
        })
        .end(done);
    });
  });
});

describe('GET /users/request/requestId', () => {
  before(() => {
    requests.push(...testRequests);
  });

  it('should return a request if a valid id is sent', (done) => {
    request(app)
      .get('/api/v1/users/requests/2')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Your request has been found');
        expect(res.body.request).to.be.an('object');
      })
      .end(done);
  });

  it('should return an error message if an invalid id is sent', (done) => {
    const id = 22;
    request(app)
      .get(`/api/v1/users/requests/${id}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, there is no request with that id');
      })
      .end(done);
  });
});
