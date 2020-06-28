import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import StatesSelect from './StatesSelect.jsx';
import { createGroup } from '../services/services';

/**
 * @param {boolean} setIsNewGroup - sets the state of isNewUser on navbar to conditionally render
 * a welcome message on login page after a successful signup
 */
const CreateGroup = ({ setIsNewGroup }) => {
  // states managed for form submission
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImage] = useState('');
  const [bio, setBio] = useState('');

  // state managed to handle redirects after form submission
  const [authStatus, setAuthStatus] = useState('');

  const handleCreateGroup = event => {
    event.preventDefault();
    // create user based on state of form
    const location = `${city}, ${state}`;
    const group = {
      name,
      password,
      location,
      email,
      phoneNumber,
      imageUrl,
      bio,
    };
    // post user to signup route, wait for message to return
    // invalidUser message implies user already exists
    // newUser message implies user has added to database successfully
    createGroup(group)
      .then(({ data: { message } }) => {
        if (message === 'invalidUser') {
          setGroupName(''); // clear  username and password, but leave other form elements intact
          setPassword('');
        } else if (message === 'newUser') {
          setIsNewUser(true);
        }
        setAuthStatus(message);
      })
      .catch(err => console.error(err));
    console.log(group, 'inside createGroup');
  };


  return (
    <div className="m-8">
      <form className="w-full max-w-lg" id="signup">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-username">
              Group Name
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" placeholder="Username" />
            {authStatus === 'invalidUser' && <p className="italic text-xs text-red-500">Sorry that username is already taken.</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Password
            </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="**********" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email-address">
              Email Address
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email-address" type="text" placeholder="Email" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone-number">
              Phone Number
            </label>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone-number" type="text" placeholder="(555) 504-1234" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4" htmlFor="grid-image-url">
              Add a picture for your Group!
            </label>
            <input onChange={(e) => setImage(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-image-url" type="text" placeholder="Image URL" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              City
            </label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Birmingham" />
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
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-bio">
              Bio
            </label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-bio" type="text" placeholder="Provide a brief description about your group..." />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-bio">
              Bio
            </label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-bio" type="text" placeholder="Provide a brief description about your group..." />
          </div>
        </div>
        <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={() => toggleAdmin()}>Are you an admin?</button>
      
        <input className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2 float-right" type="submit" value="Create Group" onClick={handleCreateGroup} />
      </form>
      {/* invalidUser response will redirect to same page and conditionally render a message about
      user already taken */}
      {authStatus === 'invalidUser' && <Redirect to="/signup" />}
      {authStatus === 'newUser' && <Redirect to="/login" />}
    </div>
  );
};

export default CreateGroup;
