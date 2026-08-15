(() => {
  const localHost = ["127.0.0.1", "localhost"].includes(location.hostname);
  window.COOKSHARE_AUTH_CONFIG = {
    apiBase: window.COOKSHARE_AUTH_API_BASE || (localHost ? location.origin : "")
  };
})();
