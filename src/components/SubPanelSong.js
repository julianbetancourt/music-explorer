import React from 'react';

const SubPanelSong = ({onClick, name, audio}) => {
  return (
    <div className="sub-panel" onClick={onClick} data-n={audio}>
        <div className="sub-panel__photo">
          <img src='http://simpleicon.com/wp-content/uploads/headphone-2.png' alt="" />
        </div>
        <div className="sub-panel__name">
          <span>{name}</span>
        </div>
    </div>
  );
}

export default SubPanelSong;
