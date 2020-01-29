export const Constants = {
   TYPE: {
      REG: 'REGISTER',
      LOGIN: 'LOGIN',
      QUAL: 'QUAL',
      IDPROOF: 'IDPROOF',
      NEWSLETTER: 'NEWSLETTER',
      FILE_UPLOAD: 'FILE_UPLOAD'
   },
   URL: {
      BASE: 'http://192.168.100.209:1337',
      REGISTER: '/auth/local/register',
      LOGIN: '/auth/local',
      QUAL: '/qualifications',
      IDPROOF: '/id-proofs',
      NEWSLETTER: '/newsletters',
      FILE_UPLOAD: '/upload/'
   },
   MSG: {
      SOMETHING_WENT_WRONG: 'Something went wrong'
   },
   getUrl: getUrl
}


function getUrl(type) {
   let url = this.URL.BASE;
   if (type == this.TYPE.REGISTER) url += this.URL.REGISTER;
   if (type == this.TYPE.LOGIN) url += this.URL.LOGIN;
   if (type == this.TYPE.QUAL) url += this.URL.QUAL;
   if (type == this.TYPE.IDPROOF) url += this.URL.IDPROOF;
   if (type == this.TYPE.NEWSLETTER) url += this.URL.NEWSLETTER;
   if (type == this.TYPE.FILE_UPLOAD) url += this.URL.FILE_UPLOAD;

   return url;
}