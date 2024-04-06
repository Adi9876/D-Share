import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
  };

  const revoke = async () => {
    try{const address = document.querySelector(".address").value;
    await contract.disallow(address);}
    catch(e){
      alert("Error Try Again..");
    }
  }

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="shareWith">
          {" "}
          Share With
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            />
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            {/* <button className="cancelBtn" onClick={()=>{setOpenModal}}>Cancel</button>
                    <button className="approve" onClick={()=>{sharing}}>Share</button> */}
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()} id="shareBtn">
              Share
            </button>
            <button onClick={() => revoke()} id="revokeBtn">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
