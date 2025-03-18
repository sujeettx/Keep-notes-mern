import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import FolderTabs from './components/FolderTabs/FolderTabs';
import FolderCard from './components/FolderCard/FolderCard';
import NoteCard from './components/NoteCard/NoteCard';
import NewItemCard from './components/NewItemCard/NewItemCard';
import './App.css';

// Create a theme with the colors used in the design
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

// Sample data
const folders = [
  { id: 1, title: 'Movie Review', date: '12/10/2021', color: '#e3f2fd' },
  { id: 2, title: 'Class Notes', date: '12/10/2021', color: '#ffebee' },
  { id: 3, title: 'Book Lists', date: '12/10/2021', color: '#fffde7' },
];

const notes = [
  { 
    id: 1, 
    title: 'Mid test exam', 
    date: '12/10/2021', 
    time: '10:30 PM, Monday',
    content: 'Ultrices viverra odio congue felis, libero egestas nunc sagi are massa, elit ornare eget sem velit in ulum.',
    color: '#fff9c4'
  },
  { 
    id: 2, 
    title: 'Mid test exam', 
    date: '12/10/2021', 
    time: '10:30 PM, Monday',
    content: 'Ultrices viverra odio congue felis, libero egestas nunc sagi are massa, elit ornare eget sem velit in ulum.',
    color: '#ffcdd2'
  },
  { 
    id: 3, 
    title: 'Jonas\'s notes', 
    date: '12/10/2021', 
    time: '08:30 PM, Sunday',
    content: 'Rokty viverra odio congue felis, libero egestas nunc sagi are massa, elit ornare eget sem velit in ulum.',
    color: '#bbdefb'
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <Sidebar />
        <Box className="content-area">
          <Header username="Sayef mahmud" />
          
          <Box className="main-content">
            <Box className="section">
              <Box className="section-header">
                <h2>Recent Folders</h2>
              </Box>
              <FolderTabs activeTab="This Week" />
              <Box className="folder-cards">
                {folders.map(folder => (
                  <FolderCard 
                    key={folder.id} 
                    title={folder.title} 
                    date={folder.date} 
                    color={folder.color} 
                  />
                ))}
                <NewItemCard type="folder" />
              </Box>
            </Box>
            
            <Box className="section">
              <Box className="section-header">
                <h2>My Notes</h2>
                <Box className="month-navigation">
                  <span>December 2021</span>
                </Box>
              </Box>
              <FolderTabs activeTab="Todays" />
              <Box className="note-cards">
                {notes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    title={note.title} 
                    content={note.content} 
                    date={note.date} 
                    time={note.time} 
                    color={note.color} 
                  />
                ))}
                <NewItemCard type="note" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;