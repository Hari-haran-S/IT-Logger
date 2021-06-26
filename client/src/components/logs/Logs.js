import React, { useState, useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setloading(true);
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err.message);
    }
    setloading(false);
  };
  if (loading) {
    return <Preloader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show....</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log._id} />)
      )}
    </ul>
  );
};

export default Logs;
