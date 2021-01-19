//var _ = require('underscore');
const add = document.getElementById('add');
let image = document.getElementById('image');
const logoLoup = document.getElementById('logo-loup');
const close = document.getElementById('close');
const modal = document.getElementById('modal');
const roleShow = document.getElementById('role-show');
const modalForm = document.getElementById('modalform');
const compositionId = document.getElementById('composition');
const player = document.getElementById('player');
var nbPlayers = document.getElementById('nb-players');
const listRoles = document.getElementById('list-display');
const notification = document.getElementById('notification-container');
const hidden = document.getElementById('ordre-appel');
var ntm = document.getElementById("confirm-composition");
var notifMessage = document.getElementById('notif-message');
const container = document.getElementById('container');
const roles = ["loup-garou", "villageois", "absorbeur", "ancien du village", "ange", "bienveillant", "cafteur",
"canonnier", "chaman", "chasseur", "chasseur de prime", "tueur a gage", "assassin",
"chef-loup", "chirurgien", "chomeur", "corbeau", "colosse", "comedien", "complice",
"copieur", "cowboy", "cupidon", "demon", "destructeur", "detective", "devin", "enfant de la foret", "enfant sauvage", "esclavagiste", "faucheuse", "freres d'armes", "3 frères", "garde du corps", "joker", "juge", "joueur de flute", "lanceur de piece","loup blanc", "loup masqué", "loup sanguin", "loup supreme", "maire", "magicien", "mangeur d'ame", "mamie", "marchand", "medium", "mercenaire", "ombre", "petite fille", "pharaon", "prince charmant", "prisonnier", "revenant","salvateur", "samourai", "savant fou", "sirene", "sorciere", "vampire", "victime", "voyante", "zombie"];

const composition = [];

const ordre = ["sirene", "destructeur", "absorbeur", "comedien", "enfant sauvage", "mercenaire", "prince charmant", "juge", "pharaon", "copieur", "cupidon", "chirurgien", "freres d'armes", "3 freres", "chirurguen", "voyante", "salvateur", "garde du corps", "loup-garou", "chef-loup", "loup supreme", "loup-garou blanc", "chasseur de prime", "tueur a gage", "assassin", "joueur de flûte", "detective", "savant fou", "magicien", "sorciere", "canonnier", "esclavagiste", "mamie", "corbeau", "medium", "faucheuse", "joker", "devin", "enfant de la foret", "cafteur"];

function addRoleList(){
  roles.forEach((item, i) => {

    var div = document.createElement('div');
    var label = document.createElement("label");
    div.className = "role";
    label.htmlFor = item;
    label.innerHTML = item.charAt(0).toUpperCase() + item.slice(1);

    var inputAdd = document.createElement('input');
    var inputRemove = document.createElement('input');

    inputAdd.setAttribute('type', 'button');
    inputAdd.setAttribute('value', '+');
    inputRemove.setAttribute('type', 'button');
    inputRemove.setAttribute('value', '-');
    inputAdd.classList = "role-add";
    inputRemove.classList = "role-remove";
    inputAdd.id = item+"Add";
    inputRemove.id = item+"Remove";

    div.appendChild(label);
    div.appendChild(inputAdd);
    div.appendChild(inputRemove);
    modalForm.appendChild(div);
    addToComp();
  });


};

function addToComp(){
  const roleAddition = document.querySelectorAll('input.role-add');
  var increment = 0;
  roleAddition.forEach((item, i) => {
    roleAddition[i].onclick = function() {
      increment += 1;
      const roleAdded = removeChars(roleAddition[i].id);
      if (increment <= nbPlayers.value) {
        composition.push(roleAdded);

          if (composition.length <= nbPlayers.value) {
            const element = document.createElement('div');
            listRoles.appendChild(element);
            element.classList.add('role-display');
            element.innerHTML = removeChars(firstLetterMaj(item.id));
          }
      } else {
        showNotification("Composition complète");
        increment -=1;
      }

    }

  });
};

function removeChars(word) {
  var str = word;
  stringFull = str.substring(0,str.length-3);
  return stringFull;
}

function firstLetterMaj(word) {
  var returned = word.charAt(0).toUpperCase() + word.slice(1);
  return returned;
}

function showNotification(error){
  notification.innerHTML = error;
  notification.classList.add('show');


  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function endComp(){
  if (composition.length>=nbPlayers.value) {
    roleShow.classList.add('hide-composition');
    hidden.classList.remove('hidden');
    player.classList.add('hidden');
    triRoles();
  } else {
    showNotification("Veuillez terminer la composition");
  }

}

function triRoles(){
  var intersection = ordre.filter(function(item){ return composition.indexOf(item) > -1});
  showRoles(intersection);
}

function showRoles(tableau){
  tableau.forEach((item, i) => {
    const elementOrdre = document.createElement('p');
    hidden.appendChild(elementOrdre);
    elementOrdre.innerHTML = firstLetterMaj(item);
  });

}

addRoleList();


// Event Listeners

// Show Modal
add.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide Modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);

ntm.addEventListener('click', endComp);
