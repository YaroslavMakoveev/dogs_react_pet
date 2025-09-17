import { useState, useEffect } from "react";
import plus from "../assets/icons/plus.png";
import minus from "../assets/icons/minus.png";

const GetDog = () => {
  const [dog, setDog] = useState({});

  const getDog = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setDog(data);
    } catch (error) {
      console.log(error);
    }
  };

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
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GetDog;
