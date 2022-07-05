import React from 'react';
//import avatar from '../images/avatar.png';
//import api from '../utils/Api.js';
import Card from './Card.js';
import {CurrentUserContext, currentUserContext} from '../contexts/CurrentUserContext.js';
//import {CurrentCardContext, currentCardContext} from '../contexts/CurrentCardContext.js';

function Main (props) {
  const userContext = React.useContext(CurrentUserContext);
  //const cardContext = React.useContext(CurrentCardContext);
  return (
    <main className="content">
      <section className="profile" aria-label="профиль">
        <button className="profile__avatar-button profile__avatar-overlay" type="button" >
          <img src={userContext.avatar} className="profile__avatar" alt="аватар" onClick = {props.onEditAvatar}/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userContext.name}</h1>
          <button className="profile__info-button" type="button" onClick = {props.onEditProfile}></button>
          <p className="profile__work">{userContext.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick = {props.onAddPlace}></button>
      </section>

      <section className="elemets" aria-label="галерея">
        <ul className="element">
          {props.onCards.map ((card) => { return (
            <Card
              user= {userContext}
              card = {card}
              onSelectedCard={props.onSelectedCard}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}
              key={card._id}
            />
          )})}
        </ul>
      </section>
    </main>
  )
}

export default Main