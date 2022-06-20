import React from 'react';
//import avatar from '../images/avatar.png';
import api from '../utils/Api.js'
import Card from './Card.js';

class Main extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      userName: 'Жак-Ив Кусто',
      userDescription: 'Иссдедователь океана',
      userAvatar: '../images/avatar.png',
      cards: []
    }
  }

  componentDidMount() {
    api.getUser ()
      .then ((res) => {
        this.setState({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar
        })
      })
    api.getCards ()
      .then ((res) => {
        this.setState ({
          cards: res,
        })
      })
  }

  // componentWillUnmount() {
  //   document.documentElement.classList.remove('no-cursor');
  //   document.removeEventListener('mousemove', this.handleMouseMove);
  // }

  render () {
    return (
      <main className="content">
        <section className="profile" aria-label="профиль">
          <button className="profile__avatar-button profile__avatar-overlay" type="button" >
            <img src={this.state.userAvatar} className="profile__avatar" alt="аватар" onClick = {this.props.onEditAvatar}/>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{this.state.userName}</h1>
            <button className="profile__info-button" type="button" onClick = {this.props.onEditProfile}>
            </button>
            <p className="profile__work">{this.state.userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" onClick = {this.props.onAddPlace}>
          </button>
        </section>

        <section className="elemets" aria-label="галерея">
          <ul className="element">
            {this.state.cards.map ((card) => {
              return (
                  <Card 
                    card = {card}
                    onSelectedCard={this.props.onSelectedCard}
                    key={card._id}/>
              )
            })}
          </ul>
        </section>
      </main>
    )
  }
}

export default Main