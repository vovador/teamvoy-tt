import React from 'react';

export function PekemonList({ pekemons, extendedInfoHandler }) {

  return (
    <div className="cards-gallery">
      {pekemons.map((pekemon, id) => (
        <div
          className="cards-gallery__card"
          data-link={pekemon.linksToExtandedInfo}
          key={pekemon.id * Math.random()}
          onClick={() => {
            extendedInfoHandler(pekemon.id);
          }}
        >
          <div className="cards-gallery__card-picture-container">
            <img className="cards-gallery__card-picture" src={pekemon.picture} alt='' />
          </div>
          <h3 className="cards-gallery__card-title">
            {pekemon.name}
          </h3>
          <div className="cards-gallery__card-types">
            {pekemon.types.map(type => (
              <div key={type} className={`cards-gallery__card-type ${type}`}>
                {type}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
