/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const signupUser = (e) => {
  e.preventDefault();

  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');

  fetch('http://localhost:8000/api/v1/auth/signup', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      fullname: fullname.value,
      email: email.value,
    }),
  })
    .then((res) => {
      const token = res.headers.get('x-auth');
      localStorage.setItem('token', JSON.stringify(token));
      return res.json();
    })
    .then((newUser) => {
      if (newUser.status !== 'success') {
        document.getElementById('info').innerHTML = newUser.message;
      } else {
        window.location.href = './usersrequest.html';
      }
    })
};

document.getElementById('lgfrm').addEventListener('submit', signupUser);
