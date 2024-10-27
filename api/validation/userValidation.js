const yup = require('yup');

const userSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  age: yup.number().integer('Age must be a whole number').min(18, 'Age must be at least 18').required('Age is required'),
  companyName: yup.string().required('Company name is required'),
});

// Schema for updates, making all fields optional
const userUpdateSchema = userSchema.shape({
  name: yup.string().optional(),
  email: yup.string().email().optional(),
  password: yup.string().min(8).optional(),
  age: yup.number().integer().min(18).optional(),
  companyName: yup.string().optional(),
});

module.exports = { userSchema, userUpdateSchema };
