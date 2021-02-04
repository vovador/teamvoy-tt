import React from 'react';

export function ExtendedInfoCard({ extendedPekInfo }) {

  return (
    <div className="extended-info-card">
      <img src={extendedPekInfo.picture} alt='jg' className="extended-info-card__picture" />
      <h2 className="extended-info-card__title">{extendedPekInfo.name}{` #`}{`${extendedPekInfo.id}`.padStart(3, '0')}</h2>
      <table className="extended-info-card__stats">
        <tbody>
        <tr>
          <td className="extended-info-card__property-name">Type</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.pekemonType.join(' ')}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">Attack</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.attack}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">Defense</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.defense}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">HP</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.hp}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">SP Attack</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.spAttack}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">SP Defense</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.spDefense}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">Speed</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.speed}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">Weight</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.weight}</td>
        </tr>
        <tr>
          <td className="extended-info-card__property-name">Total moves</td>
          <td className="extended-info-card__property-value">{extendedPekInfo.totalMoves}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}
