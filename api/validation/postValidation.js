const yup = require('yup');

const postSchema = yup.object({
  title: yup.string().required('Title is required').max(100),
  subtitle: yup.string().max(150),
  description: yup.string().required('Description is required'),
  poster: yup.string().required('Poster (user ID) is required').matches(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'), // Validate ObjectId format
});

module.exports = postSchema;
