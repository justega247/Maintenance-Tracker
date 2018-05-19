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
          .equal('Your requests have been retrieved successfuly');
        expect(res.body.requests).to.be.an('array');
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

describe('POST /users/requests', () => {
  it('should create a new request when valid data is sent', (done) => {
    const newRequest = {
      title: 'faulty sink',
      description: 'My sink is broken, I would like to fix it now.',
      type: 'repairs',
    };
    request(app)
      .post('/api/v1/users/requests/')
      .send(newRequest)
      .expect(201)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
      })
      .end(done);
  });

  it('should not create a new request when clashing data is sent', (done) => {
    const newRequest = {
      title: 'faulty sink',
      description: 'My sink is broken, I would like to fix it now.',
      type: 'repairs',
    };
    request(app)
      .post('/api/v1/users/requests/')
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, you already have a request with those details');
      })
      .end(done);
  });

  it('should not create a new request when faulty title is sent', (done) => {
    const newRequest = {
      title: 'fault9y sink',
      description: 'My sink is broken, I would like to fix it now.',
      type: 'repairs',
    };
    request(app)
      .post('/api/v1/users/requests/')
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
      })
      .end(done);
  });

  it('should not create a new request when faulty title is sent', (done) => {
    const newRequest = {
      title: 'faulty sink',
      description: 'My sink6 is broken, I would like to fix it now.',
      type: 'repairs',
    };
    request(app)
      .post('/api/v1/users/requests/')
      .send(newRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
      })
      .end(done);
  });
});

describe('POST /users/request/requestId', () => {
  it('should update a request when valid data is sent', (done) => {
    const id = 1;
    const updateRequest = {
      title: 'faulty sink',
      description: 'My sink is broken, I would like to fix it now please.',
      type: 'repairs',
    };
    request(app)
      .post(`/api/v1/users/requests/${id}`)
      .send(updateRequest)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).to.equal('success');
      })
      .end(done);
  });

  it('should not update a request when a request with the same details exists', (done) => {
    const id = 2;
    const updateRequest = {
      title: 'faulty sink',
      description: 'My sink is broken, I would like to fix it now please.',
      type: 'repairs',
    };
    request(app)
      .post(`/api/v1/users/requests/${id}`)
      .send(updateRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, you already have a request with those details');
      })
      .end(done);
  });

  it('should not update a request when an invalid id is sent', (done) => {
    const id = 22;
    const updateRequest = {
      title: 'faulty sink',
      description: 'My sink is badly broken, I would like to fix it now please.',
      type: 'repairs',
    };
    request(app)
      .post(`/api/v1/users/requests/${id}`)
      .send(updateRequest)
      .expect(404)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, no request with that id exists');
      })
      .end(done);
  });

  it('should not update a request when a empty string is sent', (done) => {
    const id = 2;
    const updateRequest = {
      title: '      ',
      description: 'My sink is broken, I would like to fix it now please.',
      type: 'repairs',
    };
    request(app)
      .post(`/api/v1/users/requests/${id}`)
      .send(updateRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.message).to.equal('Sorry, one or more of your update value is empty');
      })
      .end(done);
  });

  it('should not update a request that has invalid characters', (done) => {
    const id = 2;
    const updateRequest = {
      title: '      97',
      description: 'My sink is broken, I would like to fix it now please.',
      type: 'repairs',
    };
    request(app)
      .post(`/api/v1/users/requests/${id}`)
      .send(updateRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
      })
      .end(done);
  });

  it('should not update a request that has invalid characters', (done) => {
    const id = 2;
    const updateRequest = {
      description: 'My sink4 is broken, I would like to fix it now please.',
      type: 'repairs',
    };
    request(app)
      .post(`/api/v1/users/requests/${id}`)
      .send(updateRequest)
      .expect(400)
      .expect((res) => {
        expect(res.body.status).to.equal('fail');
      })
      .end(done);
  });
});
