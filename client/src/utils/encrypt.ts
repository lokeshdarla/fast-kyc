import CryptoJS from "crypto-js";

export const encryptFile = (file: File, secretKey: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = event.target?.result as string;
      const encrypted = CryptoJS.AES.encrypt(fileData, secretKey).toString();
      const encryptedBlob = new Blob([encrypted], { type: "text/plain" });

      resolve(encryptedBlob);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};
