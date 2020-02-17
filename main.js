var hr = require('hardcode.room');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var rolePicker = require('role.picker');
var roleOutBuilder = require('role.outBuilder');
var roleOutHarvester = require('role.outHarvester');
var roleOutUpgrader = require('role.outUpgrader');
var roleSrcMiner = require('role.srcminer');
var roleUpgPicker = require('role.upgpicker');
var roleTK = require('role.terminalKeeper');
var roleWK = require('role.wallKeeper');
var roleTowerKeeper = require('role.towerKeeper');
var roleMaintainer = require('role.maintainer');
var roleMPicker = require('role.Mpicker');
var roleMiner = require('role.miner');
var initClear = require('init.Clear');
var struSpawn = require('stru.Spawn');
var struTower = require('stru.Tower');
var deptSrc = require('dept.source');
var aA = require('act.rush');
var aB = require('act.extSrcA');
var aT = require('act.transport');
var Grafana = require('dept.grafana');
var L = require('lab.creep');
var dE = require('dept.explorer');
var ll = require('R3S1');
var r4s1 = require('R4S1');
var B = require('behaviors');
var configR = require('config.room');
var tasks = require('tasks');
var labs = require('dept.labs');
var combat = require('combat');
var BtE = require('act.BtE');
var Visualizer = require('Visualizer');
var test = require('Testing');
require('prototypes');
var express = require('task.express');

console.log('HHHHHHHHHHH You Got Reset AgAIN!');
module.exports.loop = function () {
    //if(Game.rooms['W42N28'].storage.store.getUsedCapacity('energy') > 50000) Memory.rooms['W42N28'].spawnlist.upgpicker.count = 1;
    //else Memory.rooms['W42N28'].spawnlist.upgpicker.count = 0;
    var lab0 = Game.getObjectById("5e371fc6ed9c294f0418d240");
    var lab1 = Game.getObjectById("5e37457eaa99574f84caa14c");
    var lab2 = Game.getObjectById("5e3758866b03923c91e9e877");
    var lab3 = Game.getObjectById("5e37a593edfc9523106ba8e6");
    var lab4 = Game.getObjectById("5e37cf87809e566d536dcb55");
    var lab5 = Game.getObjectById("5e36fcaa51cc18f74cbe8c53");
    var lab6 = Game.getObjectById("5e370e04fcec036c2a72ac82");
    var lab7 = Game.getObjectById("5e37324bfcec03ff3572b7f5");
    var lab8 = Game.getObjectById("5e376e974ef265c2d07117f7");
    var lab9 = Game.getObjectById("5e37842d1bfbaa6d0da2db38");
    var factory = Game.getObjectById('5e03dd3cc6101bb747cc9377');
    var link0 = Game.getObjectById(Memory.rooms['W48N31'].central_link);
    var link1 = Game.getObjectById(Memory.rooms['W48N31'].upgrade_link);
    var link2 = Game.getObjectById(Memory.rooms['W35N28'].central_link);
    var link3 = Game.getObjectById(Memory.rooms['W35N28'].upgrade_link);
    var link4 = Game.getObjectById(Memory.rooms['W34N28'].central_link);
    var link5 = Game.getObjectById(Memory.rooms['W34N28'].upgrade_link);
    var link6 = Game.getObjectById(Memory.rooms['W42N28'].central_link);
    var link7 = Game.getObjectById(Memory.rooms['W42N28'].upgrade_link);
    var link8 = Game.getObjectById(Memory.rooms['W45N41'].central_link);
    var link9 = Game.getObjectById(Memory.rooms['W45N41'].upgrade_link);
    var link10 = Game.getObjectById(Memory.rooms['W49N35'].central_link);
    var link11 = Game.getObjectById(Memory.rooms['W49N35'].upgrade_link);

    link0.transferEnergy(link1);
    link2.transferEnergy(link3);
    link4.transferEnergy(link5);
    //link6.transferEnergy(link7);
    link8.transferEnergy(link9);
    link10.transferEnergy(link11);

    //Global
    if(Game.time%100 == 0) initClear.run();
    if(Game.time%10 == 0) console.log('Game.time == '+Game.time);
    //Init
    deptSrc.run();

    //Spawn Creeps
    if(Game.time%10 == 0)
        for(var i of Memory.list.spawns)
            struSpawn.run(i);
    //ll.run();
    if(Game.time%10 == 5)
        for(var i of Memory.list.rooms){
            var hc = Game.rooms[i].find(FIND_HOSTILE_CREEPS);
            if(hc.length > 0) Memory.rooms[i].hostile = true;
            else Memory.rooms[i].hostile = false;
        }
    
    for(var i of Memory.list.rooms){
        if(Memory.rooms[i].hostile){
            var towers = Game.rooms[i].find(FIND_MY_STRUCTURES,{
                filter: function(str){ return str.structureType == STRUCTURE_TOWER; }
            });
            for(var tower of towers)
                struTower.run(tower);
        }
    }


    //Run Creeps
    for(var name in Game.creeps){
        var tmp = Game.creeps[name];
        if(tmp.spawning) continue;
        if(tmp.memory.role == 'harvester') roleHarvester.run(tmp);
        if(tmp.memory.role == 'builder') roleBuilder.run(tmp);
        if(tmp.memory.role == 'upgrader') roleUpgrader.run(tmp);
        if(tmp.memory.role == 'picker') rolePicker.run(tmp);
        if(tmp.memory.role == 'claimer') roleClaimer.run(tmp);
        if(tmp.memory.role == 'outbuilder') roleOutBuilder.run(tmp);
        if(tmp.memory.role == 'outharvester') roleOutHarvester.run(tmp);
        if(tmp.memory.role == 'outupgrader') roleOutUpgrader.run(tmp);
        if(tmp.memory.role == 'srcminer') roleSrcMiner.run(tmp);
        if(tmp.memory.role == 'upgpicker') roleUpgPicker.run(tmp);
        if(tmp.memory.role == 'miner') roleMiner.run(tmp);
        if(tmp.memory.role == 'me') test.creep(tmp);
        if(tmp.memory.role == 'tk') roleTK.run(tmp);
        if(tmp.memory.role == 'mpicker') roleMPicker.run(tmp);
        if(tmp.memory.role == 'wallkeeper') roleWK.run(tmp);
        if(tmp.memory.role == 'towerKeeper') roleTowerKeeper.run(tmp);
        if(tmp.memory.role == 'maintainer') roleMaintainer.run(tmp);
        if(tmp.memory.role == 'flagBuilder') dE.FlagBuilder(tmp);
        if(tmp.memory.role == 'flagUpgrader') dE.FlagUpgrader(tmp);
        if(tmp.memory.role == 'flagClaimer') dE.FlagClaimer(tmp);
        if(tmp.memory.role == 'ssrcminer') ll.ssrcminer(tmp);
        if(tmp.memory.role == 'ppicker') rolePicker.run(tmp);
        if(tmp.memory.role == 'uupgrader') ll.uupgrader(tmp);
        if(tmp.memory.role == 'bbuilder') ll.bbuilder(tmp);
        if(tmp.memory.role == 'mmaintainer') ll.mmaintainer(tmp);
        if(tmp.memory.role == 'exrusher') ll.exRusher(tmp);
        if(tmp.memory.role == 'mover') combat.mover(tmp);
        if(tmp.memory.role == 'dismantler') combat.dismantler(tmp);
        if(tmp.memory.role == 'unclaimer') combat.unclaimer(tmp);
        if(tmp.memory.role == 'attack') combat.attacker(tmp);
        //if(tmp.memory.role == 'looter') combat.looter(tmp);
        if(tmp.memory.role == 'digger') combat.digger(tmp);
        if(tmp.name == 'MP') tmp.memory.role = 'mpicker';
        tmp.memory.room = tmp.room.name;
    }

    //aB.run();
    if(Game.creeps['LAB']) L.run(Game.creeps['LAB']);

    //if(Game.rooms['W48N31'].storage.store.getUsedCapacity('energy') < 80000 && Memory.creeps['W48N31'].task == null) Memory.creeps['W48N31'].task = 'TtSe';
    //if(Game.rooms['W48N31'].storage.store.getUsedCapacity('energy') >= 80000 && Memory.creeps['W48N31'].task == 'TtSe') Memory.creeps['W48N31'].task = null;
    
    if(Game.creeps['W48N31']){
        var W48N31 = Game.creeps['W48N31'];
        if(W48N31.memory.task == 'StTe') tasks.transport(Game.rooms['W48N31'].storage, Game.rooms['W48N31'].terminal, 'energy', W48N31);
        if(W48N31.memory.task == 'Stl0e') tasks.transport(Game.rooms['W48N31'].storage, link0, 'energy', W48N31);
        if(W48N31.memory.task == 'TtSe') tasks.transport(Game.rooms['W48N31'].terminal, Game.rooms['W48N31'].storage, 'energy', W48N31);
        if(W48N31.memory.task == 'StTO') tasks.transport(Game.rooms['W48N31'].storage, Game.rooms['W48N31'].terminal, 'O', W48N31);
    }else if(Memory.creeps['W48N31'].task) Game.spawns['R4S1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'W48N31');

    const A_res = 'UL';
    const B_res = 'ZK';
    const final_res = 'G';

    //if(Game.rooms['W35N28'].terminal.store.getUsedCapacity('L') < 10000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StTL';
    //if(Game.rooms['W35N28'].terminal.store.getUsedCapacity('L') >= 10000 && Memory.creeps['W35N28'].task == 'StTL') Memory.creeps['W35N28'].task = null;

    if(lab0.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L0tS'+final_res;
    if(lab0.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L0tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab1.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L1tS'+final_res;
    if(lab1.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L1tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab3.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L3tS'+final_res;
    if(lab3.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L3tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab4.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L4tS'+final_res;
    if(lab4.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L4tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab5.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L5tS'+final_res;
    if(lab5.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L5tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab6.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L6tS'+final_res;
    if(lab6.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L6tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab8.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L8tS'+final_res;
    if(lab8.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L8tS'+final_res) Memory.creeps['W35N28'].task = null;
    if(lab9.store.getUsedCapacity(final_res) >  0 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'L9tS'+final_res;
    if(lab9.store.getUsedCapacity(final_res) == 0 && Memory.creeps['W35N28'].task == 'L9tS'+final_res) Memory.creeps['W35N28'].task = null;

    //if((lab2.store.getUsedCapacity(A_res) <  2500) &&Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL2'+A_res;
    //if((lab2.store.getUsedCapacity(A_res) >= 2500) && Memory.creeps['W35N28'].task == 'StL2'+A_res) Memory.creeps['W35N28'].task = null;
    //if((lab7.store.getUsedCapacity(B_res) <  2500) && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StL7'+B_res;
    //if((lab7.store.getUsedCapacity(B_res) >= 2500) && Memory.creeps['W35N28'].task == 'StL7'+B_res) Memory.creeps['W35N28'].task = null;

    
    //if(Game.rooms['W34N28'].terminal.store.getFreeCapacity() == 0 || Game.rooms['W34N28'].terminal.store['O'] >= 100000)
    //    Game.rooms['W34N28'].terminal.send('O',Game.rooms['W34N28'].terminal.store['O'],'W35N28');

    //if(link4.store.getUsedCapacity('energy') < 800 && Memory.creeps['W34N28'].task == null) Memory.creeps['W34N28'].task = 'Stl4e';
    //if(link4.store.getUsedCapacity('energy') == 800 && Memory.creeps['W34N28'].task == 'Stl4e') Memory.creeps['W34N28'].task = null;
    if(Game.rooms['W35N28'].storage.store.getUsedCapacity('energy') >  460906 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StTe';
    if(Game.rooms['W35N28'].storage.store.getUsedCapacity('energy') <= 300000 && Memory.creeps['W35N28'].task == 'StTe') Memory.creeps['W35N28'].task = null;
    if(Game.rooms['W34N28'].storage.store.getUsedCapacity('energy') >  351640 && Memory.creeps['W34N28'].task == null) Memory.creeps['W34N28'].task = 'StTe';
    if(Game.rooms['W34N28'].storage.store.getUsedCapacity('energy') <= 300000 && Memory.creeps['W34N28'].task == 'StTe') Memory.creeps['W34N28'].task = null;
    //if(Game.rooms['W48N31'].storage.store.getUsedCapacity('energy') >  359564 && Memory.creeps['W48N31'].task == null) Memory.creeps['W48N31'].task = 'StTe';
    if(Game.rooms['W48N31'].storage.store.getUsedCapacity('energy') <= 300000 && Memory.creeps['W48N31'].task == 'StTe') Memory.creeps['W48N31'].task = null;
    //if(Game.rooms['W49N35'].storage.store.getUsedCapacity('energy') >  356242 && Memory.creeps['W49N35'].task == null) Memory.creeps['W49N35'].task = 'StTe';
    if(Game.rooms['W49N35'].storage.store.getUsedCapacity('energy') <= 300000 && Memory.creeps['W49N35'].task == 'StTe') Memory.creeps['W49N35'].task = null;
    if(Game.rooms['W35N28'].terminal.store.getUsedCapacity('energy') > 60906) Game.rooms['W35N28'].terminal.send('energy',50000,'W42N28');
    if(Game.rooms['W34N28'].terminal.store.getUsedCapacity('energy') > 51640) Game.rooms['W34N28'].terminal.send('energy',50000,'W35N28');
    if(Game.rooms['W48N31'].terminal.store.getUsedCapacity('energy') > 59064) Game.rooms['W48N31'].terminal.send('energy',50000,'W42N28');
    if(Game.rooms['W49N35'].terminal.store.getUsedCapacity('energy') > 56242) Game.rooms['W49N35'].terminal.send('energy',50000,'W48N31');
    //if((Game.rooms['W35N28'].terminal.store.getUsedCapacity('energy') <  100000 && Game.rooms['W35N28'].storage.store.getUsedCapacity() >  300000) && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StTe';
    //if((Game.rooms['W35N28'].terminal.store.getUsedCapacity('energy') >= 70000 || Game.rooms['W35N28'].storage.store.getUsedCapacity() <= 300000) && Memory.creeps['W35N28'].task == 'StTe') Memory.creeps['W35N28'].task = null;
    //if(Game.rooms['W35N28'].terminal.store.getUsedCapacity('energy') >= 70000) Game.rooms['W35N28'].terminal.send('energy',50000,'W34N28'); 
    //if(Game.rooms['W42N28'].terminal.store.getUsedCapacity('energy') >= 100000) Game.rooms['W42N28'].terminal.send('energy',80000,'W34N28'); 
    if(Game.creeps['W49N35']){
        var W49N35 = Game.creeps['W49N35'];
        if(W49N35.memory.stand && !W49N35.pos.isEqualTo(Game.flags['W49N35_stand'])){
            W49N35.moveTo(Game.flags['W49N35_stand']);
        }else{
            if(W49N35.memory.task == 'StTe') tasks.transport(Game.rooms['W49N35'].storage, Game.rooms['W49N35'].terminal, 'energy', W49N35);
            if(W49N35.memory.task == 'TtSe') tasks.transport(Game.rooms['W49N35'].terminal, Game.rooms['W49N35'].storage, 'energy', W49N35);
        }
    }else if(Memory.creeps['W49N35'].task) Game.spawns['R5S'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'W49N35');
    
    if(Game.creeps['W34N28']){
        var W34N28 = Game.creeps['W34N28'];
        if(W34N28.memory.stand && !W34N28.pos.isEqualTo(Game.flags['StandW34N28'])){
            W34N28.moveTo(Game.flags['StandW34N28']);
        }else{
            if(W34N28.memory.task == 'StTe') tasks.transport(Game.rooms['W34N28'].storage, Game.rooms['W34N28'].terminal, 'energy', W34N28);
            if(W34N28.memory.task == 'Stl4e') tasks.transport(Game.rooms['W34N28'].storage, link4, 'energy', W34N28);
            if(W34N28.memory.task == 'TtSe') tasks.transport(Game.rooms['W34N28'].terminal, Game.rooms['W34N28'].storage, 'energy', W34N28);
            if(W34N28.memory.task == 'StTO') tasks.transport(Game.rooms['W34N28'].storage, Game.rooms['W34N28'].terminal, 'O', W34N28);
        }
    }else if(Memory.creeps['W34N28'].task) Game.spawns['R2S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'W34N28');

    //labs.produce_LO();
    //BtE.run();
    
    if(Game.creeps['W35N28']){
        var W35N28 = Game.creeps['W35N28'];
        if(W35N28.memory.task == 'TtSO') tasks.transport(Game.rooms['W35N28'].terminal, Game.rooms['W35N28'].storage, 'O', W35N28);
        if(W35N28.memory.task == 'TtNG') tasks.transport(Game.rooms['W35N28'].terminal, nuker, 'G', W35N28);
        if(W35N28.memory.task == 'StNe') tasks.transport(Game.rooms['W35N28'].storage, nuker, 'energy', W35N28);
        if(W35N28.memory.task == 'StTe') tasks.transport(Game.rooms['W35N28'].storage, Game.rooms['W35N28'].terminal, 'energy', W35N28);
        if(W35N28.memory.task == 'StTL') tasks.transport(Game.rooms['W35N28'].storage, Game.rooms['W35N28'].terminal, 'L', W35N28);
        if(W35N28.memory.task == 'L0tSLO') tasks.transport(lab0, Game.rooms['W35N28'].storage, 'LO', W35N28);
        if(W35N28.memory.task == 'L2tSLO') tasks.transport(lab2, Game.rooms['W35N28'].storage, 'LO', W35N28);
        if(W35N28.memory.task == 'StL2'+A_res) tasks.transport(Game.rooms['W35N28'].storage, lab2, A_res, W35N28);
        if(W35N28.memory.task == 'StL7'+B_res) tasks.transport(Game.rooms['W35N28'].storage, lab7, B_res, W35N28);
        if(W35N28.memory.task == 'L0tS'+final_res) tasks.transport(lab0, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L1tS'+final_res) tasks.transport(lab1, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L2tS'+final_res) tasks.transport(lab2, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L3tS'+final_res) tasks.transport(lab3, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L4tS'+final_res) tasks.transport(lab4, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L5tS'+final_res) tasks.transport(lab5, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L6tS'+final_res) tasks.transport(lab6, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L7tS'+final_res) tasks.transport(lab7, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L8tS'+final_res) tasks.transport(lab8, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'L9tS'+final_res) tasks.transport(lab9, Game.rooms['W35N28'].storage, final_res, W35N28);
        if(W35N28.memory.task == 'StL1e') tasks.transport(Game.rooms['W35N28'].storage, lab1, 'energy', W35N28);
        if(W35N28.memory.task == 'TtL2H') tasks.transport(Game.rooms['W35N28'].terminal, lab2, 'H', W35N28);
        if(W35N28.memory.task == 'L3tL0LO') tasks.transport(lab3, lab0, 'LO', W35N28);
        if(W35N28.memory.task == 'L0tL8LO') tasks.transport(lab0, lab8, 'LO', W35N28);
        if(W35N28.memory.task == 'TtL7O') tasks.transport(Game.rooms['W35N28'].terminal, lab7, 'O', W35N28);
        if(W35N28.memory.task == 'StL2e') tasks.transport(Game.rooms['W35N28'].storage, lab2, 'energy', W35N28);
        if(W35N28.memory.task == 'StL3e') tasks.transport(Game.rooms['W35N28'].storage, lab3, 'energy', W35N28);
        if(W35N28.memory.task == 'StL4e') tasks.transport(Game.rooms['W35N28'].storage, lab4, 'energy', W35N28);
        if(W35N28.memory.task == 'StL5e') tasks.transport(Game.rooms['W35N28'].storage, lab5, 'energy', W35N28);
        if(W35N28.memory.task == 'StL6e') tasks.transport(Game.rooms['W35N28'].storage, lab6, 'energy', W35N28);
        if(W35N28.memory.task == 'StL7e') tasks.transport(Game.rooms['W35N28'].storage, lab7, 'energy', W35N28);
        if(W35N28.memory.task == 'StL8e') tasks.transport(Game.rooms['W35N28'].storage, lab8, 'energy', W35N28);
        if(W35N28.memory.task == 'StL0L') tasks.transport(Game.rooms['W35N28'].storage, lab0, 'L', W35N28);
        if(W35N28.memory.task == 'StL1O') tasks.transport(Game.rooms['W35N28'].terminal, lab1, 'O', W35N28);
        if(W35N28.memory.task == 'StFB') tasks.transport(Game.rooms['W35N28'].storage, factory, 'battery', W35N28);
        if(W35N28.memory.task == 'L2tL8LO') tasks.transport(lab2, lab8, 'LO', W35N28);
        if(W35N28.memory.task == 'L7tL9LO') tasks.transport(lab7, lab9, 'LO', W35N28);
        if(W35N28.memory.task == 'L0tL2L') tasks.transport(lab0, lab2, 'L', W35N28);
        if(W35N28.memory.task == 'L1tL7O') tasks.transport(lab1, lab7, 'O', W35N28);
        if(W35N28.memory.task == 'L7tSO') tasks.transport(lab7, Game.rooms['W35N28'].storage, 'O', W35N28);
        if(W35N28.memory.task == 'L2tSH'){ tasks.transport(lab2, Game.rooms['W35N28'].storage, 'H', W35N28);  W35N28.say('Wow');}
        if(W35N28.memory.task == 'StL2L') tasks.transport(Game.rooms['W35N28'].storage, lab2, 'L', W35N28);
        if(W35N28.memory.task == 'StL7O') tasks.transport(Game.rooms['W35N28'].terminal, lab7, 'O', W35N28);
    }else if(Memory.creeps['W35N28'].task) Game.spawns['R1S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'W35N28');
    
    //if(Game.rooms['W42N28'].storage.store.getUsedCapacity('energy') >  500000 && Memory.creeps['W42N28'].task == null) Memory.creeps['W42N28'].task = 'StTe';
    //if(Game.rooms['W42N28'].storage.store.getUsedCapacity('energy') <= 200000 && Memory.creeps['W42N28'].task == 'StTe') Memory.creeps['W42N28'].task = null;

    if(Game.creeps['W42N28']){
        var W42N28 = Game.creeps['W42N28'];
        if(W42N28.memory.task == 'StTH') tasks.transport(Game.rooms['W42N28'].storage, Game.rooms['W42N28'].terminal, 'H', W42N28);
        if(W42N28.memory.task == 'Stl6e') tasks.transport(Game.rooms['W42N28'].storage, link6, 'energy', W42N28);
        if(W42N28.memory.task == 'StTe') tasks.transport(Game.rooms['W42N28'].storage, Game.rooms['W42N28'].terminal, 'energy', W42N28);
    }else if(Memory.creeps['W42N28'].task) Game.spawns['R3S1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],'W42N28');
    //if(Game.rooms['W42N28'].terminal.store.getUsedCapacity('energy') > 250000) Game.rooms['W42N28'].terminal.send('energy',200000,'W34N28'); 

    /**
    Game.spawns['R1S2'].spawnCreep([
        MOVE,HEAL],'A',{memory:{role:'healer'}});
    Game.spawns['Ber'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,HEAL, HEAL,HEAL,HEAL,HEAL,HEAL,
        HEAL,HEAL,HEAL,HEAL,HEAL, HEAL,HEAL,HEAL,HEAL,HEAL,
        HEAL,HEAL,HEAL,HEAL,HEAL, HEAL,HEAL,HEAL,HEAL,HEAL],'B');
    Game.spawns['R1S2'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        WORK,WORK,WORK,WORK,WORK, WORK,WORK,WORK,WORK,WORK],'C');
    Game.spawns['R1S3'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, WORK,WORK,WORK,WORK,WORK],'D',{memory:{role:'dismantler'}});
    Game.spawns['R1S2'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE, WORK,WORK,WORK,WORK,WORK,
        WORK,WORK,WORK,WORK,WORK, WORK,WORK,WORK,WORK,WORK,
        WORK,WORK,WORK,WORK,WORK, WORK,WORK,WORK,WORK,WORK],'E');
    Game.spawns['R1S3'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,HEAL, RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,],'F');
    Game.spawns['R1S2'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        RANGE,RANGE,RANGE,RANGE,RANGE, RANGE,RANGE,RANGE,RANGE,RANGE,
        RANGE,RANGE,RANGE,RANGE,RANGE, RANGE,RANGE,RANGE,RANGE,RANGE,],'G');
    Game.spawns['R1S3'].spawnCreep([
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,
        RANGE,RANGE,RANGE,RANGE,RANGE, RANGE,RANGE,RANGE,RANGE,RANGE,
        RANGE,RANGE,RANGE,RANGE,RANGE, RANGE,RANGE,RANGE,RANGE,RANGE,],'H');

    */
    //if(Game.time%1000 == 50) Game.spawns['R1S3'].spawnCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM],'Purple',{memory:{role:'unclaimer'}});
    if(Game.creeps['W35N28wk']) combat.mover(Game.creeps['W35N28wk']);
    //else Game.spawns['R1S2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE, CARRY,CARRY,CARRY,CARRY,CARRY, WORK,WORK,WORK,WORK,WORK],'W35N28wk',{memory:{role:'wallkeeper'}});
    if(Game.creeps['W35N28wk2']) combat.mover(Game.creeps['W35N28wk']);
    //else Game.spawns['R1S2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE, CARRY,CARRY,CARRY,CARRY,CARRY, WORK,WORK,WORK,WORK,WORK],'W35N28wk2',{memory:{role:'wallkeeper'}});
    if(Game.creeps['W34N28wk']) combat.mover(Game.creeps['W34N28wk']);
    if(Game.creeps['W48N31looter']) combat.looter(Game.creeps['W48N31looter']);
    //else Game.spawns['R4S1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'W48N31looter',{memory:{role:'looter'}});
    if(Game.creeps['W48N31looter2']) combat.looter(Game.creeps['W48N31looter2']);
    //else Game.spawns['R4S1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'W48N31looter2',{memory:{role:'looter'}});
    if(Game.creeps['W48N31looter3']) combat.looter(Game.creeps['W48N31looter3']);
    //else Game.spawns['R4S1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'W48N31looter3',{memory:{role:'looter'}});
    //else Game.spawns['R2S2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE, CARRY,CARRY,CARRY,CARRY,CARRY, WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],'W34N28wk',{memory:{role:'wallkeeper'}});
    //combat.teams('A');
    //combat.teams('B');
    //combat.teams('C');
    //combat.teams('D');
    //Visualizer.Visualizer.visuals();
    Game.getObjectById('5e35aa8a083099019e3040ae').processPower();
    //if(Game.rooms['W42N28'].terminal.store.getUsedCapacity('energy') > 250000) Game.rooms['W42N28'].terminal.send('energy',200000,'W34N28');
    //test.room('W35N28');
    lab0.runReaction(lab2,lab7);
    lab1.runReaction(lab2,lab7);
    lab3.runReaction(lab2,lab7);
    lab4.runReaction(lab2,lab7);
    lab5.runReaction(lab2,lab7);
    lab6.runReaction(lab2,lab7);
    lab8.runReaction(lab2,lab7);
    lab9.runReaction(lab2,lab7);

    for(let room of Memory.list.rooms){
        Grafana.run(room);
    }

    express.showTask('W35N28');
    //test.room('W35N28');
    //if(Game.spawns['R3S1'].room.energyAvailable > 2000) Game.spawns['R3S1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],Game.time,{memory:{role:'looter'}});
};
//var Nuker = Game.getObjectById('5e1f1f8b8e7f2e3072814d7d'); Nuker.launchNuke(Game.flags['Nuker']);

/*
var nuker = Game.getObjectById('5e1f1f8b8e7f2e3072814d7d');
if(nuker.store['G'] < 5000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'TtNG';
if(nuker.store['G'] >= 5000 && Memory.creeps['W35N28'].task == 'TtNG') Memory.creeps['W35N28'].task = null;
if(nuker.store['energy'] < 300000 && Memory.creeps['W35N28'].task == null) Memory.creeps['W35N28'].task = 'StNe';
if(nuker.store['energy'] == 300000 && Memory.creeps['W35N28'].task == 'StNe') Memory.creeps['W35N28'].task = null;
Game.spawns['R4S1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE,MOVE],'S',{memory:{role:'digger'}});
*/

/*
require('task.express').pushTask('W35N28','5e03dd3cc6101bb747cc9377','5e1f1f8b8e7f2e3072814d7d','energy',250);
require('task.express').pushTask('W35N28','5dbbb8ec519fd03f96e156f5','5e35aa8a083099019e3040ae','energy',4925);
require('task.express').pushTask('W35N28','5dbbb8ec519fd03f96e156f5','5e35aa8a083099019e3040ae','power',300);
require('task.express').pushTask('W35N28','5dbbb8ec519fd03f96e156f5','5e1f1f8b8e7f2e3072814d7d','energy',125);
*/