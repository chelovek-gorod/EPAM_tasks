"use strict";

class Entity {
    constructor(name) {
        this.name = name;
    }
}

class Stuff extends Entity {
    constructor(name) {
        super(name);
        this.box = null;
    }
}

class Box extends Entity {
    constructor(name) {
        super(name);
        this.stuff = [];
        this.owner = null;
    }

    addStuff(stuff) {
        if (stuff.box) stuff.box.removeStuff(stuff);
        let index = this.stuff.indexOf(stuff);
        if (!~index) {
            this.stuff.push(stuff);
            stuff.box = this;
        }
    }

    removeStuff(stuff) {
        let index = this.stuff.indexOf(stuff);
        if (~index) {
            this.stuff.splice(index, 1);
            stuff.box = null;
        }
    }
}

class User extends Entity {
    constructor(name) {
        super(name);
        this.box = null;
    }

    addBox(box) {
        if (this.box) {
            this.removeBox(this.box);
        }
        let previousUser = box.owner;
        if (previousUser) previousUser.box = null;
        box.owner = this;
        this.box = box;
    }

    removeBox(box) {
        if (this.box) {
            box.owner = null;
            this.box = null;
        }
    }
}

const usersArr = new Array(3);
const usersArrLength = usersArr.length;
for (let i = 0; i < usersArrLength; i++) {
    usersArr[i] = new User(`user${i + 1}`);
}

const boxesArr = new Array(4);
const boxesArrLength = boxesArr.length;
for (let i = 0; i < boxesArrLength; i++) {
    boxesArr[i] = new Box(`box${i + 1}`);
}

const stuffsArr = new Array(5);
const stuffsArrLength = stuffsArr.length;
for (let i = 0; i < stuffsArrLength; i++) {
    stuffsArr[i] = new Stuff(`stuff${i + 1}`);
}

/********************************/

const bookmark = {
    open: 'boxes',
    boxes: document.getElementById('boxes-bookmark'),
    stuffs: document.getElementById('stuffs-bookmark'),
    boxesBar: document.getElementById('boxes-bar'),
    stuffsBar: document.getElementById('stuffs-bar')
};

function clickBookmark(type) {
    if (type !== bookmark.open) {
        bookmark[bookmark.open].classList.add('bookmark-hover');
        bookmark[bookmark.open+'Bar'].classList.remove('bar-open');
        bookmark.open = type;
        bookmark[bookmark.open].classList.remove('bookmark-hover');
        bookmark[bookmark.open+'Bar'].classList.add('bar-open');
        if (selectedSlot) {
            document.getElementById(selectedSlot).classList.remove('selected');
            selectedSlot = '';
        }
        buttons.reset();
    }
}

let selectedSlot = '';

function clickSlot(slot) {
    if (selectedSlot !== slot.id) {
        if (selectedSlot) document.getElementById(selectedSlot).classList.remove('selected');
        selectedSlot = slot.id;
        document.getElementById(selectedSlot).classList.add('selected');
    } else {
        document.getElementById(selectedSlot).classList.remove('selected');
        selectedSlot = '';
    }
    if (selectedSlot) buttons.update(slot);
}

const buttons = {
    btnSetUser: document.getElementById('btnSetUser'),
    btnUnsetUser: document.getElementById('btnSetUser'),
    btnPutInBox: document.getElementById('btnPutInBox'),
    btnOutputFromBox: document.getElementById('btnOutputFromBox'),
    update: function(div) {
        this.reset();
        let active = parseDivId(div.id);
        if (active.type === 'box') {
            btnSetUser.classList.add('clickable');
            if (boxesArr[active.number-1].owner) btnUnsetUser.classList.add('clickable');
        }
        if (active.type === 'stuff') {
            btnPutInBox.classList.add('clickable');
            if (stuffsArr[active.number-1].box) btnOutputFromBox.classList.add('clickable');
        }
    },
    reset: function() {
        [btnSetUser, btnUnsetUser, btnPutInBox, btnOutputFromBox]
            .forEach(btn => btn.classList.remove('clickable'))
    }
};

function parseDivId(id) {
    let end = id.length-4;
    return {
        type: id.substr(0, end),
        number: +id[end]
    };
}

function btnOnclick(btn) {
    if(btn.classList.contains('clickable')) {
        let active = parseDivId(selectedSlot);
        let id = '';
        let title = '';
        let box, user, stuff;
        switch(btn.id) {
            case 'btnSetUser' :
                id = 'usersDiv';
                title = `New <b>USER</b> for <b>BOX ${active.number}</b>`;
                shell.show(id, title);
                break;
            case 'btnUnsetUser' :
                box = boxesArr[active.number-1];
                user = box.owner;
                user.removeBox(box);
                resetUI();
                break;
            case 'btnPutInBox' :
                id = 'boxesDiv';
                title = `New <b>BOX</b> for <b>STUFF ${active.number}</b>`;
                shell.show(id, title);
                break;
            case 'btnOutputFromBox' :
                stuff = stuffsArr[active.number-1];
                box = stuff.box;
                box.removeStuff(stuff);
                resetUI();
                break;
        }
    }
}

function resetUI() {
    updateUI();
    document.getElementById(selectedSlot).classList.remove('selected');
    selectedSlot = '';
    buttons.reset();
}

function updateUI() {
    usersArr.forEach((i) => updateUsersUI(i));
    boxesArr.forEach((i) => updateBoxesUI(i));
    stuffsArr.forEach((i) => updateStuffsUI(i));
}

const shell = {
    activ: false,
    div: document.getElementById('shell'),
    title: document.getElementById('shell-Title'),
    boxesDiv: document.getElementById('boxesShell'),
    usersDiv: document.getElementById('usersShell'),
    show: function(id, title) {
        this.activ = true;
        this.div.style.display = 'block';
        this.title.innerHTML = title;
        this[id].style.display = 'block';
        setTimeout(() => this.div.classList.add('shell-show'),10);
    },
    hide: function() {
        this.div.classList.remove('shell-show');
        setTimeout(() => {
            this.div.style.display = 'none';
            this.boxesDiv.style.display = 'none';
            this.usersDiv.style.display = 'none';
        }, 600);
    }
}

function cancelShell() {
    if (shell.activ) {
        shell.activ = false;
        shell.hide();
    }
}

function clickShell(id) {
    if (shell.activ) {
        shell.activ = false;
        let active = parseDivId(selectedSlot);
        let selected = parseDivId(id);
        if (active.type === 'box') {
            let user = usersArr[selected.number-1];
            let box = boxesArr[active.number-1];
            user.addBox(box);
        }
        if (active.type === 'stuff') {
            let box = boxesArr[selected.number-1];
            let stuff = stuffsArr[active.number-1];
            box.addStuff(stuff);
        }
        resetUI();
        shell.hide();
    }
}

function updateUsersUI(i) {
    if (i.box) {
        document.getElementById(i.name + 'BoxImg').classList.remove('hide-img');
        document.getElementById(i.name + 'BoxText').innerHTML = 'with BOX ' + i.box.name.match(/\d+/)[0];
        if (i.box.stuff.length)  document.getElementById(i.name + 'StuffImg').classList.remove('hide-img');
        else document.getElementById(i.name + 'StuffImg').classList.add('hide-img');
        document.getElementById(i.name + 'StuffText').innerHTML = 'box stuff size = ' + i.box.stuff.length;
    } else {
        document.getElementById(i.name + 'BoxImg').classList.add('hide-img');
        document.getElementById(i.name + 'BoxText').innerHTML = 'no box';
        document.getElementById(i.name + 'StuffImg').classList.add('hide-img');
        document.getElementById(i.name + 'StuffText').innerHTML = '';
    }
}

function updateBoxesUI(i) {
    if (i.stuff.length) {
        document.getElementById(i.name + 'StuffImg').classList.remove('hide-img');
        document.getElementById(i.name + 'StuffText').innerHTML = 'stuff in = ' + i.stuff.length;
    } else {
        document.getElementById(i.name + 'StuffImg').classList.add('hide-img');
        document.getElementById(i.name + 'StuffText').innerHTML = 'stuff empty';
    }
    if (i.owner) {
        document.getElementById(i.name + 'UserImg').classList.remove('hide-img');
        document.getElementById(i.name + 'UserText').innerHTML = 'USER ' + i.owner.name.match(/\d+/)[0];
    } else {
        document.getElementById(i.name + 'UserImg').classList.add('hide-img');
        document.getElementById(i.name + 'UserText').innerHTML = 'no user';
    }
}

function updateStuffsUI(i) {
    if (i.box) {
        document.getElementById(i.name + 'BoxImg').classList.remove('hide-img');
        document.getElementById(i.name + 'BoxText').innerHTML = 'BOX ' + i.box.name.match(/\d+/)[0];
        if (i.box.owner) {
            document.getElementById(i.name + 'UserImg').classList.remove('hide-img');
            document.getElementById(i.name + 'UserText').innerHTML = 'USER ' + i.box.owner.name.match(/\d+/)[0];
        } else {
            document.getElementById(i.name + 'UserImg').classList.add('hide-img');
            document.getElementById(i.name + 'UserText').innerHTML = 'no user';
        }
    } else {
        document.getElementById(i.name + 'BoxImg').classList.add('hide-img');
        document.getElementById(i.name + 'BoxText').innerHTML = 'no box';
        document.getElementById(i.name + 'UserImg').classList.add('hide-img');
        document.getElementById(i.name + 'UserText').innerHTML = 'no user';
    }
}
