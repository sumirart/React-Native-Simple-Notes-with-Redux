import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, TOGGLE_GRID } from '../../../constants/actionTypes';

export const addNotes = notes => ({ type: ADD_NOTE, payload: notes })
export const editNotes = notes => ({ type: EDIT_NOTE, payload: notes })
export const removeNotes = notes => ({ type: REMOVE_NOTE, payload: notes })
export const toggleGrid = () => ({ type: TOGGLE_GRID })