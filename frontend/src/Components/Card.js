import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Card = ({ prompt }) => {
	// nftString is the base64 string of the NFT image
	const [nftString, setNftString] = useState("");
	const [loading, setLoading] = useState(false);

	const getNFT = (prompt) => {
		setLoading(true);
		axios.get(`http://127.0.0.1:8000/image?prompt=${prompt}`)
			.then(response => {
				setNftString(response.data?.encoded_image);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
				setLoading(false);
			})
	}

	const mintNFT = async (tokenId, description, media) => {
		await window.contract.nft_mint(
			{
				token_id: tokenId,
				metadata: {
					title: tokenId,
					description: description,
					media: media,
				},
				receiver_id: window.accountId,
			},
			30000000000000,
			new BN("1000000000000000000000000")
		);
	};

	return (
		<div className="card">
			<div>Prompt: {prompt}</div>
			{nftString === "" && !loading && <button
				className="styledButton"
				style={{ backgroundColor: "black", color: "white" }}
				onClick={() => getNFT(prompt)}>Generate NFT
			</button>}
			{nftString !== "" && <img src={`data:image/png;base64,${nftString}`} alt="Base64 Image" className="nftImg" />}
			{loading && <p>Loading NFT... (This may take over a minute depending on your computer)</p>}
			<br />
			{nftString !== "" && <button
				className="styledButton"
				style={{ backgroundColor: "black", color: "white" }}
				onClick={() => mintNFT(prompt, prompt, nftString)}>Mint NFT
			</button>}
		</div>
	)
}

export default Card;