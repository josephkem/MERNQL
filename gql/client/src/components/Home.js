import React, { useState, useContext } from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);

  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);

  //access context
  const { state, dispatch } = useContext(AuthContext);

  //react router
  let history = useHistory;

  const updateUser = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Kemoy Joseph",
    });
  };

  if (loading) return <p className="p-5">Loading. . .</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data.allPosts.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4>{p.title}</h4>
                </div>
                <p className="card-text">{p.description}</p>
                <hr />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => fetchPosts()} className="btn btn-danger">
        Fetch Posts
      </button>

      <hr />
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(state.user)}
      <hr />
      <button onClick={updateUser} className="btn btn-primary">
        Change Username
      </button>
      <hr />
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
