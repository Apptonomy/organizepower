import React, { useState } from 'react';
import axios from 'axios';
import AddPolitician from './AddPolitician.jsx';
import AddCharity from './addCharity.jsx';
import StatesSelect from './StatesSelect.jsx';
import { getMovementsLeading, getMovementsFollowing } from '../services/services';

// child of Movement
const EditMovement = ({
  setEdit, // sets Edit state of Movement
  user,
  setMovementsLeading,
  currentMovement,
}) => {
  const oldCity = currentMovement.location.split(',')[0];
  const oldState = currentMovement.location.split(',')[1].substring(1);

  const [name, setName] = useState(currentMovement.name);
  const [desc, setDesc] = useState(currentMovement.description);
  const [city, setCity] = useState(oldCity);
  const [state, setState] = useState(oldState);
  const [imageUrl, setImageUrl] = useState(currentMovement.imageUrl);
  const [charName, setCharName] = useState(currentMovement.charName);
  const [charUrl, setCharUrl] = useState(currentMovement.charUrl);
  const [charImageUrl, setCharImageUrl] = useState(currentMovement.charImageUrl);
  const [charDescription, setCharDescription] = useState(currentMovement.charDescription);
  const [charTagline, setCharTagline] = useState(currentMovement.charTagline);
  const [polFirstName, setPolFirstName] = useState(currentMovement.polFirstName);
  const [polLastName, setPolLastName] = useState(currentMovement.polLastName);
  const [polPhoneNumber, setPolPhoneNumber] = useState(currentMovement.polPhoneNumber);
  const [polEmail, setPolEmail] = useState(currentMovement.polEmail);
  const [polOrg, setPolOrg] = useState('');                       // **********************check this out
  const [polPosition, setPolPosition] = useState(currentMovement.polPosition);
  const [polImageUrl, setPolImageUrl] = useState(currentMovement.polImageUrl);
  const [addPolClicked, setAddPolClicked] = useState(false);
  const [addCharClicked, setAddCharClicked] = useState(false);

  const editMovement = (event) => {
    event.preventDefault();
    const movementObj = {
      id: currentMovement.id,
      name,
      description: desc,
      location: `${city}, ${state}`,
      emailCount: currentMovement.emailCount,
      /// currentMovement does not currently have this. we could make it have it
      textCount: 0,
      followers: currentMovement.followers,
      polFirstName,
      polLastName,
      polPhoneNumber,
      polEmail,
      polOrg,
      polPosition,
      polImageUrl,
      imageUrl,
      charName,
      charUrl,
      charImageUrl,
      charDescription,
      charTagline,
    };
    axios.put('/movement', { movementObj })
      .then(() => {
        setEdit(false);
        // if we enable persistent login, we should reload instead of changing setEdit
        // window.location.reload(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form id="start-movement" className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Movement name
            </label>
            <input onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={name} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Description
            </label>
            <textarea onChange={(e) => setDesc(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={desc} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Image
            </label>
            <input onChange={(e) => setImageUrl(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={imageUrl} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              City
            </label>
            <input onChange={(e) => setCity(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" value={city} />
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
      <button onClick={() => setAddPolClicked(!addPolClicked)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">Change politician</button>
      <button onClick={() => setAddCharClicked(!addCharClicked)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded shadow mr-4">Change charity</button>
      <div className="mt-4 mb-4">
        {addPolClicked && (
          <AddPolitician
            setPolFirstName={setPolFirstName}
            setPolLastName={setPolLastName}
            setPolPhoneNumber={setPolPhoneNumber}
            setPolEmail={setPolEmail}
            setPolOrg={setPolOrg}
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
        <button onClick={editMovement} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">Update</button>
      </div>
    </div>
  );
};
export default EditMovement;
