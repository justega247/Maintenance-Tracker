/* eslint-disable */

const modal = document.getElementById('myModal');

const btn = document.getElementById('details');

const span = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  modal.style.display = 'block';
};

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const editModal = document.getElementById('editModal');

const editBtn = document.getElementById('edit');

const editSpan = document.getElementsByClassName('close')[1];

editBtn.onclick = () => {
  editModal.style.display = 'block';
}

editSpan.onclick = () => {
  editModal.style.display = 'none';
}

window.onclick = (event) => {
  if (event.target === editModal) {
    editModal.style.display = 'none';
  }
};