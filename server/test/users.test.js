import { expect } from 'chai';
import request from 'supertest';
import requests from '../seedData/request';
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
