import React, { useState } from "react";
import axios from "axios";

const Github = () => {
  const [searchUser, setSearchUser] = useState("");
  const [userData, setUserData] = useState();

  const handleInput = (e) => {
    setSearchUser(e.target.value);
  };

  const getData = async () => {
    const response = await axios.get(`https://api.github.com/users/${searchUser}`);

    if (response.status === 200) {
      setUserData(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-md bg-white-500">
      <h1 className="text-2xl font-bold mb-4">Search Github User</h1>
      <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        placeholder="Enter a User name"
        onChange={handleInput}
        className="border border-gray-300 w-full rounded"
      />
      <button type="submit" className="bg-blue-500 text-white rounded" onClick={getData}>Search</button>
      </form>

      {userData ? (
        <div>
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>{userData.login}</h2>
          <p>Followers: {userData.followers}</p>
          <p>Repos: {userData.repos}</p>
          <a href={userData.html_url} target="_blank" className="block text-blue-500 text-center mt-2" >View Profile</a>
        </div>
      ) : null}
    </div>
    </div>
  );
};

export default Github;
