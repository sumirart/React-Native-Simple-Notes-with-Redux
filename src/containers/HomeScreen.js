import { connect } from 'react-redux';

// IMPORT COMPONENT AND ACTIONS
import Note from '../components/Note';
import { toggleGrid } from '../actions'
import { removeNotes } from '../actions'

const mapStateToProps = state => ({
    notes: state.notes,
    isGrid: state.isGrid
})

const mapDispatchToProps = dispatch => ({
    toggleGrid: () => dispatch(toggleGrid()),
    removeNotes: note => dispatch(removeNotes(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note);