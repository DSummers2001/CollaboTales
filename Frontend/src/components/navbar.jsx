const Navbar = (loggedIn) => {
  function signOut() {
    localStorage.clear();
    window.location.href = '/Login';
  }

  return (
    <>
      <div className="headerHome">
        <a href='/'><img src="/niXpLb97T.png" alt="CollaboTales Logo" /></a>
        <h1>CollaboTales</h1>
        <div className="homeNav">
          {loggedIn.loggedIn && (<a id="signoutButton" onClick={signOut}>Sign Out</a>)}
          {!loggedIn.loggedIn && (<a id="loginButton" href="/Login">Login</a>)}
          {!loggedIn.loggedIn && (<a id="registerButton" href="/Register">Register</a>)}
        </div>
      </div>
    </>
  );
};

export default Navbar;
