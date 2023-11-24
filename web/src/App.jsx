import { useState } from 'react';

import { links } from './constants/links.js';
import Chat from './components/Chat.jsx';
import Navigation from './components/Navigation.jsx';
import Settings from './components/Settings.jsx';
import Users from './components/Users.jsx';
import Soon from './components/Soon.jsx';

export default function App() {
  const [selectedLink, setSelectedLink] = useState(links[0].name);

  const getComponent = (name) => {
    switch (name) {
      case 'chat':
        return <Chat />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Soon />;
    }
  }

  return (
    <main className="App">
      <Navigation links={links} active={selectedLink} handle={setSelectedLink}/>
      {getComponent(selectedLink)}
    </main>
  )
}