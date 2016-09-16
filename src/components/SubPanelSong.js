import React from 'react';

const SubPanelSong = ({onClick, name, audio}) => {
  return (
    <div className="sub-panel" onClick={onClick} data-n={audio}>
        <div className="sub-panel__photo">
          <img src='https://cdn4.iconfinder.com/data/icons/sound-and-audio/32/black_8_audio_headphones-512.png' alt="" />
        </div>
        <div className="sub-panel__name">
          <span>{name}</span>
        </div>
    </div>
  );
}

export default SubPanelSong;
