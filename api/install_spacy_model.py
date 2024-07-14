import subprocess

def download_spacy_model():
    subprocess.run(["python3", "-m", "spacy", "download", "en_core_web_sm"])

if __name__ == "__main__":
    download_spacy_model()
