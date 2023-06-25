import React from "react";
import { Tile } from '../tile/Tile'

export const TileList = ({ contacts }) => {
  return (
    <div className="tile-list">
      {contacts.map(({ name, ...description}, index) => (
        <Tile key={index} name={name} description={description}/>
      ))}
    </div>
  );
};