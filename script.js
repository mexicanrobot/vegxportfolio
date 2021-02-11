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

        image.setAttribute('src','images/voxel.png');
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
      document.querySelector('#modal .modal-title').innerText = project.title;
      document.querySelector('#modal .modal-description').innerText = project.description;

      if(project.team) {
        for(let role in project.team) {
          let members = "";
          for(let member of project.team[role]) {
            if(project.team[role].indexOf(member) !== project.team[role].length -1) {
              members += `${member}, `;
            } else {
              members += `${member}`;
            }
          }
          let membersElement = document.createElement('p');
          membersElement.innerText = `<b>${role}</b>: ${members}`;
          membersElement.innerHTML = membersElement.innerText;
          document.querySelector('#modal .modal-team').appendChild(membersElement);
        }
      } else {
        document.querySelector('#modal .modal-team').innerHTML = "";
      }
    }

    document.getElementById('modal-overlay').onclick = () => {
      document.getElementById('modal').classList.remove('show');
      document.getElementById('modal-overlay').classList.remove('show');
    };

    fetch('projects.json').then(response => response.json()).then(data => addProjects(data));

    var headroom  = new Headroom(document.querySelector('#header'));
    headroom.init();
    console.log(headroom);
  }
)();