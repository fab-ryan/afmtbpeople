import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter a valid email address'),
  name: yup.string().required('Please enter a valid name'),
  phone: yup
    .string()
    .required('Phone number is Required')
    .matches(
      /\(?([\78|79|72|73]{2})\)?([0-9]{7})$/,
      'That does not look like a phone number',
    )
    .max(9, 'Phone number must be 9 digits'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special character',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});
