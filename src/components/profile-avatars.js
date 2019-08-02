import React from 'react';

import avatars from '../helpers/avatars.json';
import AvatarCards from './avatar-cards';

import beholder from '../images/beholder.svg';
import bipolarbear from '../images/bipolarbear.svg';
import biteybat from '../images/biteybat.svg';
import burlybear from '../images/burlybear.svg';
import cardinal from '../images/cardinal.svg';
import chicken from '../images/chicken.svg';
import dragonhead from '../images/dragonhead.svg';
import frogglet from '../images/frogglet.svg';
import giraffey from '../images/giraffey.svg';
import goldenwhale from '../images/golden-whale.svg';
import hawkster from '../images/hawkster.svg';
import installball from '../images/installball.svg';
import meowburt from '../images/meowburt.svg';
import monkeyface from '../images/monkeyface.svg';
import mrbuddy from '../images/mrbuddy.svg';
import owlet from '../images/owlet.svg';
import pazzo from '../images/pazzo.svg';
import pelter from '../images/pelter.svg';
import piggy from '../images/piggy.svg';
import rammy from '../images/rammy.svg';
import scratchpaw from '../images/scratchpaw.svg';
import seahorse from '../images/seahorse.svg';
import sherbert from '../images/sherbert.svg';
import snailburt from '../images/snailburt.svg';
import snoot from '../images/snoot.svg';
import spiny from '../images/spiny.svg';
import troll from '../images/troll.svg';
import yeti from '../images/yeti.svg';
import zebra from '../images/zebra.svg';

class ProfileAvatars extends React.Component {
  render() {
    const avatarImages = {
      beholder,
      bipolarbear,
      biteybat,
      burlybear,
      cardinal,
      chicken,
      dragonhead,
      frogglet,
      giraffey,
      goldenwhale,
      hawkster,
      installball,
      meowburt,
      monkeyface,
      mrbuddy,
      owlet,
      pazzo,
      pelter,
      piggy,
      rammy,
      scratchpaw,
      seahorse,
      sherbert,
      snailburt,
      snoot,
      spiny,
      troll,
      yeti,
      zebra,
    };
    const writeAvatarCards = avatars.map(avatar => (
      <AvatarCards key={avatar.id} avatar={avatar} avatarImages={avatarImages} />
    ));
    return (
      <div className="ProfileAvatars mt-3">
        <div className="lead text-center"><strong>My Avatars</strong></div>
        <div className="d-flex flex-wrap">
          {writeAvatarCards}
        </div>
      </div>
    );
  }
}

export default ProfileAvatars;
