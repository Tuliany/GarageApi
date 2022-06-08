import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://adp.im/api/garage.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  let res = Object.values(data);
  let floors = res.flatMap((floors) => floors)
  let joined = []
  floors.forEach((e) => {
    if (e.parking_spots) {
      joined.push(...e.parking_spots);
    }
  })

  const avails = joined.filter((cars) => cars.is_available)
  const cars = avails.filter((cars) => cars.type === 'car')
  const mc = avails.filter((cars) => cars.type === 'mc')
  const spotNr = avails.filter((cars) => cars.number)
  const availSpotNr = spotNr.map((item => item.number))
  const notAvail = joined.filter((cars) => !cars.is_available)
  const price = joined.filter((cars) => cars.price === 12)


  console.log(price)
  return (
    <div className="garagem">
      <header className="porta">
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <h1>GARAGE CODE TEST</h1>
        <div className="info">
          <ul>
            <h3>Occupied:</h3><h3 className="occupied"> {notAvail.length}</h3>
            <h3>Available:</h3> <h3 className="avail"> {avails.length}</h3>
            <h3>Total revenue: </h3><h3 className="avail">{notAvail.length * 12}</h3>
          </ul>
          <ul className="flex-end">
            <h3>🚗 Cars: {cars.length}</h3>
            <h3>🏍 Mc: {mc.length}</h3>
          </ul>
        </div>
        <ul>
          <div className="available">
            <h3>Availability on floors: </h3>
            <h3>0</h3>
            <div className="flex">
              <h3>Spots:</h3>
              {availSpotNr.map((spots) => (
                spots < 14 && (
                  <h4>{spots}</h4>
                )
              ))}
            </div>
            <h3>1</h3>
            <div className="flex">
              <h3>Spots:</h3>
              {availSpotNr.map((spots) => (
                spots > 15 && spots < 28 && (
                  <h4>{spots}</h4>
                )
              ))}
            </div>
            <h3>2</h3>
            <div className="flex">
              <h3>Spots:</h3>
              {availSpotNr.map((spots) => (
                spots > 29 && spots < 41 && (
                  <h4>{spots}</h4>
                )
              ))}
            </div>
            <h3>3</h3>
            <div className="flex">
              <h3>Spots:</h3>
              {availSpotNr.map((spots) => (
                spots > 41 && (
                  <h4>{spots}</h4>
                )
              ))}
            </div>
          </div>
        </ul>
      </header>
    </div>
  );
}

export default App;
