const resetBodyStyle = () => {
  document.documentElement.style.height = null;
  document.body.style.margin = null;
  document.body.style.height = null;
  document.body.style.backgroundColor = null;
};

const styleBody = () => {
  document.documentElement.style.height = "100%";
  document.body.style.margin = "0";
  document.body.style.height = "100%";
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
};

export { resetBodyStyle, styleBody };
