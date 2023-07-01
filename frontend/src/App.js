import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";

// Custom Components
import MintingTool from "./Components/MintingTool";

// asse

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);

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
  useEffect(() => {}, []);

  const checkNFT = async () => {
    console.log(window.walletConnection.getAccountId());
    // not sure why its not working
    const nft = await window.contract.nft_tokens_for_owner({
      account_id: window.accountId,
    });
    console.log(nft);
  };

  return (
    <div>
      <button
        onClick={() => {
          checkNFT();
        }}
      >
        Click me
      </button>
      <MintingTool />
    </div>
  );
}
