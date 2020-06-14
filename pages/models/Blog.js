import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  content: String
});
const Blog = mongoose.connection.models['blog'] || mongoose.model('blog', schema);

export default Blog;