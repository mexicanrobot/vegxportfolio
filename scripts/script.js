(
  function() {
    function addProjects(json) {
      let projects = document.querySelector('.projects');

      for(let project of json) {
        let projectElement = document.createElement('article');
        let overlay = document.createElement('div');
        let title = document.createElement('p');
        let image = document.createElement('img');

        projectElement.classList.add('project');
        overlay.classList.add('overlay');
        title.classList.add('overlay-title');
        title.innerText = project.title;

        image.setAttribute('src',project.cover);
        image.setAttribute('alt',project.title);

        overlay.appendChild(title);
        overlay.onclick = () => showModal(project);

        projectElement.appendChild(overlay);
        projectElement.appendChild(image);

        projects.appendChild(projectElement);

        projectElement.addEventListener('mouseover', function() {this.classList.add('hover')});
        projectElement.addEventListener('mouseout', function() {this.classList.remove('hover')});
      }
    }

    function showModal(project) {
      let modal = document.getElementById('modal');

      modal.classList.add('show');
      document.getElementById('modal-overlay').classList.add('show');
      document.querySelector('#modal .modal-cover').setAttribute('src',project.cover);
      document.querySelector('#modal .modal-title').innerText = project.title;
      document.querySelector('#modal .modal-description').innerText = project.description;

      if(project.team) {
        document.querySelector('.team-title').style.display = "block";
        for(let role in project.team) {
          let members = "";
          for(let member of project.team[role]) {
              members += `${member}`;
              if(project.team[role].indexOf(member) !== project.team[role].length -1) members += ", ";
          }
          let membersElement = document.createElement('p');
          membersElement.innerText = `<b>${role}</b>: ${members}`;
          membersElement.innerHTML = membersElement.innerText;
          document.querySelector('#modal .modal-team').appendChild(membersElement);
        }
      } else {
        document.querySelector('.team-title').style.display = "none";
        document.querySelector('#modal .modal-team').innerHTML = "";
      }

      document.querySelector('#modal .software').innerHTML = "";
      let softwareElement = document.createElement('ul');
      for(let software of project.software) {
        softwareElement.innerText += `<li>${software}</li>`;
      }
      softwareElement.innerHTML = softwareElement.innerText;
      document.querySelector('#modal .software').appendChild(softwareElement);
    }

    document.getElementById('modal-overlay').onclick = () => {
      document.getElementById('modal').classList.remove('show');
      document.getElementById('modal-overlay').classList.remove('show');
      document.querySelector('#modal .modal-team').innerHTML = "";
    };

    fetch('data/projects.json').then(response => response.json()).then(data => addProjects(data));

    var headroom  = new Headroom(document.querySelector('#header'));
    headroom.init();
    console.log(headroom);
  }
)();