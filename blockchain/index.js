const ipfsCid = "pan content";
const docHash = Array.from(new TextEncoder().encode(ipfsCid));
console.log(docHash);
