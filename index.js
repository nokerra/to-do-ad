let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

formElement.addEventListener('submit', (event) => {
	event.preventDefault();

	listElement.prepend(createItem(inputElement.value));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
});

function loadTasks() {
	const savedTasks = localStorage.getItem('taskList');
	
	if (savedTasks) {
		return JSON.parse(savedTasks);
	} else {
		saveTasks(items);
		return items;
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;
	
	deleteButton.addEventListener('click', (event) => {
		clone.remove();

		const items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', (event) => {
		const itemName = textElement.textContent;
		const newItem = createItem(item);
		listElement.prepend(newItem);

		const items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click', (event) => {
		textElement.contentEditable = "true";
		textElement.focus();
	});

	textElement.addEventListener('blur', (event) => {
		textElement.contentEditable = "false";
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	
	let tasks = [];
	itemsNamesElements.forEach((task) => {
	tasks.push(task.textContent);
	});

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('taskList', JSON.stringify(tasks));
}

items = loadTasks();

items.forEach((task) => {
	listElement.append(createItem(task));
});