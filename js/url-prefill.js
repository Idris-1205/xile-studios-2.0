document.addEventListener("DOMContentLoaded", () => {
  const serviceField = document.getElementById("service");
  const budgetField = document.getElementById("budget");
  if (!serviceField || !budgetField) return;

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  const budget = params.get("budget");

  if (service) serviceField.value = service;
  if (budget) budgetField.value = budget;
});
