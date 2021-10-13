import WorldDemo from "../components/threejs/World";
import worldsData from '../assets/data/courseinfo.json';
import Card from "../components/Card";
import Button from "../components/Button";
import store from 'store';
import WorldCard from "../components/threejs/WorldCard";

const ThreeJsDemo = () => {
  const data = worldsData;
  const allowed = ['blockchain', 'tdfa01', 'datascience01', 'programmingdapps01', 'introduction'];
  const continueLearning = store.get('lastWatched');

  const filtered = Object.keys(data)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  return (

  <div className="cardContainer">
    {Object.keys(filtered).map((data, i) => (
      <WorldCard
        key={i}
        image={worldsData[data].image}
        title={worldsData[data].course}
        description={worldsData[data].description}
        linkTitle='Enter world'
        linkUrl={worldsData[data].link}
        duration={worldsData[data].duration}
      />
    ))}
  </div>

  )
}

export default ThreeJsDemo;


