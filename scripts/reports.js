const fetch_quiz1 = async () => {
  const response = await fetch('../data/quiz1-report.html');

  if (!response.ok) {
    const message = response.status;
    throw new Error(message);
  }
  const text = await response.text();
  return text;
};

document.addEventListener("DOMContentLoaded", async () => {

  const main = document.querySelector('main');

  try {
    const report = await fetch_quiz1();
    main.innerHTML = report;
  } catch (e) {
    console.log("Error: " + e);
  }

});