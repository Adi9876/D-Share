import { useEffect, useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ account, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image selected");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        console.log("file here",file)

        // const resFile = await axios
        //   .post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //       pinata_api_key: `3e89bee29f8ac4e9acbd`,
        //       pinata_secret_api_key: `266bf886ef8597316824b284f897a6b11a2832f4f1799569f090eb75a66ad566`,
        //     },
        //   })
        //   .then((response) => {
        //     console.log(response);
        //     return response;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `3e89bee29f8ac4e9acbd`,
              pinata_secret_api_key: `266bf886ef8597316824b284f897a6b11a2832f4f1799569f090eb75a66ad566`,
              "Content-Type": "multipart/form-data",
            },
          });
        
        console.log("after res file",resFile);
        // const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash,account);
        await contract.add(account, ImgHash);
        console.log("after contract add");
        

        setFile(null);
        setFile("No image selected");
        alert("file Uploaded");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(event.target.files[0]);
    };
    setFileName(event.target.files[0].name);
    event.preventDefault();
  };

  return (
    <div className="top">
      <form action="submit" className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        ></input>
        <button type="submit" className="upload-button" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;




// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// const FileUpload = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `3e89bee29f8ac4e9acbd`,
//             pinata_secret_api_key: `266bf886ef8597316824b284f897a6b11a2832f4f1799569f090eb75a66ad566`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         contract.add(account, ImgHash);
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//   );
// };
// export default FileUpload;