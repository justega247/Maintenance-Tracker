const checkForToken = localStorage.getItem('AuthenticationToken')

if (!checkForToken || checkForToken === 'null') {
  window.location.href = '/index.html'
};
