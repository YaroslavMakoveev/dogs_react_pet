import { useState, useEffect } from "react";
import plus from "../assets/icons/plus.png";
import minus from "../assets/icons/minus.png";
import { useNavigate } from "react-router-dom";

const GetDog = () => {
  const [dog, setDog] = useState({});
  const [fav, setFav] = useState(() => {
    const saved = localStorage.getItem("favDogs");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate("");

  const getDog = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setDog(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = (dog) => {
    if (fav.some((favDog) => favDog.message === dog.message)) {
      alert("Картинка уже в избранном");
    } else {
      setFav([...fav, dog]);
    }
  };

  const removeFromFav = (dog) => {
    setFav(fav.filter((item) => item.message !== dog.message));
  };

  const removeAll = () => {
    setFav([]);
  };

  useEffect(() => {
    localStorage.setItem("favDogs", JSON.stringify(fav));
  }, [fav]);

  useEffect(() => {
    console.log(fav);
  }, [fav]);

  useEffect(() => {
    getDog();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="main__inner">
          <div className="dog__card">
            <img src={`${dog.message}`} alt="dog" />
            <div className="card__buttons">
              <button onClick={getDog} className="get__dog__btn">
                Get Dog
              </button>
              <button className="fav__btn">
                {fav.some((favDog) => favDog.message === dog.message) ? (
                  <>
                    <img
                      src={minus}
                      alt="minus"
                      onClick={() => removeFromFav(dog)}
                    />
                  </>
                ) : (
                  <>
                    <img src={plus} alt="plus" onClick={() => addToFav(dog)} />
                  </>
                )}
              </button>
            </div>
          </div>

          {fav.length >= 1 && (
            <div className="remove__all__btn">
              <button onClick={() => removeAll()}>Remove all</button>
            </div>
          )}

          <div className="fav__container">
            {fav.slice(0, 8).map((favDog) => (
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
          {fav.length >= 8 && (
            <div className="show__all__container">
              <button
                className="show__all__btn"
                onClick={() => {
                  navigate("/favorites");
                }}
              >
                Go to Favorites page
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default GetDog;
