import React, { useEffect, useState } from 'react';

// Reat application
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'messages/');
      const jsonData = await response.json();
      setData(jsonData.messages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Bonjour à tous! : ' + new Date().toLocaleString(),
        }),
      });
      const jsonData = await response.json();
      console.log('Response from backend:', jsonData);
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>React Application</h1>
      <button onClick={postData}>Send POST Request</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
