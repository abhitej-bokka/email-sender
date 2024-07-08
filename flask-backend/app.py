import os
import re
import spacy
import smtplib
import unidecode
from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.header import Header

import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")

def read_file_with_encodings(file_path, encodings=['utf-8', 'latin-1', 'iso-8859-1']):
    for encoding in encodings:
        try:
            with open(file_path, "r", encoding=encoding) as file:
                return file.read()
        except UnicodeDecodeError:
            continue
    raise UnicodeDecodeError(f"Unable to decode file {file_path} with provided encodings.")

def apply_model(input_file):
    text = read_file_with_encodings(input_file)

    dir_name = os.path.dirname(input_file)
    base_name = os.path.basename(input_file)
    output_file = os.path.join(dir_name, f"Names_{base_name}")

    doc = nlp(text)
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    unique_names = list(set(names))

    with open(output_file, 'w') as file:
        for name in unique_names:
            file.write(name + "\n")

def clean_names(input_file, output_file):
    with open(input_file, "r") as file:
        names = file.readlines()

    cleaned_names = set()
    for name in names:
        cleaned_name = re.sub(r'\b(3rd|2nd|1st)\b', '', name).strip()
        cleaned_name = re.sub(r'View.*', '', cleaned_name).strip()
        cleaned_name = re.sub(r'[^\w\s-]', '', cleaned_name).strip()
        name_parts = cleaned_name.split()

        if len(name_parts) == 1:
            continue

        if len(name_parts) == 3:
            cleaned_name = name_parts[0] + ' ' + name_parts[2]

        if cleaned_name:
            cleaned_names.add(cleaned_name)

    final_names = set()
    for name in cleaned_names:
        if name.endswith('s') and name[:-1] in cleaned_names:
            continue
        final_names.add(name)

    with open(output_file, "w") as file:
        for name in sorted(final_names):
            file.write(name + "\n")

def name_collection(company_file):
    name_file = os.path.join(os.path.dirname(company_file), f"Names_{os.path.basename(company_file)}")
    apply_model(company_file)
    clean_names(name_file, name_file)
    print("Names have been finalized and saved to Names.txt.")
    for i in range(2):
        apply_model(name_file)
        clean_names(name_file, name_file)
        print(f"Applied model & cleaned names - Iteration: {i+1}")

def clean_text(text):
    # Convert to Unicode if it's not already
    if not isinstance(text, str):
        text = text.decode('utf-8', errors='ignore')
    # Remove non-breaking spaces and other problematic characters
    text = text.replace(u'\xa0', ' ').replace(u'\u200b', '')
    # Convert to ASCII
    return unidecode.unidecode(text)

def clean_email(email):
    # Remove any whitespace and convert to lowercase
    email = email.strip().lower()
    # Remove any non-alphanumeric characters except for @ and .
    email = re.sub(r'[^a-z0-9@.]', '', email)
    return email

def email_generation(names_file, email_format):
    base_name = os.path.basename(names_file)
    company_name = base_name.split('_')[1].split('.')[0]
    output_file = os.path.join(os.path.dirname(names_file), f"Emails_{company_name}.txt")

    with open(names_file, 'r') as file, open(output_file, 'w') as outfile:
        for line in file:
            name_parts = line.strip().split(' ')
            if len(name_parts) >= 2:
                first_name = name_parts[0]
                last_name = name_parts[-1]
                email = email_format.format(first=first_name, last=last_name, f=first_name[0], l=last_name[0], company=company_name).lower()
                email = clean_email(email)
                outfile.write(email + "\n")
            else:
                print(f"Skipping invalid name format: {line.strip()}")

    return output_file

def email_generation_with_names(names_file, email_format):
    base_name = os.path.basename(names_file)
    company_name = base_name.split('_')[1].split('.')[0]
    output_file = os.path.join(os.path.dirname(names_file), f"Emails_{company_name}.txt")
    names_and_emails_file = os.path.join(os.path.dirname(names_file), f"NamesAndEmails_{company_name}.txt")

    with open(names_file, 'r') as file, open(output_file, 'w') as email_outfile, open(names_and_emails_file, 'w') as names_and_emails_outfile:
        for line in file:
            name_parts = line.strip().split(' ')
            if len(name_parts) >= 2:
                first_name = name_parts[0]
                last_name = name_parts[-1]
                email = email_format.format(first=first_name, last=last_name, f=first_name[0], l=last_name[0], company=company_name).lower()
                email = clean_email(email)
                email_outfile.write(email + "\n")
                names_and_emails_outfile.write(f"{first_name} {last_name}: {email}\n")
            else:
                print(f"Skipping invalid name format: {line.strip()}")

    return output_file

def finalize_emails_list(verified_emails_file, names_and_emails_file, output_file):
    logging.info(f"Starting finalization with verified_emails_file: {verified_emails_file}, names_and_emails_file: {names_and_emails_file}")

    with open(verified_emails_file, 'r') as file:
        verified_emails_content = file.read().strip()
        logging.info(f"Verified emails content: {verified_emails_content}")
    verified_emails = set(clean_email(email) for email in verified_emails_content.split(', '))
    print('verified_emails')
    print(verified_emails)
    print('verified_emails')

    with open(names_and_emails_file, 'r') as file:
        lines = file.readlines()
        logging.info(f"Names and emails content: {lines}")

    with open(output_file, 'w') as outfile:
        print('I GOT HERE')
        for line in lines:
            name, email = line.strip().split(': ')
            email = clean_email(email)
            print('THIS IS BETTER')
            print(name)
            print(email)
            print(verified_emails)
            if email in verified_emails:
                print('YAYYA')
                print(email)
                print('hi')
                logging.info(f"Writing to output: {name}: {email}")
                outfile.write(f"{name}: {email}\n")

    logging.info(f"Finalized emails list has been saved to {output_file}.")

def send_email(to_email, subject, body, attachment_path, smtp_user, smtp_password):
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Subject'] = Header(subject, 'utf-8')

    # Clean and encode the email body
    cleaned_body = clean_text(body)
    msg.attach(MIMEText(cleaned_body, 'html', 'utf-8'))

    with open(attachment_path, 'rb') as attachment:
        part = MIMEApplication(attachment.read(), Name=os.path.basename(attachment_path))
        part['Content-Disposition'] = f'attachment; filename="{os.path.basename(attachment_path)}"'
        msg.attach(part)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, to_email, msg.as_string().encode('utf-8'))
    except Exception as e:
        logging.error(f"Failed to send email to {to_email}: {str(e)}")


def generate_personalized_email(first_name, last_name, company_name, link):
    html_template = u"""
    <html>
    <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Roboto', sans-serif; font-size: 12pt; color: #000000;">
        <p>Hi {first_name},</p>

        <p>
            My name is Abhitej, and I'm studying Computer Science & Statistics at Rutgers University.
            I was on LinkedIn, came across this {company_name} internship: <a href="{link}">{link}</a> and was super interested in this opportunity.
            I reached out by email because I feel my skills & interests align heavily and this is an opportunity I don't want to pass up on.
        </p>
        <p>Can you put me in touch with a recruiter for this position to get an opportunity to interview?</p>
        <p>I'd love to be considered and am a great fit for 3 reasons:</p>
        <ul>
            <li>
                I worked at Yahoo last summer as a DevSecOps Intern on their cybersecurity team. I created Slack Automations with Python & AWS and debugged software that helped manage EKS clusters.
            </li>
            <li>
                I've worked at ADP as a Software Engineer Intern on their insurance team. I used Java and Oracle SQL to optimize legacy APIs and Angular to create client summary dashboards.
            </li>
            <li>
                I channel my passion in computer science through the Rutgers Mobile App Development Club and participate in hackathons, winning prizes with my project Schwordle: <a href="https://devpost.com/software/schwordle">https://devpost.com/software/schwordle</a>
            </li>
        </ul>
        <p>If there's a formal referral process, the job ID is: 2024-50077, which would be super helpful.</p>
        <p>Please check out my website to learn more about me; it won't disappoint: <a href="http://abhitej-bokka.github.io/">http://abhitej-bokka.github.io/</a></p>
        <p>I attached my resume below and look forward to hearing from you!</p>
        <p>Thank you,</p>
        <p>Abhitej Bokka</p>
    </body>
    </html>
    """.format(first_name=first_name, company_name=company_name, link=link)

    return html_template

@app.route('/process-files', methods=['POST'])
def process_files():
    company_file = request.files['companyFile']
    email_format = request.form['emailFormat']

    company_file_path = os.path.join('/tmp', company_file.filename)
    company_file.save(company_file_path)

    # Process the files
    name_collection(company_file_path)
    name_file = os.path.join('/tmp', f"Names_{company_file.filename}")

    email_file_path = email_generation(name_file, email_format)
    email_generation_with_names(name_file, email_format)

    return send_file(email_file_path, as_attachment=True)


@app.route('/verify-emails', methods=['POST'])
@app.route('/verify-emails', methods=['POST'])
def verify_emails():
    verified_emails_file = request.files['verifiedEmailsFile']
    resume_file = request.files['resumeFile']
    company_name = request.form['companyName']
    email = request.form['email']
    password = request.form['password']
    email_subject = request.form['emailSubject']
    email_body_template = request.form['emailBody']

    verified_emails_file_path = os.path.join('/tmp', verified_emails_file.filename)
    verified_emails_file.save(verified_emails_file_path)

    resume_file_path = os.path.join('/tmp', resume_file.filename)
    resume_file.save(resume_file_path)

    names_and_emails_file = os.path.join('/tmp', f"NamesAndEmails_{company_name}.txt")
    output_file = os.path.join('/tmp', f"FinalizedEmailsList_{company_name}.txt")

    finalize_emails_list(verified_emails_file_path, names_and_emails_file, output_file)

    with open(output_file, 'r') as file:
        lines = file.readlines()

    for line in lines:
        name, to_email = line.strip().split(': ')
        first_name, last_name = name.split(' ')

        personalized_email = email_body_template.format(first_name=first_name, last_name=last_name, company_name=company_name)
        
        send_email(to_email, email_subject, personalized_email, resume_file_path, email, password)

    return jsonify({"message": "Verified emails have been sent."})



if __name__ == '__main__':
    app.run(debug=True)
