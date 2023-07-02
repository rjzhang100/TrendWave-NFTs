from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from diffusers import DiffusionPipeline
from io import BytesIO
import base64
from pytrends.request import TrendReq
import spacy

app = FastAPI()

MODEL = "runwayml/stable-diffusion-v1-5"
PROXIES = ['https://34.203.233.13:80']
NUM_ENTITIES = 10

origins = [
    "http://localhost:1234", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# pytrends = TrendReq(
# 	hl='en-US', 
# 	tz=360, 
# 	timeout=(10,25), 
# 	proxies=PROXIES, 
# 	retries=2, 
# 	backoff_factor=0.1, 
# 	requests_args={'verify':False}
# )

pytrends = TrendReq(hl='en-US', tz=360)
nlp = spacy.load("en_core_web_sm")


def isPerson(text: str):
	doc = nlp(text)
	for entity in doc.ents:
		if entity.label_ == "PERSON":
			return True
	return False


@app.get("/image")
async def get_image(prompt: str):
	# generic prompt keywords for stable diffusion
	prompt = "movie still macro close photo nft cyberpunk colourful dreamworks  " + prompt 

	pipe = DiffusionPipeline.from_pretrained(MODEL)
	pipe = pipe.to("mps")
	pipe.enable_attention_slicing()
	_ = pipe(prompt, num_inference_steps=1)

	# PIL to base64 object for JSON response
	image = pipe(prompt).images[0]
	image_bytes = BytesIO() 
	image.save(image_bytes, format="JPEG") 
	encoded_image = base64.b64encode(image_bytes.getvalue()).decode("utf-8")

	return {"encoded_image": encoded_image}

# returns a list of trending topics for our SD prompt
# example response:
"""
[
"Ezra Miller, The Flash",
"Charles Barkley, Skip Bayless, Shannon Sharpe, Skip and Shannon: Undisputed",
"Hori san to Miyamura kun, Anime, Kyoko Hori, Izumi Miyamura, CloverWorks, HERO",
"Cruz Azul, Julián Quiñones, Ricardo Ferretti, Atlas F.C., Liga MX",
"Fate/strange Fake, Anime, Type-Moon, Aniplex",
"Concacaf Gold Cup, Guatemala national football team, Cuba national football team, Canada, Guadeloupe national football team",
"Gwyneth Paltrow, Chris Martin, Moses Martin, Coldplay, Apple Martin",
"Charles Martin, Boxing, Top Rank",
"Augusta GreenJackets, Carolina League, Atlanta Braves, Columbia Fireflies, Kansas City Royals",
"Avi Loeb, Extraterrestrial life, Harvard University, Unidentified flying object, Debris"
]
"""
@app.get("/trending")
async def get_trending():
	# default return type is a dataframe with this api
	trends_df = pytrends.realtime_trending_searches(pn='US')
	print(trends_df)
	entity_df = trends_df["entityNames"]

	entity_list = entity_df.apply(
		lambda x: ', '.join(x),
	).tolist()

	entity_persons = [text for text in entity_list if isPerson(text)]

	# limit to 10 for now so that we don't have to generate too many images
	entity_persons = entity_persons[:NUM_ENTITIES] if len(entity_persons) >= NUM_ENTITIES else entity_persons

	return entity_persons