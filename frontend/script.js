const API_URL = "http://127.0.0.1:8000/jobs";
const jobList = document.getElementById("jobList");

async function fetchJobs() {
  const res = await fetch(API_URL);
  const jobs = await res.json();

  jobList.innerHTML = "";

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job";

    const statusSelect = document.createElement("select");
    ["Applied", "Interview", "Offer", "Rejected"].forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (status === job.status) option.selected = true;
      statusSelect.appendChild(option);
    });

    statusSelect.onchange = async () => {
      await fetch(`${API_URL}/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusSelect.value })
      });
      fetchJobs();
    };

    div.innerHTML = `
      <strong>${job.company}</strong>
      <span>${job.position}</span>
    `;

    div.appendChild(statusSelect);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${API_URL}/${job.id}`, { method: "DELETE" });
      fetchJobs();
    };

    div.appendChild(deleteBtn);
    jobList.appendChild(div);
  });
}

document.getElementById("addJobBtn").onclick = async () => {
  const job = {
    company: company.value,
    position: position.value,
    status: status.value,
    date_applied: new Date().toISOString().split("T")[0]
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });

  company.value = "";
  position.value = "";
  fetchJobs();
};

fetchJobs();
