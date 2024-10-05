import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
	pastes: localStorage.getItem('pastes')
		? JSON.parse(localStorage.getItem('pastes'))
		: [],
};

export const pasteSlice = createSlice({
	name: 'paste',
	initialState,
	reducers: {
		addToPastes: (state, action) => {
			const paste = action.payload;
			const index = state.pastes.findIndex(item => item._id === paste._id);
			if (index >= 0) {
				// If the course is already in the Pastes , do not modify the quantity
				toast.error('Please already exist');
			}

			// If the course is not in the Pastes,  add it to Pastes
			state.pastes.push(paste);

			// Update to localStorage

			localStorage.setItem('pastes', JSON.stringify(state.pastes));
			// show toast
			toast.success('Paste Added');
		},
		updateToPastes: (state, action) => {
			const paste = action.payload;
			const index = state.pastes.findIndex(item => item._id === paste._id);
			if (index >= 0) {
				// If the course is found in the Pastes, update it
				state.pastes[index] = paste;
				// Update to localStorage
				localStorage.setItem('pastes', JSON.stringify(state.pastes));
				// show toast
				toast.success('Paste updated');
			}
		},
		resetPaste: state => {
			state.pastes = [];
			// Update to local Storage
			localStorage.removeItem('pastes');
		},
		removeFromPastes: (state, action) => {
			const pasteId = action.payload;

			console.log(pasteId);
			const index = state.pastes.findIndex(item => item._id === pasteId);
			if (index >= 0) {
				//  If the course is found in the Pastes, remove it
				state.pastes.splice(index, 1);
				// Update to localStorage
				localStorage.setItem('pastes', JSON.stringify(state.pastes));
				// show toast
				toast.success('Paste deleted');
			}
		},
	},
});

export const { addToPastes, updateToPastes, resetPaste, removeFromPastes } =
	pasteSlice.actions;
export default pasteSlice.reducer;
