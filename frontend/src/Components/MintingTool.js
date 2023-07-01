import React from "react";
import { login, logout } from "../utils";
const BN = require("bn.js");

const MintingTool = (props) => {
  const mintNFT = async () => {
    await window.contract.nft_mint(
      {
        token_id: `trendwave-2`,
        metadata: {
          title: "testing token 2",
          description: "testing token 2",
          media:
            "https://media0.giphy.com/media/TslhOkvop5fIbTevw7/200w.webp?cid=bb5a1c3aumlwztnfqawn78itktknq7x0r74aeafwcac10ikk&ep=v1_gifs_trending&rid=200w.webp&ct=g",
        },
        receiver_id: window.accountId,
      },
      3000000000000,
      new BN("1000000000000000000000000")
    );
  };

  return (
    <div>
      <button
        style={{ width: "50vw" }}
        onClick={window.walletConnection.isSignedIn() ? logout : login}
      >
        {window.walletConnection.isSignedIn() ? window.accountId : "Login"}
      </button>
      <button onClick={() => mintNFT()}>Minting Tool</button>
    </div>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
