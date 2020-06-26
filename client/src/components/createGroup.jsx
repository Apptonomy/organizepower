import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import StatesSelect from './StatesSelect.jsx';
// import { signup } from '../services/services';

const createGroup = ({ setIsNewGroup }) => {
  const [name, setGroupName] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImage] = useState('');
  const [bio, setBio] = useState('');
}