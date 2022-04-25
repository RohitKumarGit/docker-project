document.getElementById("btn").onclick = async function () {
  fetch("/predict?text=" + document.getElementById("inp").value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("fixedText").innerText = data.pred[0].text;
    });
};
