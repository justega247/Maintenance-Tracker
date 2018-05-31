/* eslint-disable */

const createRequest = (e) => {
  e.preventDefault();

  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const type = document.getElementById('type');

  const retrievedToken = localStorage.getItem('token');

  fetch('https://maintenance-tracker-andela.herokuapp.com/api/v1/users/requests', {
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
        document.getElementById('info').innerHTML = 'Your request was created successfully';
      } else {
        document.getElementById('info').innerHTML = 'Please check the details you have entered';
      }
    });
};

document.getElementById('request').addEventListener('submit', createRequest);
