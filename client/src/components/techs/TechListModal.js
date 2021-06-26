import React, { useState, useEffect } from 'react';
import TechItem from './TechItem';
const TechListModal = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, []);

  const getTechs = async () => {
    setloading(true);
    try {
      const res = await fetch('/api/techs');
      const data = await res.json();
      setTechs(data);
    } catch (err) {
      console.error(err.message);
    }
    setloading(false);
  };
  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          {!loading &&
            techs.map((tech) => <TechItem tech={tech} key={tech._id} />)}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
