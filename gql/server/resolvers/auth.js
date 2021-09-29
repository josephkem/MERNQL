const { gql } = require("apollo-server-express");

const me = () => "Shawn";

module.exports = {
  Query: {
    me,
  },
};
