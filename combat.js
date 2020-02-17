'use strict'

var labs = require('dept.labs');
var B = require('behaviors');

module.exports = {
    healer: function(creep){
        if(!creep.memory.boost && creep.hits > 500){
           if(labs.boostLO(4, creep) == 0) creep.memory.boost = true;
           return;
        }

        if(Memory.combat.command == 'stay0' && Game.flags['stay0 '+creep.name]){
            const pos = Game.flags['stay0 '+creep.name].pos;
            if(!creep.pos.isEqualTo(pos)) creep.moveTo(pos, {visualizePathStyle: {stroke: '#008000'},reuse:200});
        }

        if(Memory.combat.command == 'stay1' && Game.flags['stay1 '+creep.name]){
            const pos = Game.flags['stay1 '+creep.name].pos;
            if(!creep.pos.isEqualTo(pos)) creep.moveTo(pos, {visualizePathStyle: {stroke: '#008000'},reuse:200});
        }

        if(Memory.combat.command == 'swing_R'){
            if(creep.hits < 3000) creep.moveTo(Game.flags['stay0 '+creep.name]);
            else if(creep.hits == creep.hitsMax) creep.moveTo(Game.flags['stay1 '+creep.name]);
        }

        if(creep.memory.target == undefined) creep.memory.target = creep.name;
        if(creep.memory.pal == undefined)
            if(creep.name == 'A') creep.memory.pal = 'B';
            else if(creep.name == 'B') creep.memory.pal = 'A';
            else if(creep.name == 'C') creep.memory.pal = 'D';
            else if(creep.name == 'D') creep.memory.pal = 'C';
        var pal = Game.creeps[creep.memory.pal];
        if(pal && pal.hits < pal.hitsMax && creep.pos.isNearTo(pal)) creep.memory.target = pal.name;
        else creep.memory.target = creep.name;
        if(pal && pal.hits > creep.hits) creep.memory.target = creep.name;

        if(Memory.combat.command == 'self') creep.memory.target = creep.name;

        var target = Game.creeps[creep.memory.target];
        if(target) creep.heal(target);
    },
    dismantler: function(creep){
        if(Game.flags[creep.name]){
            if(!creep.pos.isEqualTo(Game.flags[creep.name])) creep.moveTo(Game.flags[creep.name]);
            return;
        }

        if(Game.flags['d-1']){
            if(!creep.pos.isNearTo(Game.flags['d-1'])) creep.moveTo(Game.flags['d-1'],{visualizePathStyle: {stroke: '#FFA07A'},reuse:200});

        }else if(Game.flags['d0']){
            if(creep.pos.isNearTo(Game.flags['d0'])){
                var target = Game.getObjectById(creep.memory.target);
                if(target && creep.pos.isNearTo(target)) creep.dismantle(target);
                else{
                    var obj_list = Game.flags['d0'].pos.lookFor(LOOK_STRUCTURES);
                    if(obj_list.length > 0) target = obj_list[0], creep.memory.target = target.id;
                    else target = null;
                }
            }else creep.moveTo(Game.flags['d0'],{visualizePathStyle: {stroke: '#FFA07A'},reuse:200});

        }else if(Game.flags['d1']){
            if(creep.pos.isNearTo(Game.flags['d1'])){
                var target = Game.getObjectById(creep.memory.target);
                if(target && creep.pos.isNearTo(target)) creep.dismantle(target);
                else{
                    var obj_list = Game.flags['d1'].pos.lookFor(LOOK_STRUCTURES);
                    if(obj_list.length > 0) target = obj_list[0], creep.memory.target = target.id;
                    else target = null;
                }
            }else creep.moveTo(Game.flags['d1'],{visualizePathStyle: {stroke: '#FFA07A'},reuse:200});
        }else{
            var target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
                filter: function(s){ return s.structureType != STRUCTURE_STORAGE; }
            });
            if(creep.pos.isNearTo(target)) creep.dismantle(target);
            else creep.moveTo(target);
        }creep.rangedMassAttack();
    },
    attacker: function(creep){
        if(creep.getActiveBodyparts(ATTACK) <= 2) creep.memory.heal = 1;
        if(creep.hitsMax-creep.hits < 100) creep.memory.heal = 0;

        if(creep.memory.heal){
            if(!creep.pos.isEqualTo(Game.flags['Heal'])) creep.moveTo(Game.flags['Heal'],{visualizePathStyle:{stroke:"#FFFFFF"},reusePath:100});
            else{
                let T1 = Game.getObjectById('5e21ef8b2143f1a5e3451d4b');
                let T2 = Game.getObjectById('5e2bc71393430751ff5bc928');
                T1.heal(creep);
                T2.heal(creep);
            }
        }else{
            if(Game.flags['Attack']){
                if(creep.pos.isNearTo(Game.flags['Attack'])) {
                    let target = Game.getObjectById(creep.memory.target);
                    if(target == null){
                        let obj_list = Game.flags['Attack'].pos.lookFor("structure");
                        if(obj_list.length > 0) target = obj_list[0],creep.memory.target = target.id;
                    }else if(creep.getActiveBodyparts(ATTACK) > 2) creep.attack(target);
                }else creep.moveTo(Game.flags['Attack'],{visualizePathStyle:{stroke:"#FFFFFF"},reusePath:5});
            }
        }
    },
    mover: function(creep){
        creep.notifyWhenAttacked(false);
        if(creep.name == 'W37N27' && !creep.memory.tmp){
            if(creep.pos.isEqualTo(Game.flags['tmp'])) creep.memory.tmp = true;
            else creep.moveTo(Game.flags['tmp']);
            return 0;
        }
        if(Game.flags[creep.name] && creep.pos.isEqualTo(Game.flags[creep.name])) creep.memory.arrive = true;
        if(!creep.memory.arrive) creep.moveTo(Game.flags[creep.name]);
        else{
            var target = Game.getObjectById(creep.memory.target);
            if(target == null){
                target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(target) creep.memory.target = target.id;
                else{
                    creep.say("💤");
                    return;
                }
            }
            if(!creep.pos.isEqualTo(target)) creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reuse:200});
        }
    },
    looter: function(creep){
        if(creep.memory.target){
            var target = Game.getObjectById(creep.memory.target);
            target.pos.createFlag('Loot');
            creep.memory.target = null;
        }
        if(creep.ticksToLive < 200) creep.memory.back = 1;
        if(creep.store.getUsedCapacity() >  0) creep.memory.back = 1;
        if(creep.store.getUsedCapacity() == 0) creep.memory.back = 0;

        if(creep.memory.back){
            if(creep.pos.isNearTo(Game.flags['Loot_back'])) creep.transfer(creep.room.storage, 'X');
            else creep.moveTo(Game.flags['Loot_back'], {visualizePathStyle:{stroke:'#ffffff'},reuse:2000});
        }else{
            if(creep.pos.isNearTo(Game.flags['Loot'])){
                B.GetResource(creep,Game.flags['Loot'].pos,'X');
                if(B.DetectResource(Game.flags['Loot'].pos, 'X') == 0){
                    var target = Game.flags['Loot'].pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{
                        filter: function(str){
                            return str.store && str.store.getUsedCapacity('X') > 0 && str.structureType != STRUCTURE_NUKER;
                        }
                    });
                    if(target){
                        creep.memory.target = target.id;
                        Game.flags['Loot'].remove();
                    };
                }
            }else creep.moveTo(Game.flags['Loot'], {visualizePathStyle:{stroke:'#ffffff'},reuse:2000});
        }
    },
    unclaimer: function(creep){
        creep.notifyWhenAttacked(false);
        if(creep.pos.isNearTo(Game.flags['Unclaim'])) creep.attackController(creep.room.controller);
        else creep.moveTo(Game.flags['Unclaim'],{visualizePathStyle:{stroke:'#9370DB'},reuse:200});
    },
    teams: function(teamname){
        let Attacker = Game.creeps[teamname+' 0'];
        let Healer1 = Game.creeps[teamname+' 1'];
        let Healer2 = Game.creeps[teamname+' 2'];
        let Healer3 = Game.creeps[teamname+' 3'];
        if(Memory.teams[teamname] == undefined) Memory.teams[teamname] = {command:'stay'};
        if(Memory.teams[teamname].command == 'stay' && Game.flags[teamname] && Attacker && !Attacker.spawning && Healer1 && !Healer1.spawning && Healer2 && !Healer2.spawning && Healer3 && !Healer3.spawning) Memory.teams[teamname].command = 'Go';
        else if(Memory.teams[teamname].command == 'stay' && Game.flags[teamname]) return;
        let command = Memory.teams[teamname].command;

        if(command == 'Go'){
            if(Attacker.pos.isEqualTo(Game.flags[teamname])){
                var pb = Attacker.pos.findInRange(FIND_STRUCTURES,1,{filter:{structureType:"powerBank"}});
                if(pb.length){
                    Memory.teams[teamname].target = {id:pb[0].id, x:pb[0].pos.x, y:pb[0].pos.y, roomName:pb[0].pos.roomName};
                    Memory.teams[teamname].command = 'Work'
                }else Memory.teams[teamname].target = null;
                if(Healer1 && !Healer1.pos.isNearTo(Game.flags[teamname])) Healer1.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#7CFC00'}});
                if(Healer2 && !Healer2.pos.isNearTo(Game.flags[teamname])) Healer2.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#7CFC00'}});
                if(Healer3 && !Healer3.pos.isNearTo(Game.flags[teamname])) Healer3.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#7CFC00'}});
            }else Attacker.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#FA8072'},reusePath:20});
            
            if(Healer1 && !Healer1.pos.inRangeTo(Game.flags[teamname],3)) Healer1.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#7CFC00'},reusePath:20});
            if(Healer2 && !Healer2.pos.inRangeTo(Game.flags[teamname],3)) Healer2.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#7CFC00'},reusePath:20});
            if(Healer3 && !Healer3.pos.inRangeTo(Game.flags[teamname],3)) Healer3.moveTo(Game.flags[teamname],{visualizePathStyle:{stroke:'#7CFC00'},reusePath:20});
        }

        if(command == 'Work'){
            let count = 0;
            if(Healer1 && Healer1.pos.isNearTo(Attacker)) count++;
            else if(Healer1) Healer1.moveTo(Attacker);
            if(Healer2 && Healer2.pos.isNearTo(Attacker)) count++;
            else if(Healer2) Healer2.moveTo(Attacker);
            if(Healer3 && Healer3.pos.isNearTo(Attacker)) count++;
            else if(Healer3) Healer3.moveTo(Attacker);
            if(count == 3){
                let target = Game.getObjectById(Memory.teams[teamname].target.id);
                Attacker.attack(target);
                Healer1.heal(Attacker);
                Healer2.heal(Attacker);
                Healer3.heal(Attacker);
            }
        }
    },
    digger: function(creep){
        creep.memory.limit = 200;
        if(creep.name == 'S') creep.memory.limit = 150;
        if(creep.name == 'T') creep.memory.limit = 120;
        if(creep.name == 'U') creep.memory.limit = 250;
        if(creep.name == 'V') creep.memory.limit = 120;
        if(creep.name == 'W') creep.memory.limit = 150;
        if(creep.name == 'X') creep.memory.limit = 150;
        if(creep.name == 'Y') creep.memory.limit = 120;
        if(creep.store.getFreeCapacity() == 0 || creep.ticksToLive < creep.memory.limit) creep.memory.back = 0;
        else if(creep.store.getUsedCapacity() == 0) creep.memory.back = 1;

        if(creep.memory.back){
            if(creep.pos.isNearTo(Game.flags[creep.name])){
                let obj_list = Game.flags[creep.name].pos.lookFor("deposit");
                creep.harvest(obj_list[0]);
            }else creep.moveTo(Game.flags[creep.name],{visualizePathStyle:{stroke:"#FFFFFF"},reusePath:200});
        }else{
            if(creep.pos.isNearTo(Game.flags[creep.name+'_Back'])) creep.transfer(creep.room.storage, 'silicon');
            else creep.moveTo(Game.flags[creep.name+'_Back'],{visualizePathStyle:{stroke:'#FFFFFF'},reusePath:200});
        }
    }
};
/*
Game.spawns['Ber'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],'D 0');
Game.spawns['Ber'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL],'D 1');
Game.spawns['R1S2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL],'D 2');
Game.spawns['R1S3'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL],'D 3');
*/
/*
Game.spawns['R4S1'].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'w12w1o1123',{memory:{role:'attack'}});
                                */