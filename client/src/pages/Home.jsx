import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import { Link } from "react-router-dom";
import axios from "axios"
const Home = () => {
  const [state, setState] = useState({
    card: "",
    name: "",
    expire: "",
    cvc: "",
    focus: "",
  });
  const [cards,setCards] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    console.log(state)
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/card/all');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const createCard = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/v1/card/add', state);
      setCards((prevCards) => [...prevCards, response.data]);
      setState({
        name: '',
        card: ' ',
        expire: ' ',
        cvv: ' ',
      });
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`/api/cards/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []); 

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
                type="number"
                name="card"
                className="form-control"
                placeholder="Card Number"
                value={state.card}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
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
                  type="number"
                  name="expire"
                  className="form-control"
                  placeholder="Expiry Date"
                  pattern="\d\d/\d\d"
                  value={state.expire}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <input
                  type="number"
                  name="cvc"
                  className="form-control"
                  placeholder="cvc"
                  pattern="\d{3,4}"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute top-10 right-10 h-[80%] flex flex-col  bg-white w-72 rounded-lg overflow-hidden">
        <div className="head bg-blue-400 text-white text-3xl text-center py-3 ">
          All Cards
        </div>
        <ul>
         {cards?.length > 0 ?
         ( cards?.map(card => (
            <Link to={`/card/${card?._id}`} key={card?._id}>
            <li className="bg-blue-100 px-3 border-b-2 border-black">
              <div className="name text-xl my-2">{card?.name}</div>
              <div className="flex justify-between">
                <div className="valid text-gray-400">
                  <span>Valid Date</span>{card?.valid}
                </div>
                <div className="expire text-gray-400">
                  <span>Expire Date</span>{card?.expire}
                </div>
              </div>
            </li>
          </Link>
          ))):(
            <li>there no cards</li>
          )
         }
        </ul>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div className="my-1 w-full">
//         <div className="pb-3 md:pb-0 flex flex-col w-full">
//           <label htmlFor="name" className="input-label text-base mb-2">
//             Owner Name
//           </label>
//           <div>
//             <label className="input-field inline-flex items-baseline border-none shadow-md bg-white p-4 w-full">
//               <div className="flex-1 leading-none">
//                 <input
//                   id="handle"
//                   type="text"
//                   className="placeholder-blue outline-none w-full p-0  text-dusty-blue-darker"
//                   name="handle"
//                   placeholder="Owner Name"
//                 />
//               </div> 
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="my-1">
//         <div className="pb-3 md:pb-0 flex flex-col w-full">
//           <label
//             htmlFor="card"
//             className="input-label text-base mb-2 w-full"
//           >
//             Card Number
//           </label>
//           <div>
//             <label className="input-field inline-flex items-baseline border-none shadow-md bg-white p-4 w-full">
//               <div className="flex-1 leading-none">
//                 <input
//                   id="card"
//                   type="number"
//                   className="placeholder-blue outline-none w-full p-0  text-dusty-blue-darker"
//                   name="handle"
//                   placeholder="XXXX  XXXX  XXXX  XXXX"
//                 />
//               </div>
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between w-full">
//         <div className="my-1 w-1/3">
//           <div className="pb-3 md:pb-0 flex flex-col">
//             <label htmlFor="valid" className="input-label text-base mb-2">
//               Valid Date
//             </label>
//             <div>
//               <label className="input-field inline-flex items-baseline border-none shadow-md bg-white p-4">
//                 <div className="flex-1 leading-none">
//                   <input
//                     id="valid"
//                     type="number"
//                     className="placeholder-blue outline-none w-full p-0  text-dusty-blue-darker"
//                     name="handle"
//                     placeholder="--/--"
//                   />
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="my-1 w-1/3">
//           <div className="pb-3 md:pb-0 flex flex-col">
//             <label htmlFor="expire" className="input-label text-base mb-2">
//               Expire Date
//             </label>
//             <div>
//               <label className="input-field inline-flex items-baseline border-none shadow-md bg-white p-4">
//                 <div className="flex-1 leading-none">
//                   <input
//                     id="expire"
//                     type="number"
//                     className="placeholder-blue outline-none w-full p-0  text-dusty-blue-darker"
//                     name="handle"
//                     placeholder="--/--"
//                   />
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>{" "}
//         <div className="my-1 w-1/3">
//           <div className="pb-3 md:pb-0 flex flex-col">
//             <label htmlFor="cvc" className="input-label text-base mb-2">
//               CVc
//             </label>
//             <div>
//               <label className="input-field inline-flex items-baseline border-none shadow-md bg-white p-4">
//                 <div className="flex-1 leading-none">
//                   <input
//                     id="cvc"
//                     type="number"
//                     className="appearance-none placeholder-blue outline-none w-full p-0  text-dusty-blue-darker"
//                     name="handle"
//                     placeholder="***"
//                   />
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div> */
}
