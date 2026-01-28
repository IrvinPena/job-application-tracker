from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Job Application Traker API is running"}
    