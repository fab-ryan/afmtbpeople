import * as yup from 'yup';



export const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Please enter valid email').required('Email Address is Required'),
    password: yup.string().min(6, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
})

export const incomeValidationSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
    amount: yup.number().required('Amount is Required'),
    date: yup.date().required('Date is Required'),
    description: yup.string().required('Description is Required')
})

export const expenseValidationSchema = yup.object().shape({
    title: yup.string().required('Title is Required'),
    amount: yup.number().required('Amount is Required'),
    date: yup.string().required('Date is Required'),
    description: yup.string().required('Description is Required')
})