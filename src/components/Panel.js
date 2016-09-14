import React from 'react';
import Tag from './Tag';

const Panel = ({img, name, description, tags}) => {
  return (
    <div className="panel">
      <div className="panel__photo">
        <img src={img} alt="" />
      </div>
      <div className="panel__info">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="panel__info__tags">
          Tags:
          {tags.map((tag, i) => <Tag tagName={tag.name} key={i}/>)}
        </div>
      </div>
    </div>
  );
}

export default Panel;
