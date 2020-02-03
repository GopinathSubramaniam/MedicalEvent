export const Constants = {
   URL: {
      BASE: 'http://192.168.100.209:1337',
      REGISTER: '/auth/local/register',
      LOGIN: '/auth/local',
      QUAL: '/qualifications',
      IDPROOF: '/id-proofs',
      NEWSLETTER: '/newsletters',
      FILE_UPLOAD: '/upload/',
      EVENT: '/events',
      ORGANISER_DETAILS: '/organiser-details'
   },
   MSG: {
      SOMETHING_WENT_WRONG: 'Something went wrong'
   },
   getUrl: getUrl,
   getToken: getToken
}


function getUrl(childPath) {
   let url = this.URL.BASE + childPath;
   return url;
}


function getToken() {
   let token = sessionStorage.getItem('jwtToken');
   return token;
}