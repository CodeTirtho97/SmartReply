export const CHROME_EXTENSION_URL =
  import.meta.env.VITE_CHROME_EXTENSION_URL ||
  "https://chromewebstore.google.com/detail/smartreply+/peojdfhnhbabekoopgoagafncpclhbhj";

export const openChromeExtension = () => {
  window.open(CHROME_EXTENSION_URL, "_blank");
};
