/* eslint-disable */

const getUserRequests = () => {
  const createNode = element => document.createElement(element);
  const append = (parent, el) => parent.appendChild(el);

  const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    const createdAt = `${day}/${month}/${year}`;
    return createdAt;
  };

  const retrievedToken = localStorage.getItem('token');

  const url = 'https://maintenance-tracker-andela.herokuapp.com/api/v1/users/requests/';
  // const url = 'http://localhost:8000/api/v1/users/requests/';

  fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'x-auth': retrievedToken,
    },
  })
    .then(res => res.json())
    .then((userRequests) => {
      const requests = userRequests.data.request;

      return requests.map((request) => {
        const tr = createNode('tr');

        const td1 = createNode('td');
        td1.setAttribute('data-label', 'Created');
        td1.innerHTML = formatDate(`${request.created_at}`);

        const td2 = createNode('td');
        td2.setAttribute('data-label', 'Title');
        td2.innerHTML = `${request.title}`;

        const td3 = createNode('td');
        td3.setAttribute('data-label', 'Type');
        td3.innerHTML = `${request.type}`;

        const td4 = createNode('td');
        td4.setAttribute('data-label', 'Status');
        td4.innerHTML = `${request.status}`;

        const td5 = createNode('td');
        td5.setAttribute('data-label', 'Details');

        const detailsBtn = createNode('button');
        detailsBtn.setAttribute('id', 'details');
        detailsBtn.innerHTML = 'Details ';

        const detailsFont = createNode('i');
        detailsFont.setAttribute('class', 'fa fa-file');

        const td6 = createNode('td');
        td6.setAttribute('data-label', 'Edit');

        const editBtn = createNode('button');
        editBtn.setAttribute('id', 'edit');
        if (request.status !== 'pending') {
          editBtn.setAttribute('disabled', 'disabled');
          editBtn.style.color = 'black';
        }
        editBtn.innerHTML = 'Edit ';

        const editFont = createNode('i');
        editFont.setAttribute('class', 'far fa-edit');

        append(tr, td2);
        append(tr, td3);
        append(tr, td4);
        append(detailsBtn, detailsFont);
        append(td5, detailsBtn);
        append(tr, td5);
        append(editBtn, editFont);
        append(td6, editBtn);
        append(tr, td6);
        append(tr, td1);

        const tbody = document.getElementById('tbody');
        append(tbody, tr);

        detailsBtn.addEventListener('click', () => {
          const modal = document.getElementById('myModal');
          const span = document.getElementsByClassName('close')[0];

          fetch(`${url}${request.id}`, {
            method: 'get',
            mode: 'cors',
            headers: {
              'x-auth': retrievedToken,
            },
          })
            .then(res => res.json())
            .then((userRequest) => {
              const aRequest = userRequest.data.request;
              document.getElementById('requestId').innerHTML = `${aRequest.id}`;
              document.getElementById('title').innerHTML = `${aRequest.title}`;
              document.getElementById('type').innerHTML = `${aRequest.type}`;
              document.getElementById('status').innerHTML = `${aRequest.status}`;
              document.getElementById('description').innerHTML = `${aRequest.description}`;

              modal.style.display = 'block';

              span.onclick = () => {
                modal.style.display = 'none';
              };

              window.onclick = (event) => {
                if (event.target === modal) {
                  modal.style.display = 'none';
                }
              };
            });
        });

        editBtn.addEventListener('click', () => {
          const editModal = document.getElementById('editModal');
          const editSpan = document.getElementsByClassName('close')[1];

          editModal.style.display = 'block';

          editSpan.onclick = () => {
            editModal.style.display = 'none';
          };

          window.onclick = (event) => {
            if (event.target === editModal) {
              editModal.style.display = 'none';
            }
          };

          document.getElementById('requestType').value = `${request.type}`;
          document.getElementById('requestTitle').value = `${request.title}`;
          document.getElementById('requestDescription').value = `${request.description}`;

          const updateBtn = document.getElementById('updateBtn');

          updateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = document.getElementById('requestType');
            const description = document.getElementById('requestDescription');
            const title = document.getElementById('requestTitle');

            fetch(`${url}${request.id}`, {
              method: 'put',
              mode: 'cors',
              headers: {
                'x-auth': retrievedToken,
                'Content-Type': 'application/json',
                Accept: '*/*',
              },
              body: JSON.stringify({
                type: type.value,
                description: description.value,
                title: title.value,
              }),
            })
              .then(res => res.json())
              .then((updatedRequest) => {
                if (updatedRequest.status !== 'success') {
                  document.getElementById('info').innerHTML = `${updatedRequest.message}`;
                } else {
                  window.location.href = './usersrequest.html';
                }
              });
          });
        });
      });
    });
};

getUserRequests();
