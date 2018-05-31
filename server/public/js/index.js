/* eslint-disable */

const loginUser = (e) => {
  e.preventDefault();

  const username = document.getElementById('username');
  const password = document.getElementById('password');

  fetch('http://localhost:8000/api/v1/auth/login', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((res) => {
      const token = res.headers.get('x-auth');
      localStorage.setItem('token', JSON.stringify(token));
      return res.json();
    })
    .then((foundUser) => {
      if (foundUser.status !== 'success') {
        document.getElementById('info').innerHTML = 'Please, log in with your details';
      } else if (foundUser.data.user.id === 1) {
        window.location.href = './adminrequest.html';
      } else {
        window.location.href = './usersrequest.html';
      }
    });
};

document.getElementById('lgfrm').addEventListener('submit', loginUser);

