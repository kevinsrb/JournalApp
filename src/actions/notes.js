import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';
import { searchNotes } from '../helpers/searchNotes';
//react-journal

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );

    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})


export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    }
}


export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});


export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );
        Swal.close();
    }
}


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {

                const uid = getState().auth.uid;
                await db.doc(`${ uid }/journal/notes/${ id }`).delete();
                dispatch( deleteNote(id) );

              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )     
            }
          })

    }
}

export const startSearchNotes = (uid, search) =>{
    return async( dispatch ) => {
        const notes = await searchNotes( uid , search);
        dispatch( setNotes( notes ) );
       

    }
}


export const searchNote = (id, note) => ({
    type: types.notesSearch,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const starCloseView = () =>{
    return async( dispatch ) => {
        dispatch(notesCloseView())
    }   
}

export const notesCloseView = () => ({
    type: types.notesCloseView
});

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
