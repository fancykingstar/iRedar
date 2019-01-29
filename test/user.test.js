process.env.NODE_ENV = 'test';

const req = require('supertest');
const chai = require('chai');
const app = require('../server');

const should = chai.should();

describe('/api/users', () => {
  it('register success', (done) => {
    req(app)
      .post('/api/users/register')
      .send({
        email: 'test1@gmail.com',
        password: 'abc123',
        passwordConfirmation: 'abc123',
        firstName: 'test',
        lastName: 'ok',
      })
      .expect(200)
      .expect({ success: true }, done);
  });

  it('login success', (done) => {
    req(app)
      .post('/api/users/login')
      .send({
        email: 'test1@gmail.com',
        password: 'abc123',
      })
      .expect(200)
      .expect((res) => {
        should.exist(res.body.token);
      })
      .end(done);
  });

  it('register fail - existing email', (done) => {
    req(app)
      .post('/api/users/register')
      .send({
        email: 'test1@gmail.com',
        password: 'abc123',
        passwordConfirmation: 'abc123',
        firstName: 'test',
        lastName: 'ok',
      })
      .expect(
        422,
        {
          errors: [
            {
              title: 'Invalid Email',
              detail: 'User already exists',
            },
          ],
        },
        done,
      );
  });
});
