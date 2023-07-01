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

  return (
    <div>
      <MintingTool />
    </div>
  );
}
