import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate("");

  const goToFav = () => {
    navigate("/favorites");
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <a href="/" className="logo">
              The Dogs API
            </a>
            <button className="favorites__btn" onClick={() => goToFav()}>
              Favorites
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
