import React, { useState } from "react";
import axios from "axios";
import { NFTStorage, File } from 'nft.storage/dist/bundle.esm.min'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
const BN = require("bn.js");
import "../App.css";

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFhZUEwQjc5NzlEQUI3YTIwYjQ2RjljNjI1RkVhN0M1YjM0OUFGNEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4ODI4OTMyNjU2MSwibmFtZSI6InRyZW5kd2F2ZSJ9.FTkIlEGPXmM_LKX-5uUc5ba0DFF935t6zSUK8E1Dz3E'
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

	const fileFromBase64 = async (b64string) => {
		const content = Buffer.from(b64string, 'base64');
		const type = 'image/png'; // Assuming the base64 string represents a PNG file
		return new File([content], 'image.png', { type });
	};

	const formatIPFS = (ipfs) => {
		const removePrefix = ipfs.replace("ipfs://", "");
		const removeSuffix = removePrefix.replace("/image.png", "");
		return "https://" + removeSuffix + ".ipfs.dweb.link/image.png";
	}

	const storeNFT = async (image, name, description) => {

		// create a new NFTStorage client using our API key
		const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

		// call client.store, passing in the image & metadata
		return nftstorage.store({
			image,
			name,
			description,
		})
	}

	const mintNFT = async (tokenId, description, media) => {
		const image = await fileFromBase64(media)
		console.log(image);
		const res = await storeNFT(image, tokenId, description);
		const ipfs = res.data.image.href;
		const formattedIPFS = formatIPFS(ipfs);
		console.log(formattedIPFS);
		// return
		await window.contract.nft_mint(
			{
				token_id: tokenId,
				metadata: {
					title: tokenId,
					description: description,
					media: formattedIPFS,
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