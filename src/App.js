import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AutocompleteComponent from './components/AutoCompleteComponent';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AutocompleteComponent />
      </div>
    </Provider>
  );
};

export default App;
