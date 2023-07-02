import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import "./App.css";

// Custom Components
import MintingTool from "./Components/MintingTool";

// asse

import getConfig from "./config";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const getNfts = async () => {
      if (window.accountId) {
        setNfts(
          await window.contract.nft_tokens_for_owner({
            account_id: window.accountId,
          })
        );
      }
    };
    getNfts();
  }, []);

  const checkNFT = async () => {
    console.log(window.walletConnection.getAccountId());
    // not sure why its not working
    const nft = await window.contract.nft_tokens_for_owner({
      account_id: window.accountId,
    });
    console.log(nft);
  };

  console.log(nfts);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
          width: "100vw",
          height: "75px",
          backgroundColor: "grey",
        }}
      >
        <div
          style={{
            marginRight: "auto",
            marginLeft: "25px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          TrendWave NFT
        </div>
        <button
          style={{ width: "150px", marginRight: "25px" }}
          onClick={window.walletConnection.isSignedIn() ? logout : login}
        >
          {window.walletConnection.isSignedIn() ? window.accountId : "Login"}
        </button>
      </div>
      <ImageGallery nfts={nfts} />
      {/* <h1>Your NFTs</h1>
      {nfts.map((nft, index) => {
        return (
          <div key={index}>
            <img src={nft.metadata.media} alt="nft-pic" />
          </div>
        );
      })} */}
      {/* <button
        onClick={() => {
          checkNFT();
        }}
      >
        TEST: log nfts
      </button> */}
      <MintingTool />
    </div>
  );
}
