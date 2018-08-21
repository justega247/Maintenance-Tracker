/* eslint-disable */

const createNewRequest = () => {
  document.getElementById('lgbtn').addEventListener('click', () => {
    localStorage.removeItem('AuthenticationToken');
  });

  const createRequest = (e) => {
    e.preventDefault();

    document.getElementById('descriptionError').innerHTML = '';
    document.getElementById('titleError').innerHTML = '';

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const type = document.getElementById('type');

    const retrievedToken = localStorage.getItem('AuthenticationToken');

    const url = 'https://maintenance-tracker-andela.herokuapp.com/api/v1/users/requests';
    // const url = 'http://localhost:8000/api/v1/users/requests';

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
        if (newRequest.status === 'success') {
          window.location.href = '/usersrequest.html';
        } else {
          if (newRequest.errors.description) {
            document.getElementById('descriptionError').innerHTML = `${newRequest.errors.description[0]}`;
          }
          if (newRequest.errors.title) {
            document.getElementById('titleError').innerHTML = `${newRequest.errors.title[0]}`;
          }

        }
      });
  };
  document.getElementById('request').addEventListener('submit', createRequest);
}

createNewRequest();
