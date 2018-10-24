export const validateEmail = emailAddress =>
  emailAddress && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailAddress)
