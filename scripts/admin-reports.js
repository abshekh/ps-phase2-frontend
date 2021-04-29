const redirect = (key) => {
  return `./quiz-report.html?id=${key}`;
};

const fetch_all_quiz_reports = async () => {
  const response = await fetch('../data/all-quiz-reports.json');

  if (!response.ok) {
    const message = response.status;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
};





document.addEventListener("DOMContentLoaded", async () => {

  const report_body = document.getElementById('report-body');

  try {
    const all_reports = await fetch_all_quiz_reports();

    all_reports.forEach(report => {
      report_body.innerHTML += `
                                  <div class="card row mb-3">
                                    <div class="card-body">
                                      <h5 class="card-title">${report.title}</h5>
                                      <p class="card-text">${report.description}</p>
                                      <button type="button" class="btn btn-primary view-report" data-key='${report.id}'>View Report</button>
                                    </div>
                                  </div>
                                `;
    });

  } catch (error) {
    console.log(error);

  }


  const view_report_buttons = document.querySelectorAll('.view-report');

  view_report_buttons.forEach(btn => {

    btn.addEventListener('click', async (e) => {
      const key = e.target.dataset.key;
      window.location = redirect(key);
    });
  });

});