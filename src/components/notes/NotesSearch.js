import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  startLoadingNotes, startSearchNotes } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

export const NotesSearch = () => {

    const dispatch = useDispatch()
    const { uid } = useSelector( state => state.auth );

    const [ formValues, handleInputChange ] = useForm();

    const { search } = formValues;

    const handleSearchDocument = async () => {     
        dispatch(startSearchNotes(uid, search))
    }   

    useEffect(() => {
        if(search?.length === 0){
            dispatch(startLoadingNotes(uid))
        }
    }, [dispatch, search, uid])

    return (
        <div className="note__search">
            <input type="text" onChange={handleInputChange} name="search" autoComplete="off"/>
            <button className="btn btn-primary" onClick={handleSearchDocument}>Search</button>
        </div>
    )
}
