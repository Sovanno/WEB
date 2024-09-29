const treeRoot = document.querySelector('.tree-root');
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

const orgData = [
  { name: 'Отдел Крутых', employees: [
    { name: 'Отдел Блатных', employees: [
      { name: 'Тинатин Гивиевна Канделаки' },
      { name: 'Валериан Шотаевич Меладзе' },
      { name: 'Адиль Оралбекович Жалелов' }
    ]}
  ]},
  { name: 'Отдел СУПС', employees: [
    { name: 'Отдел ГУПС', employees: [
      { name: 'Валдис Эйженович Пельш' },
      { name: 'Кристина Эдмундовна Орбакайте' },
      { name: 'Юрий Юлианович Шевчук' }
    ]}
  ]},
  { name: 'Отдел Абубе', employees: [
    { name: 'Отдел Бандиты', employees: [
      { name: 'Максим Эммануилович Виторган' },
      { name: 'Жанна Осиповна Бадоева' },
      { name: 'Мирон Янович Фёдоров' },
      { name: 'Алсу'}
    ]}
  ]}
];

function buildOrgTree(data, parentNode = null) {
  data.forEach(item => {
    const treeNode = document.createElement('li');
    treeNode.textContent = item.name;
    treeNode.classList.add('tree-node');

    if (item.employees) {
      const childTree = document.createElement('ul');
      childTree.style.display = 'none';
      buildOrgTree(item.employees, childTree);
      treeNode.appendChild(childTree);
      treeNode.addEventListener('click', (e) => {
        e.stopPropagation();
        childTree.style.display = childTree.style.display === 'none' ? 'block' : 'none';
      });
    }

    if (parentNode) {
      parentNode.appendChild(treeNode);
    } else {
      treeRoot.appendChild(treeNode);
    }
  });
}

buildOrgTree(orgData);

function searchEmployees() {
  const query = searchInput.value.toLowerCase();
  const foundEmployees = orgData.flatMap(dept =>
    dept.employees.flatMap(emp => emp.employees.filter(ch_emp => ch_emp.name.toLowerCase().includes(query)))
  );

  searchResults.innerHTML = '';
  foundEmployees.forEach(emp => {
    const empDiv = document.createElement('div');
    empDiv.textContent = emp.name;
    empDiv.addEventListener('click', () => {
      expandToEmployee(emp.name);
    });
    searchResults.appendChild(empDiv);
  });
}

function expandToEmployee(name) {
  const treeNodes = document.querySelectorAll('.tree-node');
  treeNodes.forEach(node => {
    node.classList.remove('active');
  });

  const findEmployee = (node, name) => {
    if (node.textContent === name) {
      node.classList.add('active');
      return true;
    }

    if (node.children.length > 0) {
      for (const child of node.children[0].children) {
        if (findEmployee(child, name)) {
          node.children[0].style.display = 'block';
          return true;
        }
      }
    }
    return false;
  };

  treeNodes.forEach(node => {
    findEmployee(node, name);
  });
}

searchInput.addEventListener('input', searchEmployees);
