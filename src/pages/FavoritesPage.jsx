import { useState, useEffect } from "react";
import Header from "../components/Header";

const FavoritesPage = () => {
  const [fav, setFav] = useState(() => {
    const saved = localStorage.getItem("favDogs");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromFav = (dog) => {
    setFav(fav.filter((item) => item.message !== dog.message));
  };

  const removeAll = () => {
    setFav([]);
  };

  useEffect(() => {
    localStorage.setItem("favDogs", JSON.stringify(fav));
  }, [fav]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="fav__page__inner">
          <div className="fav__page__header">
            <h1
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Favorite Dogs
            </h1>
            <button onClick={removeAll}>Remove all</button>
          </div>

          {fav.length === 0 ? (
            <>
              <>
                <h2 className="no__message">No favorites images</h2>
              </>
            </>
          ) : (
            <>
              <div className="fav__container">
                {fav.map((favDog) => (
                  <div className="fav__card">
                    <img
                      src={`${favDog.message}`}
                      alt="dsf"
                      className="fav__dog__img"
                    />
                    <button
                      className="delete__favDog"
                      onClick={() => removeFromFav(favDog)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
