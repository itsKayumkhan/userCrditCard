import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import { Link } from "react-router-dom";
import axios from "axios";
import valid from 'card-validator'
const Home = () => {
  const [state, setState] = useState({
    card: "",
    name: "",
    expire: "",
    cvc: "",
    focus: "",
  });

  const [cards, setCards] = useState([]);
  const [cardValidation,setCardValidation] = useState({
    card: false,
    name: false,
    expire: false,
    cvc: false,
  })



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Apply formatting for credit card input
    if (name === "card") {
      const formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setState((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "expire") {
      const formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2").trim();
      setState((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };



  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/card/all");
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const createCard = async (e) => {
 e.preventDefault();
 

    try {
      const response = await axios.post("http://localhost:8000/api/v1/card/add", state);
      setCards((prevCards) => [...prevCards, response.data]);
      setState({
        card: "",
        name: "",
        expire: "",
        cvc: "",
        focus: "",
      });
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  console.log(cardValidation)

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/card/${id}`);
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [setCards]);

  return (
    <div className="w-full h-screen center flex flex-col gap-3 relative">
      <div>
        {" "}
        <Cards
          number={state.card}
          expiry={state.expire}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </div>
      <div className="flex   rounded-lg shrink-0 bg-white">
        <div className=" h-full flex flex-col  justify-evenly p-3 me-3">
          <form onSubmit={createCard}>
            <div className="mb-3">
              <input
                type="text"
                name="card"
                className="form-control"
                placeholder="Card Number"
                value={state.card}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="19" // Set maximum length to ensure only 16 digits and spaces
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <input
                  type="text"
                  name="expire"
                  className="form-control"
                  placeholder="Expiry Date"
                  pattern="\d\d/\d\d"
                  value={state.expire}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength="5"
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <input
                  type="number"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength="4"
                  required
                />
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute top-10 right-10 h-[80%] flex flex-col  bg-white w-72 rounded-lg overflow-hidden">
        <div className="head bg-blue-400 text-white text-3xl text-center py-3 ">
          All Cards
        </div>
        <ul>
          {cards?.length > 0 ? (
            cards?.map((card) => (
              <li className="  border-b-2 border-black relative" key={card?._id}>
                <Link to={`/card/${card?._id}`}>
                  <div className="name text-xl my-2 ps-2">{card?.name}</div>
                </Link>
                <div className="flex justify-between px-2">
                  <div className="expire text-white">
                    <span>Expire Date</span> : {card?.expire}
                  </div>
                </div>
                <span
                  className="center z-10 bg-black text-white  w-8 h-8 absolute cursor-pointer hover:bg-red-500 rounded-s-full right-0 top-0"
                  onClick={() => deleteCard(card?._id)}
                >
                  <i className=" fa-solid fa-xmark"></i>
                </span>
              </li>
            ))
          ) : (
            <li>There are no cards</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
