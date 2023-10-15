// Encryption function
const encryptMessage = (message, shift) => {
	let encryptedMessage = '';
	for (let i = 0; i < message.length; i++) {
	  let charCode = message.charCodeAt(i);
	  if (charCode >= 65 && charCode <= 90) {
		charCode = ((charCode - 65 + shift) % 26) + 65;
	  } else if (charCode >= 97 && charCode <= 122) {
		charCode = ((charCode - 97 + shift) % 26) + 97;
	  }
	  encryptedMessage += String.fromCharCode(charCode);
	}
	return encryptedMessage;
};

// Decryption function
const decryptMessage = (encryptedMessage, shift) => {
	let decryptedMessage = '';
	for (let i = 0; i < encryptedMessage.length; i++) {
	  let charCode = encryptedMessage.charCodeAt(i);
	  if (charCode >= 65 && charCode <= 90) {
		charCode = ((charCode - 65 - shift + 26) % 26) + 65;
	  } else if (charCode >= 97 && charCode <= 122) {
		charCode = ((charCode - 97 - shift + 26) % 26) + 97;
	  }
	  decryptedMessage += String.fromCharCode(charCode);
	}
	return decryptedMessage;
};