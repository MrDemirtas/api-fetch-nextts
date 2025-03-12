"use client";

import "./global.css";

import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  phone: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData>();
  const [text, setText] = useState<string>("1");

  useEffect(() => {
    getUserData(text);
  }, []);

  const getUserData = (text: string) => {
    fetch("https://jsonplaceholder.typicode.com/users/" + text)
      .then((x) => x.json())
      .then(setUserData);
  };

  return (
    <main>
      <div className="header">
        <h1>User Data</h1>
        <label>
          Get another user with id: <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={() => getUserData(text)}>GET</button>
        </label>
      </div>
      {userData ? (
        <div className="userdata-content">
          <p>
            Name: <strong>{userData.name}</strong>
          </p>
          <p>
            Email: <strong>{userData.email}</strong>
          </p>
          <p>
            Company Name: <strong>{userData.company.name}</strong>
          </p>
          <p>
            Address:
            <strong>{`${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}`}</strong>
          </p>
          <p>
            Phone: <strong>{userData.phone}</strong>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
