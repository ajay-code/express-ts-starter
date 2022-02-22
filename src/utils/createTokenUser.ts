const createTokenUser = ({ name, _id, email, role }: User) => {
  return { name, _id, email, role };
};

export default createTokenUser;
