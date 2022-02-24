import React, { createContext, useContext, useReducer } from 'react';

export const GlobalContext = createContext();

const initialState = {
	posts: null,
};

const reducer = (state, action) => {
	if (action) {
		switch (action.action) {
			case 'updatePosts':
				return {
					...state,
					posts: action.data,
				};
			default:
				return state;
		}
	}
	return state;
};

export const GlobalProvider = (props) => {
	let state = initialState;

	return (
		<GlobalContext.Provider value={useReducer(reducer, state)}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export const useStateValue = () => useContext(GlobalContext);

export const UidContext = createContext();
export const adminContext = createContext();
