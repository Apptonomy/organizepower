/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import AddPolitician from './AddPolitician.jsx';
import AddCharity from './addCharity.jsx';
import StatesSelect from './StatesSelect.jsx';
import { getMovementsLeading, getMovementsFollowing } from '../services/services';
// import StatesSelect from './StatesSelect.jsx';

const StartMovement = ({ user, setStartMovementClicked, setMovementsLeading }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [imageUrl, setImageUrl] = useState('');
  const [charName, setCharName] = useState('');
  const [charUrl, setCharUrl] = useState('');
  const [charImageUrl, setCharImageUrl] = useState('');
  const [charDescription, setCharDescription] = useState('');
  const [charTagline, setCharTagline] = useState('');
  const [polFirstName, setPolFirstName] = useState('');
  const [polLastName, setPolLastName] = useState('');
  const [polPhoneNumber, setPolPhoneNumber] = useState('');
  const [polEmail, setPolEmail] = useState('');
  // const [polOrg, setPolOrg] = useState('');
  const [polPosition, setPolPosition] = useState('');
  const [polImageUrl, setPolImageUrl] = useState('');
  const [addPolClicked, setAddPolClicked] = useState(false);
  const [addCharClicked, setAddCharClicked] = useState(false);

  // this master submit function will accept basic, politician, and charity info and create a movement
  const saveMovement = (event) => {
    event.preventDefault();
    const { id } = user;
    const movementObj = {
      name,
      description: desc,
      location: `${city}, ${state}`,
      emailCount: 0,
      textCount: 0,
      followers: 0,
      polFirstName,
      polLastName,
      polPhoneNumber,
      polEmail,
      // polOrg,
      polPosition,
      polImageUrl,
      imageUrl,
      charName,
      charUrl,
      charImageUrl,
      charDescription,
      charTagline,
    };
    axios.post('/movement', { movementObj, id })
      .then((movement) => {
        document.getElementById('start-movement').reset();
        setStartMovementClicked(false);
        getMovementsLeading(user.id)
          .then(results => {
            setMovementsLeading(results.data);
          })
          .catch(err => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form id="start-movement" className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Name Your Movement
            </label>
            <input onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="An Important Cause" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Description
            </label>
            <textarea onChange={(e) => setDesc(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Goals? Demands?" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Add an image for this Movement
            </label>
            <input onChange={(e) => setImageUrl(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Image URL" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              City
            </label>
            <input onChange={(e) => setCity(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Montgomery" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              State
            </label>
            <div className="relative">
              <StatesSelect setState={setState} />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button onClick={() => setAddPolClicked(!addPolClicked)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">Add a Politician to Your Movement</button>
      <button onClick={() => setAddCharClicked(!addCharClicked)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded shadow mr-4">Add a Charity to Your Movement</button>
      <div className="mt-4 mb-4">
        {addPolClicked && (
          <AddPolitician
            setPolFirstName={setPolFirstName}
            setPolLastName={setPolLastName}
            setPolPhoneNumber={setPolPhoneNumber}
            setPolEmail={setPolEmail}
            // setPolOrg={setPolOrg}
            setPolPosition={setPolPosition}
            setPolImageUrl={setPolImageUrl}
          />
        )}
        {addCharClicked && (
          <AddCharity
            setCharName={setCharName}
            setCharUrl={setCharUrl}
            setCharImageUrl={setCharImageUrl}
            setCharDescription={setCharDescription}
            setCharTagline={setCharTagline}
          />
        )}
        <button onClick={saveMovement} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">Create!</button>
      </div>
    </div>
  );
};
export default StartMovement;
