import React from 'react';
import io from 'socket.io-client';
import {API_URL} from '../../../actions/types';
import LandingIntro from '../LandingIntro';
import Login from './Login';

export default function LoginPage() {
  let socket = io.connect(API_URL);
  socket.emit('get-messages', {_id: '5ce3f36aea284d607f565d78'});
  socket.on(`/messages/5ce3f36aea284d607f565d78`, (data) => {
    console.log(data);
  });
  return (
    <div className="d-md-flex flex-row-reverse">
      <Login/>
      <LandingIntro/>
    </div>
  );
}
