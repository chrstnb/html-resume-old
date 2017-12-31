$.getJSON('resume.json', function(data) { 
	loadHeader(data);
	loadInfo(data.info);
	loadExperience(data.work, "work");
	loadExperience(data.volunteer, "volunteer");
	loadExperience(data.education, "education");
	loadSkills(data.skills);
	loadList(data.awards, "awards");
	loadList(data.strengths, "strengths");


});

function loadHeader(data) {
	document.getElementById("name").textContent = data.name;
	document.getElementById("title").textContent = data.title;
}

function loadInfo(data) {
	var ul = document.createElement('ul');
	document.getElementById('hRight').appendChild(ul);
	for(var i = 0; i < data.length; i++) {
		var li = document.createElement('li');
		ul.appendChild(li);
		li.textContent += data[i].data;
	}
};

function loadExperience(data, type) {
	var section = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		var current = data[i];
		var s = createNode('section', "blocks");
		s.appendChild(createNode('div', "decorator"));
		var details = createNode('div', "details");
		details.appendChildren(
			createNode('span', "job", current.job),
			createNode('span', "date", current.date), 
			document.createElement('br'), 
			createNode('span', "place", current.place),
			createNode('span', "location", current.location),
			extraInfo(current, type),
			createNode('span', "description", current.description));
		s.appendChild(details);
		section.appendChild(s);
	}
};

function extraInfo(data, type) {
	if (type == "education") {
		if (data.graduation != null && data.gpa != null) {
			var grad = createNode('span', "grad", data.graduation);
			var gpa = createNode('span', "gpa", data.gpa);
			var div = document.createElement('div');
			div.appendChild(grad);
			div.appendChild(gpa);
			div.appendChild(document.createElement('br'))
			return div;
		}
	}
	return document.createElement('br');
}

function loadSkills(data) {
	var types = ["proficient", "familiar", "tools"];
	var elements = [data.proficient, data.familiar, data.tools];
	for (var i = 0; i < types.length; i++) {
		var container = document.getElementById(types[i]);
		var element = elements[i];
		for (var j = 0; j < element.length; j++) {
			container.appendChild(createNode("li", 'none', element[j]));
		}
	}
}

function loadList(data, type) {
	console.log(data);
	var container = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		container.appendChild(createNode("li", 'none', data[i]));
	}
}

HTMLElement.prototype.appendChildren = function() {
  for (var i = 0 ; i < arguments.length ; i++)
    this.appendChild(arguments[i]);
};

function createNode(type, className, inner) {
	var result = document.createElement(type);
	result.className = className;
	result.textContent = inner;
	return result;
}



