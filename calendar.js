const calendarGrid = document.getElementById("calendar-grid");
const monthYearDisplay = document.getElementById("month-year");
const taskModal = document.getElementById("task-modal");
const selectedDateDisplay = document.getElementById("selected-date");
const taskInput = document.getElementById("task-input");

let tasks = {};
let currentDate = new Date();

function renderCalendar(date) {
    calendarGrid.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYearDisplay.textContent = date.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    const offset = (firstDay === 0 ? 6 : firstDay - 1);

    for (let i = 0; i < offset; i++) {
        calendarGrid.insertAdjacentHTML("beforeend", `<div></div>`);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${month + 1}-${day}`;
        const hasTask = tasks[dateStr] ? "has-task" : "";

        calendarGrid.insertAdjacentHTML("beforeend", `
            <div class="${hasTask}" onclick="openTaskModal('${dateStr}')">${day}</div>
        `);
    }
}

function openTaskModal(dateStr) {
    selectedDateDisplay.textContent = new Date(dateStr).toDateString();
    taskInput.value = tasks[dateStr] || "";
    taskModal.style.display = "flex";
    taskModal.dataset.date = dateStr;
}

function closeModal() {
    taskModal.style.display = "none";
}

function saveTask() {
    const dateStr = taskModal.dataset.date;
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks[dateStr] = taskText;
    } else {
        delete tasks[dateStr];
    }
    
    closeModal();
    renderCalendar(currentDate);
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
}

document.addEventListener("DOMContentLoaded", () => renderCalendar(currentDate));

window.addEventListener("click", function(event) {
    if (event.target === taskModal) {
        closeModal();
    }
});
