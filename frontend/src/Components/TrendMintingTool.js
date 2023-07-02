import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Card from "./Card";

const BN = require("bn.js");

const TrendMintingTool = () => {

	const [trends, setTrends] = useState([]);
	const [loading, setLoading] = useState(false);

	const getTrends = () => {
		setLoading(true);
		axios.get("http://127.0.0.1:8000/trending")
			.then(response => {
				setTrends(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				setLoading(false);
			})
	}

	return (
		<div>
			<h1>Welcome to the Trendwave NFT minter!</h1>
			<p>Here, you can fetch trending topics from Google Trends and their respective NFTs. Then, you can pick and choose which ones to mint.</p>
			{!loading && <button onClick={getTrends} className="styledButton">Fetch topics</button>}
			{<p>Topics:</p> && trends.length !== 0}
			<div>
				{trends.map((trend, key) => <Card prompt={trend} key={key} />)}
			</div>
			{loading && <p>Loading topics...</p>}
		</div>
	);
};

export default TrendMintingTool;
