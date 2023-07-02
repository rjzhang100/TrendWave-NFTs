## API

This is the Python API for Trendwave NFTs. It contains the backend logic of retrieving trending topics from Google Trends API as well as generating the images.

Please run 
```
pip install -r requirements.txt
```
to install required packages. Also, run 
```
python3 -m spacy download en_core_web_sm 
```
to install the required [spaCy](https://spacy.io/models) model for natural language processing. To run the API, use
```
uvicorn main:app --reload
```
from `api/` or run 
```
npm run api
```
from the root directory.