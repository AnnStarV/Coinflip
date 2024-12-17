document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.burger-menu');
  const toggleSidebar = () => sidebar.classList.toggle('open');

  document.querySelector('.burger-icon').addEventListener('click', toggleSidebar);
  document.querySelector('.logo-wrapper .back').addEventListener('click', toggleSidebar);
});