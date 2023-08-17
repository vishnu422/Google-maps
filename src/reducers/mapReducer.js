const initialState = {
    searchQuery: '',
    searchResults: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_QUERY':
        return { ...state, searchQuery: action.payload };
      case 'SET_SEARCH_RESULTS':
        return { ...state, searchResults: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;