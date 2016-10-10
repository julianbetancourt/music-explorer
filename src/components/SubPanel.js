import React from 'react';
import { Link } from 'react-router';

const SubPanel = ({img, name, onClick, isAlbum}) => {
  return (
    <Link to={`/artist/${name}`} className={isAlbum ? 'sub-panel album' : 'sub-panel'} onClick={onClick}>
        <div className="sub-panel__photo">
          <img src={img || 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f.png'} alt="" />
        </div>
        <div className="sub-panel__name">
          <span>{name}</span>
        </div>
    </Link>

  );
}

export default SubPanel;
