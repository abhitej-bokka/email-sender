import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EmailTemplateEditor.css';

const EmailTemplateEditor = () => {
  const [emailSubject, setEmailSubject] = useState('Rutgers Student Interested in {company_name} Opportunity');
  const [emailBody, setEmailBody] = useState(`
    <html>
    <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Roboto', sans-serif; font-size: 11pt; color: #000000;">
        <p>Hi {first_name},</p>

        <p>
            My name is Abhitej, and I studied Computer Science & Data Science at Rutgers University.
            I was on LinkedIn, came across this {company_name} job: <a href="{link}">{link}</a> and was super interested in this opportunity.
            I reached out by email because I feel my skills & interests align heavily and this is an opportunity I don't want to pass up on.
        </p>
        <p>Can you put me in touch with a recruiter for this position to get an opportunity to interview?</p>
        <p>I'd love to be considered and am a great fit for 3 reasons:</p>
        <ul>
            <li>
                I'm currently working at Chewy as a Data Engineering Intern! I'm implementing a large language model with AWS Bedrock to analyze SQL statements and capturing data lineage across Snowflake & Vertica databases through Apache Airflow.
            </li>
            <li>
                I worked at Yahoo last summer as a DevSecOps Intern on their cybersecurity team. I created Slack Automations with Python & AWS and debugged software that helped manage EKS clusters.
            </li>
            <li>
                I've worked at ADP as a Software Engineer Intern on their insurance team. I used Java and Oracle SQL to optimize legacy APIs and Angular to create client summary dashboards.
            </li>
        </ul>

        <p>I channel my passion in computer science through hackathons and have won a couple Major League Hacking prizes with my projects: 
        <br><a href="https://devpost.com/software/schwordle">https://devpost.com/software/schwordle</a> & <a href="https://devpost.com/software/the-power-of-asking">https://devpost.com/software/the-power-of-asking</a> </p>

        <p>If there's a formal referral process, the job ID is: {job_id}, which would be super helpful.</p>
        <p>Please check out my website to learn more about me; it won't disappoint: <a href="http://abhitej-bokka.github.io/">http://abhitej-bokka.github.io/</a></p>
        <p>I attached my resume below and look forward to hearing from you!</p>
        <p>Thank you,</p>
        <p>Abhitej Bokka</p>
    </body>
    </html>
  `);

  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem('emailSubject', emailSubject);
    localStorage.setItem('emailBody', emailBody);
    navigate('/send-emails');
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  useEffect(() => {
    const savedSubject = localStorage.getItem('emailSubject');
    const savedBody = localStorage.getItem('emailBody');
    if (savedSubject) setEmailSubject(savedSubject);
    if (savedBody) setEmailBody(savedBody);
  }, []);

  return (
    <div className="App">
      <div className="container">
      <div className="header-container">
          <p className="header gradient-text">Ask by Abhi</p>
          <p className="sub-text">
            Bee unique. Bee beautiful. Bee curious.
          </p>
        </div>


            <div className="form-group">
              <h3>Email Subject:</h3>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <h3>Email Body:</h3>
              <textarea
                rows="20"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleSave} className="cta-button cta-button-gradient">
              Save Template
            </button>


        <div className="email-preview-container">
          <h2>Email Preview</h2>
          <div className="email-preview" dangerouslySetInnerHTML={createMarkup(emailBody)} />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
