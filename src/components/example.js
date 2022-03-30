<Route path="/sign-up">
<Register />
</Route>

<Route path="/sign-in">
<Login />
</Route>

<InfoTooltip/>


<ProtectedRoute path="/" loggedIn={loggedIn} component={Main}  />
<ProtectedRoute/>

<Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} openPopupDelete={handleOpenPopupDelete} onCardLike={handleCardLike} cards={cards} />

<Footer />


Что-то пошло не так!
Попробуйте ещё раз.

Вы успешно зарегистрировались!


function handlePath () {
    if (Register) {
        setPath('/sign-in"')
    }

    else {
        setPath('/sign-up')
    }
}





.then(res => res.json())
.then((data) => {
  // сохраняем токен
  localStorage.setItem('token', data.token);
}); 







localStorage.setItem('jwt', data.jwt);
setUserData({email})
setLoggedIn(true);
history.push('/');



function tokenCheck () {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена 
      const jwt = localStorage.getItem('jwt');
    if (jwt){
      // проверим токен
      duckAuth.getContent(jwt).then((res) => {
        if (res){
                  // здесь можем получить данные пользователя!
          const userData = {
            username: res.username,
            email: res.email
          }
                  // поместим их в стейт внутри App.js
          this.setState({
            loggedIn: true,
            userData
          }, () => {
            this.props.history.push("/ducks");
          });
        }
      }); 
    }






    {location.pathname ==='/sign-up' ? <NavLink to="/sign-in" className="header__info">Войти</NavLink> : <NavLink to="/sign-up" className="header__info">Регистрация</NavLink> }