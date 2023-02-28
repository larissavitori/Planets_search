import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [arrayFiltro, setFiltro] = useState([]);
  console.log(planets);

  const fetchApi = async (url) => {
    const result = await fetch(url);
    const data = await result.json();
    const resultado = data.results;
    resultado.filter((data1) => delete data1.residents);
    return setPlanets(data.results);
  };

  useEffect(() => {
    const url = 'https://swapi.dev/api/planets/';
    fetchApi(url);
  }, []);

  const values = useMemo(() => ({
    planets, setPlanets, arrayFiltro, setFiltro,
  }), [planets, setPlanets, arrayFiltro, setFiltro]);

  return (
    <MyContext.Provider value={ values }>
      <div>
        {children}
      </div>
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
