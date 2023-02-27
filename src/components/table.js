import { useContext, useState } from 'react';
import Mycontext from '../context/myContext';

function Table() {
  const [search, setSearch] = useState('');
  const { planets, setPlanets } = useContext(Mycontext);
  console.log(search);

  const handlechange = ({ target }) => {
    setSearch(target.value);
    if (!search) {
      setPlanets(planets);
    }
  };
  const filter = planets.filter(({ name }) => name.includes(search));

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

        { filter.map((planetas) => (
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
      </tbody>
    </table>
  );
}
export default Table;
