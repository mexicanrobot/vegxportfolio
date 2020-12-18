(
  function() {
    var projects = document.getElementsByClassName('project');
    for(var i = 0; i < projects.length; i++) {
      var x = projects[i];
      projects[i].addEventListener("mouseover",function() {
        this.classList.add('hover');
      },false);
      projects[i].addEventListener("mouseout",function() {
        this.classList.remove('hover');
      },false);
    }
  }
)();