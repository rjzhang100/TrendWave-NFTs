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

  // useEffect(() => {
  //   const receivedNFT = async () => {
  //     console.log(
  //       await window.contract.check_token({
  //         id: `${window.accountId}-go-team-token`,
  //       })
  //     );
  //     if (window.accountId !== "") {
  //       console.log(
  //         await window.contract.check_token({
  //           id: `${window.accountId}-go-team-token`,
  //         })
  //       );

  //       setuserHasNFT(
  //         await window.contract.check_token({
  //           id: `${window.accountId}-go-team-token`,
  //         })
  //       );
  //     }
  //   };
  //   receivedNFT();
  // }, []);

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
