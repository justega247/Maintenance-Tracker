export const frontendRoutes = {
  LANDING: '/',
  SIGN_UP: '/signup',
  SIGN_IN: '/login',
  ADMIN_DASHBOARD: '/admin-dashboard',
  USER_DASHBOARD: '/user-dashboard',
  CREATE_REQUEST: '/create-request',
  EDIT_REQUEST: '/edit-request/:id',
  VIEW_REQUEST: '/view-request/:id',
  ADMIN_VIEW_REQUEST: '/admin-view-request/:id'
};

export const backendRoutes = {
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/signup',
  REQUESTS: '/users/requests',
  ADMIN_REQUESTS: '/requests'
};
