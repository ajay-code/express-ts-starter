namespace Express {
  export interface Request {
    user?: User;
  }
}

interface User {
  name: string;
  _id: any;
  email: string;
  role: string;
}
