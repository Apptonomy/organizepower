import React, { useState } from 'react';
import axios from 'axios';
// addCharity receives its setChar... functions from StartMovement; they will update addChar's state
const AddCharity = ({
  setCharName,
  setCharUrl,
  setCharImageUrl,
  setCharDescription,
}) => {
  const [search, setSearch] = useState('');
  const [create, setCreate] = useState(true);
  const [charities, setCharities] = useState([]);

  const findCharities = () => {
    let tempCharities = [];
    if (search) {
      axios.get('/charity', {
        // ***** to do: allow advancded searching with more params ****
        params: {
          search,
        },
      })
        .then((response) => {
          const { data } = response;
          const promises = data.map((charity) => {
            return axios.get('/charity/details', {
              params: { ein: charity.ein },
            });
          });
          return Promise.all(promises);
        })
        .then((response) => {
          response.forEach((obj) => {
            const { charityName, currentRating, mission, websiteURL, tagLine } = obj.data;
            tempCharities.push({
              charityName,
              currentRating,
              mission,
              websiteURL,
              tagLine,
            });
          });
          setCharities(tempCharities);
        });
    }
  };

  return (
    <div className="pt-5">
      {/* button asking if you want to create your own; changes create */}
      <button onClick={() => setCreate(!create)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4">Search for a charity to link / Add your own</button>
      {/* only shows if you are creating your own */}
      {create && (

        <form id="add-charity" className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 pt-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Charity&apos;s Name
              </label>
              <input onChange={(e) => setCharName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Make a Wish Foundation" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Link to the charity&apos;s website
              </label>
              <input onChange={(e) => setCharUrl(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="www.worldwish.org" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Add an image for this charity
              </label>
              <input onChange={(e) => setCharImageUrl(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Image Url" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Add a description of this charity
              </label>
              <textarea onChange={(e) => setCharDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Together, we create life-changing wishes for children with critical illnesses." rows="3" />
            </div>
          </div>
        </form>
      )}
      {!create && (
        // have a searchbar that sets search state
        <div flex flex-col>
          <div className="search-box mx-auto my-auto w-full sm:w-full md:w-full lg:w-full xl:w-full">
            <form className="flex flex-row w-full">
              <span className="py-3 pr-3 sm:w-auto md:w-auto lg:w-1/2 xl:w-1/2">
                <input onChange={(e) => setSearch(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Search for charities by keyword" />
              </span>
              <span className="py-2 px-4">
                <button onClick={findCharities} className="bg-white hover:bg-gray-100 text-gray-800 text-center font-semibold py-3 px-4 border border-gray-400 rounded shadow mr-4">
                  Search
                </button>
              </span>
            </form>
          </div>
        </div>
        
        // on search, send request to find the charities
        // then, for each, send request to get details on that specific charity
        // use those results to create divs with pictures and descriptions
        // when clicking on that picture, outline it and set Char properties using that div
      )}
    </div>
  );
};

export default AddCharity;
