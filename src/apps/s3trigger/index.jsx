import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function () {
  let [images, setImages] = useState([]);

  let fetchImages = async () => {
    let files = await Storage.list("");
    console.log("[fetchImages] files = ", files);

    let signedFiles = await Promise.all(
      files.map(async (file) => {
        let signedFile = await Storage.get(file.key);
        return signedFile;
      })
    );
    setImages(signedFiles);
  };

  let onChange = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    let fileType = file.name.split(".").pop();
    await Storage.put(`${uuid()}.${fileType}`, file);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <input type="file" onChange={onChange} />
      <br />

      {images.map((image, index) => {
        return (
          <img
            src={image}
            key={index}
            style={{
              width: 200,
            }}
          />
        );
      })}
    </div>
  );
}
