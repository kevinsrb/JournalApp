import { db } from '../firebase/firebase-config';

export const searchNotes = async ( uid , search) => {

    const notes = [];
    const notesSnap =  await db.collection(`${ uid }/journal/notes`)
                               .where('body', '>=', `${ search }`)
                               .get();

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    console.log(search, notes)
    
    return notes;
}



