import {configureStore} from '@reduxjs/toolkit';
import Note from '../features/Notes';
import Auth from '../features/Auth';
export const store = configureStore({
    reducer:{
        Notes : Note,
        Auth: Auth
    }
})