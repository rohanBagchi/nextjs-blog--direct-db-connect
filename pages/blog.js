import React from 'react';
import mongoose from 'mongoose';
import Blog from './models/Blog';
import { List } from 'antd';

export default function blog({ posts }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={item.content}
          />
        </List.Item>
      )}
    />
  )
}

export async function getServerSideProps(context) {
  mongoose.connect(process.env.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log("mongoose connected")
  });

  const posts = await Blog.find({});
  const updatedPosts = posts.map(({ _id, title, content }) => {
    return {
      _id: _id + "",
      title,
      content
    };
  });

  return {
    props: {
      posts: updatedPosts
    }, // will be passed to the page component as props
  }
}