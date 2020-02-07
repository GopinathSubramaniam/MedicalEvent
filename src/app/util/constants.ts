export const Constants = {
   URL: {
      BASE: 'http://192.168.100.209:1337',
      REGISTER: '/auth/local/register',
      USER: '/users',
      LOGIN: '/auth/local',
      QUAL: '/qualifications',
      IDPROOF: '/id-proofs',
      NEWSLETTER: '/newsletters',
      FILE_UPLOAD: '/upload/',
      EVENT: '/events',
      ORGANISER_DETAILS: '/organiser-details',
      SESSION: '/sessions'
   },
   MSG: {
      SOMETHING_WENT_WRONG: 'Something went wrong'
   },
   getUrl: getUrl,
   getToken: getToken,
   formatDate: formatDate
}


function getUrl(childPath) {
   let url = this.URL.BASE + childPath;
   return url;
}


function getToken() {
   let token = sessionStorage.getItem('jwtToken');
   return token;
}

function formatDate(date) {
   let day = date.getDate();
   let month = date.getMonth() + 1; // add 1 because months are indexed from 0
   if (month < 10) month = ('0' + month);
   if (day < 10) day = ('0' + day);
   let year = date.getFullYear();
   return (year + '-' + month + '-' + day);
}