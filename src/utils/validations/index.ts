import * as yup from 'yup';



export const loginValidationSchema = yup.object().shape({
    // username can be email or phone number
    username: yup.string()
        .required('Username is required')
        .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
        .min(2, ({ min }) => `Username must be at least ${min} characters`)
        .max(20, ({ max }) => `Username must be at most ${max} characters`),


    password: yup.string().min(4, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
})

export const registerValidationSchema= yup.object().shape({
    first_name: yup.string().required('First Name is Required'),
    last_name: yup.string().required('Last Name is Required'),
    phone: yup.string()
    .min(10)
    .max(12)
    .required()
    .matches(/^(078|073|072|079|25078|25073|25079|25072)[0-9]+$/)
    .label('Phone Number')
    .required('Phone Number is Required'),
    email: yup.string().email().required('Email is Required'),
    password: yup.string().min(4).required('Password is Required'),
})
export const incomeValidationSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
    amount: yup.string().required('Amount is Required'),
    description: yup.string().required('Description is Required')
})

export const expenseValidationSchema = yup.object().shape({
    amount: yup.string().required('Amount is Required'),
    description: yup.string().required('Description is Required'),
    category_id: yup.string().required('Category is Required'),
})