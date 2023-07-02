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

// adminAccountID = "raminkahidi.testnet";
adminAccountID = "jasonydzhao.testnet";

export default function App() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const getNfts = async () => {
      if (window.accountId) {
        setNfts(
          await window.contract.nft_tokens_for_owner({
            account_id: adminAccountID,
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
          zIndex: "12312",
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
      {window.innerWidth > 600 && (
        <div
          style={{
            backgroundColor: "lightgrey",
            position: "absolute",
            left: "0",
            height: "100%",
            width: "150px",
            paddingTop: "85px",
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <div style={{ marginTop: "15px" }}>
            <div style={{ marginBottom: "10px" }}>Sort NFTs by Category</div>
            <div
              style={{
                width: "100%",
                height: "25px",
                backgroundColor: "white",
                color: "black",
                textAlign: "center",
              }}
            >
              Funny
            </div>
          </div>
          <div>
            <div>Sort NFTs by Price</div>
            <div
              style={{
                width: "100%",
                height: "25px",
                backgroundColor: "white",
                color: "black",
                textAlign: "center",
              }}
            >
              Lowest to Highest
            </div>
          </div>
          <div>
            Get Trendy NFT For:
            <div
              style={{
                width: "100%",
                height: "25px",
                backgroundColor: "white",
                color: "black",
                textAlign: "center",
              }}
            >
              July 2 2023
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          paddingLeft: window.innerWidth > 600 ? "150px" : "0px",
        }}
      >
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
        {adminAccountID === window.accountId ? <MintingTool /> : <></>}
      </div>
    </div>
  );
}
