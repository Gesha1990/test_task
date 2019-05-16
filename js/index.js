const main = (document => {

var data = getData();
var listFormTodo = document.querySelector(".send-letter .items-list");

var bottomsAddAll = document.querySelectorAll('.add-all');

var documents = [];
var links = [];
var labs = [];
var documentsListElement = document.querySelector('#documents .list-group');
var linksListElement = document.querySelector('#links .list-group');
var labsListElement = document.querySelector('#labs .list-group');

function render() {
	documents = data.documents.items;
	links = data.links.items;
	labs = data.labs.items;
	
	documents.forEach(function(item, index ) {
		 var template = getItemTemplate(item, index );
		 template.dataset.type = "documents"
		documentsListElement.appendChild(template);
	
	});
	
	links.forEach(function(item, index) {
		var template = getItemTemplate(item, index + 15 );
		template.dataset.type = "links"
		linksListElement.appendChild(template);
	});
  
	labs.forEach(function(item, index) {
		var template = getItemTemplate(item, index + 100);
		template.dataset.type = "labs"
		labsListElement.appendChild(template);
	});
	
};

function getItemTemplate(item, index) {
	var li = document.createElement('li');
	var label = document.createElement('label');
	var checkbox = document.createElement('input');
	var title = document.createElement('span');
	var subtext = document.createElement('span');

	li.classList.add('list-item');
	checkbox.classList.add('checkbox');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.dataset.index = index;
	title.classList.add('item-title');
	title.innerText = item.title;
	subtext.innerText = item.subtext;

	label.appendChild(checkbox);
	label.appendChild(title);
	label.appendChild(subtext);

	li.appendChild(label);
	
	bindEvent (li);
	return li;
}

function bindEvent (li){
	var checkbox = li.querySelector('.checkbox');
	checkbox.addEventListener('change', toggleTodoItem);
}

function toggleTodoItem(event) {
	var checkbox = event.target;
	var documentscheckbox = documentsListElement.querySelectorAll("input.checkbox");
	var linkscheckbox = linksListElement.querySelectorAll("input.checkbox");
	var labscheckbox = labsListElement.querySelectorAll("input.checkbox");
	var index = checkbox.dataset.index;

	if (this.checked == false){
		if (Number(index) >= 100) {
			labs[Number(index - 100)].checked = false;
			labscheckbox[Number(index - 100)].checked = false;		
		} else if (  Number(index) >= 15 && Number(index) <= 26) {
			links[Number(index - 15)].checked = false;
			linkscheckbox[Number(index - 15)].checked = false;
		} else {
			documents[Number(index)].checked = false;
			documentscheckbox[Number(index)].checked = false;	
		}
	} else {
		if (Number(index) >= 100) {
			labs[Number(index - 100)].checked = true;
		} else if (  Number(index) >= 15 && Number(index) <= 26) {
			links[Number(index - 15)].checked = true;
		} else {
			documents[Number(index)].checked = true;
		}
	
	}

	renderToForm();
	
	var checkboxTrash = listFormTodo.querySelectorAll("input.checkbox");
	checkboxTrash.forEach(item => {item.checked = true;
		item.classList.toggle('trash');
	}); 
}

bottomsAddAll.forEach(function(item){
	item.addEventListener('click', addRemoveAll);
	
});


function addRemoveAll(event) {
	var section = this.parentElement.parentElement;
	var checkbox = section.querySelectorAll('input.checkbox');
	
	if (this.value == "REMOVE ALL") {
		this.value = "ADD ALL";

		checkbox.forEach ( function (item) {
			item.checked = false;
			let index = item.dataset.index;

			if (index >= 100) {
						labs.forEach(item => item.checked = false )
					} else if ( index >= 15) {
						links.forEach(item => item.checked = false)
					} else {
						documents.forEach(item => item.checked = false)
					}
				});
	} else {
		this.value = "REMOVE ALL";
	
		checkbox.forEach(function (item){
			item.checked = true;
			let index = item.dataset.index;

			if (index >= 100) {
				labs.forEach(item => item.checked = true )
			} else if ( index >= 15) {
				links.forEach(item => item.checked = true)
			} else {
				documents.forEach(item => item.checked = true)
			}
		});
		
	}
	
	renderToForm();

	var checkboxTrash = listFormTodo.querySelectorAll("input.checkbox");
	checkboxTrash.forEach(item =>{item.checked = true;
			item.classList.toggle('trash');
	} );
}


function renderToForm() {
  listFormTodo.innerHTML = '';
	
  documents.forEach(function (item, index) {
		if (item.checked) {
			var template = getItemTemplate(item, index);
			template.className = "icon-result";
			template.dataset.type = "documents"
			listFormTodo.appendChild(template);
			
		}
	});
	
	links.forEach(function(item, index){
		if (item.checked) {
			var template = getItemTemplate(item, index + 15);
			template.className = "icon-result";
			template.dataset.type = "links"
			listFormTodo.appendChild(template);
		}
	});
	labs.forEach(function(item, index){
		if(item.checked) {
			var template = getItemTemplate(item, index + 100);
			template.className = "icon-result";
			template.dataset.type = "labs"
			listFormTodo.appendChild(template);
		}
	});
	

	var counter = document.querySelector("span.couner");
	var listItem = listFormTodo.querySelectorAll(".icon-result");	
	counter.innerHTML = listItem.length

}

return render();

})(document);

main();