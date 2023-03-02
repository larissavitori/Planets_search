import { useContext, useState } from 'react';
import Mycontext from '../context/myContext';

function Table() {
  const { planets, setPlanets } = useContext(Mycontext);
  const { filtros } = useContext(Mycontext);

  const [search, setSearch] = useState('');
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filtercolun, setFiltercolun] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period',
    'surface_water']);
  const [estados, setEstados] = useState([]);
  const [prev, setPrev] = useState([]);

  /*  useEffect(() => {
    setPlanets(planets);
  }, [planets]); */

  const handlechange = ({ target }) => {
    setSearch(target.value);
    if (!search) {
      setPlanets(planets);
    } /* else {
      setPlanets(filtroCampos);
    } */
  };
  // filtrei pelo nome
  const filterName = planets.filter(({ name }) => name.includes(search));
  // ajuda da natalia Brasil t27B && monitoria da manhã
  const handleClickFilter = () => {
    // coloquei filtro das colunas
    setPrev(planets);
    const filtroCampos = filterName.filter((planetas) => {
      switch (operador) {
      case 'maior que':
        return +(planetas[coluna]) > +(number);

      case 'menor que':
        return +(planetas[coluna]) < +(number);
      default:
        return +(planetas[coluna]) === +(number);
      }
    });
    setPlanets(filtroCampos);
    const filteredList = filtercolun.filter((el) => !coluna.includes(el));
    setFiltercolun(filteredList);
    // logica stack-over flow
    setColuna(filteredList[0]);
    setEstados([...estados, { number, operador, coluna }]);
  };
  const handleClickButon = ({ target }) => {
    /* const novoArray = [...estados];
    novoArray.splice(index, 1);
    setEstados(novoArray);
    setPlanets(filterName);
    console.log(filterName); */
    if (estados.length > 1) {
      const novoArray = estados.filter((estado) => estado.coluna !== target.id);
      setEstados(novoArray);
      setPlanets(prev);
    } else if (estados) {
      const novoArray = estados.filter((estado) => estado.coluna !== target.id);
      setEstados(novoArray);
      setPlanets(filtros);
    }
  };
  /* const filteredOptions = filterName.filter((e) => !coluna.includes(e));
  console.log(filteredOptions); */
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
          { filtercolun.map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
        </select>
        <br />
        <select
          data-testid="comparison-filter"
          value={ operador }
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
        { estados.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            <span>
              { filter.coluna}
              {' '}
              {filter.operador}
              {' '}
              {filter.number }
            </span>
            <button
              id={ filter.coluna }
              onClick={ handleClickButon }
            >
              delete
            </button>
          </div>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setEstados([]);
            setColuna('');
            setNumber('');
            setOperador('');
            setPlanets(filtros);
          } }
        >
          Remover Filtros
        </button>
      </tbody>
    </table>
  );
}
export default Table;
