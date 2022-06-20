import React from 'react';

function Card (props) {
  function handleClick() {
    props.onSelectedCard(props.card);
  }  
  return (
    <li className="element__list">
      <img className="element__img" src ={props.card.link} alt="фото" onClick={() => {handleClick()}}/>
      <button className="element__del element__del_active" type="button"></button>
      <div className="element__item">
        <p className="element__text">{props.card.name}</p>
        <button className="element__like" type="button">
          <p className="element__like_counter">{props.card.likes.length}</p>
        </button>
      </div>
     
    </li>
    
  )
}

export default Card