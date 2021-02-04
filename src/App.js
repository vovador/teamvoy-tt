import React, { useState, useEffect, useRef } from 'react';
import 'bulma'
import { getMarkUpInfo, getPekemonExtendedInfo, getPekemonTypes } from './api/api'
import './styles/App.scss';
import classnames from 'classnames';
import { ExtendedInfoCard } from './components/ExtendedInfoCard';
import { PekemonList } from './components/PekemonList';

function App() {


  const [pekemons, setPekemons] = useState([]);
  const [visiblePekemons, setVisiblePekemons] = useState(pekemons)
  const [furtherLoadingLink, setFurtherLoadingLink] = useState('');
  const [extendedPekInfo, setExtendedPekInfo] = useState(null);
  const [pekemonTypesList, setPekemonTypesList] = useState(null);
  const [typeCriterion, setTypeCriterion] = useState('');
  const [loading, switchLoading] = useState(false);
  const buttonRef = useRef(null);

  const updateLoadedDate = (link) => {
    setTypeCriterion('all');
    getMarkUpInfo(link)
    .then(result => {
      console.log(result);
      setFurtherLoadingLink(result.next);
      setPekemons(current => [...current, ...result.pekemonCardInfo]);
      switchLoading(false);
    });
  }

  const extendedInfoHandler = (id) => {
    getPekemonExtendedInfo(id)
      .then(gotten => {
        setExtendedPekInfo(gotten);
      });
  }

  const handleVisiblePekFilter = (criterion) => {
    if(criterion === "all") {
      setVisiblePekemons(pekemons)
    }else {
      const filteredPekemons = pekemons.filter(pekemon => pekemon.types.includes(criterion));
      setVisiblePekemons(filteredPekemons);
    }

  }

  useEffect(() => {
    updateLoadedDate('http://pokeapi.co/api/v2/pokemon/?limit=12');
    getPekemonTypes().then((gotten) => {
      console.log('here', gotten);
      setPekemonTypesList(gotten);
    })
  },[])

  useEffect(() => {
    console.log('done');
    setVisiblePekemons(pekemons);
  }, [ pekemons]);

  useEffect(() => {
    console.log('well-done');
    buttonRef.current.scrollIntoView({
      behavior: "smooth"
    });
  }, [ visiblePekemons])

  return (
    <>
    <h1 className="page-title">Pokedex</h1>
    <br />
    <div className="main-content">
      <div className="initial-mark-up-container">
      <select
        className="select is-normal"
        value={typeCriterion}
        onChange={(event) => {
          setTypeCriterion(event.target.value);
          handleVisiblePekFilter(event.target.value);
        }}
      >
        <option value='all'>
          all
        </option>
      {pekemonTypesList?.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
      <PekemonList pekemons={visiblePekemons} extendedInfoHandler={extendedInfoHandler} />
      <button
      className={classnames('loading-button', 'button', 'is-info', {'is-loading': loading})}
      type="button"
      ref={buttonRef}
      onClick={ () => {
        switchLoading(true);
        updateLoadedDate(furtherLoadingLink);
      }}
    >
      Load More
    </button>
      </div>
      <div className="extended-info-container">
        {extendedPekInfo && <ExtendedInfoCard extendedPekInfo={extendedPekInfo} />}
      </div>
    </div>
    </>
  );
}

export default App;
