const validatePassword = () => {
    return next => {
      return action => {
        return next(action);
      };
    };
  };
  
  export default validatePassword;
  