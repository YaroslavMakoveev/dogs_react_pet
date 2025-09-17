import { useState, useEffect } from "react";
import plus from "../assets/icons/plus.png";
import minus from "../assets/icons/minus.png";

const GetDog = () => {
  const [dog, setDog] = useState({});
  const [fav, setFav] = useState([]);

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
        </div>
      </div>
    </main>
  );
};

export default GetDog;
