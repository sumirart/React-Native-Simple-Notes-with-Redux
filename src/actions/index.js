import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, TOGGLE_GRID } from '../constants/actionTypes';

export const addNotes = note => ({ type: ADD_NOTE, payload: note })
export const editNotes = note => ({ type: EDIT_NOTE, payload: note })
export const removeNotes = note => ({ type: REMOVE_NOTE, payload: note })
export const toggleGrid = () => ({ type: TOGGLE_GRID })