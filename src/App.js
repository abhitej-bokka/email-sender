import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenerateEmails from './GenerateEmails';
import EmailTemplateEditor from './EmailTemplateEditor';
import VerifyEmails from './VerifyEmails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenerateEmails />} />
        <Route path="/edit-template" element={<EmailTemplateEditor />} />
        <Route path="/verify-emails" element={<VerifyEmails />} />
      </Routes>
    </Router>
  );
}

export default App;
