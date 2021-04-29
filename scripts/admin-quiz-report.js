const fetch_quiz_report = async (key) => {
  let url = '';
  if (key == '1') {
    url = '../data/quiz1-report.json';
  }

  else if (key == '2') {
    url = '../data/quiz2-report.json';
  }

  else if (key == '3') {
    url = '../data/quiz3-report.json';
  }

  const response = await fetch(url);

  if (!response.ok) {
    const message = response.status;
    throw new Error(message);
  }

  const data = await response.json();
  return data;

};

document.addEventListener("DOMContentLoaded", async () => {

  const table = document.getElementById('table-body');
  const quizTitle = document.getElementById('quiz-title');
  const quizDesc = document.getElementById('quiz-desc');

  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('id');



  try {
    const data = await fetch_quiz_report(key);

    quizTitle.innerHTML = data.title;
    quizDesc.innerHTML = data.description;

    data.reports.forEach(row => {
      const eachRow = `
                  <tr>
                    <td>${row.Name}</td>
                    <td>${row.Email}</td>
                    <td>${row.Score}</td>
                    <td>${row.Time}</td>
                    <td>${row.Date}</td>
                  </tr>
                `;
      table.innerHTML += eachRow;
    });



  } catch (err) {
    console.log(err);

  }

});