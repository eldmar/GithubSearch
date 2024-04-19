const container = document.querySelector(".searchContainer");

export const hideAlert = () => {
  const alertBlock = document.querySelector(".alert");
  if (alertBlock) {
    alertBlock.remove();
  }
};

export const showAlert = (message, type, timeout = 3000) => {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.innerHTML = message;

  container.prepend(div);

  setTimeout(hideAlert, timeout);
};
