// variables
const textEl = document.getElementById("text")
const statusEl = document.getElementById("status")
const xpamtEl = document.getElementById("xpamt")
const healthamtEl = document.getElementById("healthamt")
const goldamtEl = document.getElementById("goldamt")
const monsterEl = document.getElementById("monster")
const monsternameEl = document.getElementById("monstername")
const monsterhealthamtEl = document.getElementById("monsterhealthamt")
const button1El = document.getElementById("button1")
const button2El = document.getElementById("button2")
const button3El = document.getElementById("button3")
const dragonEl = document.getElementById("dragon")
const slimepicEl = document.getElementById("slime")
const fangedEl = document.getElementById("fangedbeast")
let monsterHealth

// original variables
let xp = 0
let health = 100
let gold = 50
let inventory = ["stick"]
let currentWeapon = 0
let fighting = 0

// initial values
xpamtEl.textContent = xp
healthamtEl.textContent = health
goldamtEl.textContent = gold

// Objects for buttons
const buttons = [
  {
   name: "town square",
  "button text": ["Go To Store", "Go To Cave", "Fight Dragon"],
  "button functions": [store, cave, fightDragon],
   text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
   name: "store",
  "button text": ["Buy Health(10GP)", "Buy Weapons(30GP)", "Go To Town Square"],
  "button functions": [buyHealth, buyWeapon, townSquare],
    text: "You enter the store."
  },
  {
   name: "cave",
  "button text": ["Fight Slime", "Fight Fanged Beast", "Go To Town Square"],
  "button functions": [fightSlime, fightBeast, townSquare],
   text: "You enter the cave. You see some monsters."
  },
  {
   name: "fight",
  "button text": ["Attack", "Dodge", "Run"],
  "button functions": [attack, dodge, townSquare],
   text: "You are fighting a monster."
  },
  {
    name: "lose",
    "button text": ["Try Again?","Try Again?","Try Again?"],
    "button functions": [restart,restart,restart],
    text: "You die. ☠️"
  },
  {
    name: "win",
    "button text":["Replay?","Replay?","Replay?"],
    "button functions": [restart,restart,restart],
    text: "Yay! You have defeated the dragon!!"
  },
  {
    name: "defeat monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [townSquare,townSquare,townSquare],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  }
  
]

// Objects for types of weapons
const weapons = [
  {name: "stick", power: 5},
  {name: "dagger", power: 30},
  {name: "claw hammer", power: 50},
  {name: "sword", power: 100}  
]

// Objects for types of monsters
const monsters = [
  {name: "Slime", level: 2, health: 15},
  {name: "Fanged Beast", level: 8, health: 60},
  {name: "Dragon", level: 20, health: 300}
]

// initial button
button1El.onclick = store
button2El.onclick = cave
button3El.onclick = fightDragon
monsterEl.style.display = "none"
dragonEl.style.display = "none"
slimepicEl.style.display = "none"
fangedEl.style.display = "none"

// function for store
function buyHealth(){
  if (gold > 10) {
    gold -= 10
    goldamtEl.textContent = gold
    health += 10
    healthamtEl.textContent = health
  } else {
    textEl.textContent = "You have no gold left to buy health"
  }
}
function buyWeapon(){
  if (currentWeapon < weapons.length - 1) {
      if (gold > 30) {
      gold -= 30
      goldamtEl.textContent = gold
      currentWeapon ++
      textEl.textContent = "You bought a " + weapons[currentWeapon].name + ". "
      inventory.push(weapons[currentWeapon].name)
      textEl.textContent += "You currently own " + inventory + "."
    } else {
      textEl.textContent = "You have no gold left to buy Weapons"
    }
  } else {
    textEl.textContent = "You already have the most powerful weapon!"
    button2El.textContent = "Sell weapon for 15 gold!"
    button2El.onclick = sellWeapon
  }
}

// function for each location
function townSquare(){
  monsterEl.style.display = "none"
  dragonEl.style.display = "none"
  slimepicEl.style.display = "none"
  fangedEl.style.display = "none"
  update(buttons[0])
}

function store(){
  update(buttons[1])
}
function cave(){
  update(buttons[2])
}
function sellWeapon(){
  if (inventory.length > 1) {
    gold += 15
    goldamtEl.textContent = gold
    let currentWeapon = inventory.shift()
    textEl.textContent = "You sold a " + currentWeapon + ". "
    textEl.textContent += "Now you own " + inventory + "."
  } else {
    textEl.textContent = "You are only left with 1 weapon left!"
  }

}

//function for fighting with beast
function goFight(){
  update(buttons[3])
  monsterEl.style.display = "block";
  monsterHealth = monsters[fighting].health
  monsternameEl.textContent = monsters[fighting].name
  monsterhealthamtEl.textContent = monsterHealth
}
function fightSlime(){
  fighting = 0
  slimepicEl.style.display = "block"
  goFight()
}
function fightBeast(){
  fighting = 1
  fangedEl.style.display = "block"
  goFight()
}
function fightDragon(){
  fighting = 2
  dragonEl.style.display = "block"
  goFight()
}
function attack(){
  textEl.textContent = "The " + monsters[fighting].name + " attacks. "
  textEl.textContent += "You attack it with your " + weapons[currentWeapon].name + "."
  let number = Math.floor(Math.random()*10)
  if (number < 4) {
      health -= (monsters[fighting].level * 5) - (Math.floor(Math.random() * xp))
      textEl.textContent += " You missed."
    } else {
      monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()        * xp) + 1
    }
  monsterhealthamtEl.textContent = monsterHealth
  healthamtEl.textContent = health
  if (health <= 0) {
    lose()
  } else if (monsterHealth <= 0) {
    fighting === 2? win() : defeatMonster()
    }
}

  
function dodge(){
  textEl.textContent = "You dodge the attack from the " + monsters[fighting].name
}

//win or lose
function lose(){
  update(buttons[4])
}
function win(){
  update(buttons[5])
  monsterEl.style.display = "none"
  dragonEl.style.display = "none"
  slimepicEl.style.display = "none"
  fangedEl.style.display = "none"
}
function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7)
  xp += monsters[fighting].level
  goldamtEl.textContent = gold
  xpamtEl.textContent = xp
  update(buttons[6])
  monsterEl.style.display = "none"
  dragonEl.style.display = "none"
  slimepicEl.style.display = "none"
  fangedEl.style.display = "none"
}

// when restarting the game
function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldamtEl.textContent = gold;
  healthamtEl.textContent = health;
  xpamtEl.innerText = xp;
  townSquare();
}



function update(location){
  textEl.textContent = location.text
  button1El.textContent = location["button text"][0]
  button2El.textContent = location["button text"][1]
  button3El.textContent = location["button text"][2]
  button1El.onclick = location["button functions"][0]
  button2El.onclick = location["button functions"][1]
  button3El.onclick = location["button functions"][2]
}














