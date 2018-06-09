/* eslint-disable */

const createRequest = (e) => {
  e.preventDefault();

  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const type = document.getElementById('type');

  const retrievedToken = localStorage.getItem('token');

  //const url = 'https://maintenance-tracker-andela.herokuapp.com/api/v1/users/requests';
  const url = 'http://localhost:8000/api/v1/users/requests';

  fetch(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': retrievedToken,
      Accept: '*/*',
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      type: type.value,
    }),
  })
    .then(res => res.json())
    .then((newRequest) => {
      console.log(newRequest);
      if (newRequest.status === 'success') {
        window.location.href = './usersrequest.html';
      } else {
        document.getElementById('info').innerHTML = `${newRequest.message}`;
      }
    });
};

document.getElementById('request').addEventListener('submit', createRequest);
