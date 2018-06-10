/* eslint-disable */

const getAllUsersRequests = () => {
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

  const url = 'https://maintenance-tracker-andela.herokuapp.com/api/v1/requests/';
  // const url = 'http://localhost:8000/api/v1/requests/';

  fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'x-auth': retrievedToken,
    },
  })
    .then(res => res.json())
    .then((usersRequests) => {
      const requests = usersRequests.data.request;

      return requests.map((request) => {
        const tr = createNode('tr');

        const td1 = createNode('td');
        td1.setAttribute('data-label', 'Requester');
        td1.innerHTML = `${request.requested_by}`;

        const td2 = createNode('td');
        td2.setAttribute('data-label', 'Title');
        td2.innerHTML = `${request.title}`;

        const td3 = createNode('td');
        td3.setAttribute('data-label', 'Type');
        td3.innerHTML = `${request.type}`;

        const td4 = createNode('td');
        td4.setAttribute('data-label', 'Manage');

        const manageBtn = createNode('button');
        manageBtn.setAttribute('id', 'manage');
        manageBtn.innerHTML = 'Manage ';

        const manageFont = createNode('i');
        manageFont.setAttribute('class', 'far fa-clipboard');

        const td5 = createNode('td');
        td5.setAttribute('data-label', 'Resolve');

        const resolveBtn = createNode('button');
        resolveBtn.setAttribute('id', 'resolve');
        resolveBtn.setAttribute('disabled', 'disabled');
        resolveBtn.innerHTML = 'Resolve ';

        const resolveFont = createNode('i');
        resolveFont.setAttribute('class', 'far fa-check-square');

        const td6 = createNode('td');
        td6.setAttribute('data-label', 'Created');
        td6.innerHTML = formatDate(`${request.created_at}`);

        append(tr, td1);
        append(tr, td2);
        append(tr, td3);
        append(manageBtn, manageFont);
        append(td4, manageBtn);
        append(tr, td4);
        append(resolveBtn, resolveFont);
        append(td5, resolveBtn);
        append(tr, td5);
        append(tr, td6);

        const tbody = document.getElementById('tbody');
        append(tbody, tr);
      });
    });
};

getAllUsersRequests();
