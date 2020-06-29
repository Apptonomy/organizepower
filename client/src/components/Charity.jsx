import React, { useEffect } from 'react';
// child of Movement, shows charity details
// also a child of addCharity

// these setChar.. functions set the state of startMovement, this component's grandparent
const Charity = ({
  page,
  charity,
  setCharName,
  setCharUrl,
  setCharImageUrl,
  setCharDescription,
  setCharTagline,
  index,
}) => {
  const { charDescription, charImageUrl, charName, charUrl, charTagline, currentRating } = charity;
  // give each charity a unique id based off its index
  const uniqueId = `charity${index}`;

  // uses this charity's info to set the state of addCharity, so it can create the movement
  const setCharState = () => {
    setCharName(charName);
    setCharUrl(charUrl);
    setCharImageUrl(charImageUrl);
    setCharDescription(charDescription);
    setCharTagline(charTagline);
  };

  // removes the border from every other charity, then turns on the border of the selected charity
  const toggleBorder = () => {
    const element = document.getElementById(uniqueId);
    const charities = document.querySelectorAll('.charity');
    charities.forEach((c) => {
      c.classList.remove('border-4');
    });
    element.classList.toggle('border-4');
  };

  // if this component renders from the addCharity page, we don't want it to have hover attributes
  useEffect(() => {
    if (page !== 'addCharity') {
      const charityChild = document.getElementById('charityChild');
      charityChild.classList.remove('hover:bg-gray-100');
      charityChild.classList.remove('hover:border-black');
    }
  });

  return (
    <div id={uniqueId} onClick={() => { toggleBorder(); setCharState(); }} className="charity max-w-sm h-full rounded overflow-hidden shadow-lg m-8 float-left border-mist">
      <div id="charityChild" className="border-r border-b border-l border-gray-400 hover:border-black hover:bg-gray-100 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        {page === 'movement' && (
          <h5 id="associatedCharity" className="text-3xl text-center">Associated charity</h5>
        )}
        <div className="mb-3">
          <span className="text-gray-900 font-bold text-xl mb-2 mr-4">
            <img className="w-full" src={charImageUrl} alt="" />
            <p className="text-center text-black text-xl font-bold my-2 mb-3">
              {charName}
            </p>
            {/* <p className="text-gray-700 text-base my-2">
              {currentRating}
            </p> */}
            <p className="text-lg my-2 text-center">
              {charTagline}
            </p>
            <p className="text-sm my-2">
              {charDescription}
            </p>
            <p className="text-base mt-4">
              <a className="hover:text-blue-400" href={`//${charUrl}`}>{charUrl}</a>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Charity;
