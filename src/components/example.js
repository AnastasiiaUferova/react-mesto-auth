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