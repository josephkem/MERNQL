const { gql } = require("apollo-server-express");
const { posts } = require("../temp");

const totalPosts = () => 42;

const allPosts = () => posts;

//mutation
const newPost = (parent, args) => {
  //create new post object
  const post = {
    id: posts.length++,
    title: args.input.title,
    description: args.input.description,
  };

  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
