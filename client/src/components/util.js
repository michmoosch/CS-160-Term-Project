const parseCookie = (cookie) => {
  const info = document.cookie.split(";")[1].split("=")[1];
  const js = JSON.parse(info);
  return js;
};

export { parseCookie };
