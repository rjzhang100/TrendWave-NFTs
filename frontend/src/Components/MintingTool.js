import React, { useRef } from "react";
import { login, logout } from "../utils";
const BN = require("bn.js");

const MintingTool = (props) => {
  const formRef = useRef(null);
  //   const showNFTs = async () => {
  //     const nfts = await window.contract.nft_tokens_for_owner({
  //       account_id: window.accountId,
  //     });
  //     console.log(nfts);
  //   };
  const mintNFT = async () => {
    console.log(formRef.current.children["token-name"].value);
    await window.contract.nft_mint(
      {
        token_id: formRef.current.children["token-name"].value,
        metadata: {
          title: formRef.current.children["token-name"].value,
          description: formRef.current.children["description"].value,
          media: formRef.current.children["media"].value,
        },
        receiver_id: window.accountId,
      },
      30000000000000,
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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        ref={formRef}
      >
        <label>token name</label>
        <input id="token-name" />
        <label>token description</label>
        <input id="description" />
        <label>token media</label>
        <input id="media" />
      </form>
      <button onClick={() => mintNFT()}>Minting Tool</button>
    </div>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
