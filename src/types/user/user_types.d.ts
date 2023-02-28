// {
//   "pk": 1,
//   "name": "",
//   "email": "terecal@daum.net",
//   "profileImages": [
//       {
//           "pk": 12,
//           "file": "https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/da247423-8dcd-4ae7-b7c1-ac44928b4c00/public"
//       }
//   ]
// }

export interface IUserProfile {
    pk: string;
    name: string;
    eamil: string;
    profileImages: [{pk: string, file?: string}];
}
