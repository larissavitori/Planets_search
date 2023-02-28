import { useContext, useState } from 'react';
import Mycontext from '../context/myContext';

function Table() {
  const { planets, setPlanets } = useContext(Mycontext);
  // const { arrayFiltro, setFiltro } = useContext(Mycontext);

  const [search, setSearch] = useState('');
  const [Coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [number, setNumber] = useState(0);

  /*   useEffect(() => {
  }); */
  const handlechange = ({ target }) => {
    setSearch(target.value);
    if (!search) {
      setPlanets(planets);
    } /* else {
      setPlanets(filtroCampos);
    } */
  };
  const filterName = planets.filter(({ name }) => name.includes(search));
  // ajuda da natalia Brasil t27B && monitoria da manhã
  const handleClickFilter = () => {
    const filtroCampos = filterName.filter((planetas) => {
      switch (operador) {
      case 'maior que':
        return +(planetas[Coluna]) > +(number);
      case 'menor que':
        return +(planetas[Coluna]) < +(number);
      case 'igual a':
        return +(planetas[Coluna]) === +(number);
      default:
        return true;
      }
    });
    return setPlanets(filtroCampos);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <td />
          <th>Rotation period</th>
          <td />
          <th>Orbital period</th>
          <td />
          <th>Diameter</th>
          <td />
          <th>Climate</th>
          <td />
          <th>Gravity</th>
          <td />
          <th>Terrain</th>
          <td />
          <th>Surface water</th>
          <td />
          <th>Population</th>
          <td />
          <th>Films</th>
          <td />
          <th>created</th>
          <td />
          <th>edited</th>
          <td />
          <th>url</th>
        </tr>
      </thead>
      <tbody>

        { filterName.map((planetas) => (
          <tr key={ planetas.name }>
            <td>
              {planetas.name}
            </td>
            <td>
              { planetas.rotation_period}
            </td>
            <td>
              {planetas.orbital_period}
            </td>
            <td>
              {planetas.diameter}
            </td>
            <td>
              {planetas.climate}
            </td>
            <td>
              {planetas.gravity}
            </td>
            <td>
              {planetas.terrain}
            </td>
            <td>
              {planetas.surface_water}
            </td>
            <td>
              {planetas.population}
            </td>
            <td>
              {planetas.films}
            </td>
            <td>
              {planetas.created}
            </td>
            <td>
              {planetas.edited}
            </td>
            <td>
              {planetas.url}
            </td>
          </tr>
        ))}
        <input
          data-testid="name-filter"
          type="text"
          value={ search }
          onChange={ handlechange }
          placeholder="Name"
        />
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => {
            setColuna(target.value);
          } }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <br />
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => {
            setOperador(target.value);
          } }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ number }
          onChange={ ({ target }) => {
            setNumber(target.value);
          } }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => handleClickFilter() }
        >
          filtrar

        </button>
        <br />
        {/*   {arrayFiltro.map((planetas) => (
          <div key={ planetas.name }>
            {planetas}
            <br />
          </div>
        ))} */}
      </tbody>
    </table>
  );
}
export default Table;
