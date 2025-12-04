export const apiRoutes = {
  addChannel: '/api/v1/channels',
  addMessage: '/api/v1/messages',
  editChannelRequest: id => `/api/v1/channels/${id}`,
  getChannelsData: '/api/v1/channels',
  getMessagesData: '/api/v1/messages',
  loginRequest: '/api/v1/login',
  removeChannelRequest: id => `/api/v1/channels/${id}`,
  signupRequest: '/api/v1/signup',
}
