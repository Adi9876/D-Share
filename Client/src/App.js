import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import image from "./logo.png";
import contact from "./linkedin.png";

import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    const provider = new ethers.BrowserProvider(ethereum);
    const loadProvider = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const contractAddress = "0x7402114d6eE87C6d4c7E0344d0d27e540A7f9133";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log("App.js works", contract);
        setAccount(address);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Metamask Not Installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div className="container">
      <div className="App">
      <div className="logo">
        <div className="imagediv">
          <img src={image} alt='img'></img>
        </div>
        <h1>Decentralized Cloud Sharing(D-Share)</h1></div>
        <div className="shares">
          {" "}
          {!modalOpen && (
            <button className="share" onClick={() => setModalOpen(true)}>
              Share
            </button>
          )}
          {modalOpen && (
            <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
          )}
        </div>

        <p>Account : {account ? account : "Not connected"}</p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display
          account={account}
          provider={provider}
          contract={contract}
        ></Display>
      </div>
      <footer class="footers">
        <div>
          <p>&copy; 2024 D-Share</p> Let Us Connect:
          <div className="contact">
          <a href="https://www.linkedin.com/in/adi-verse"> 
          <img src={contact} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
