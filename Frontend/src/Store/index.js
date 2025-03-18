import {configureStore} from '@reduxjs/toolkit';
import Note from '../features/Notes'
export const store = configureStore({
    reducer:{
        Notes : Note
    }
})