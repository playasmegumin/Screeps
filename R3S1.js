var WK = require('role.wallKeeper');
var B = require('behaviors');
var r4s1 = require('R4S1');

module.exports = {
    run: function(){
        if(Game.spawns['R3S1'].spawning) return; 

        var pp = Game.rooms['W42N28'].find(FIND_MY_CREEPS, {
            filter: function(c){ return c.memory.role == 'ppicker'; }
        });
        var ssm = Game.rooms['W42N28'].find(FIND_MY_CREEPS, {
            filter: function(c){ return c.memory.role == 'ssrcminer'; }
        });
        var cs = Game.rooms['W42N28'].find(FIND_CONSTRUCTION_SITES);
        var bb = Game.rooms['W42N28'].find(FIND_MY_CREEPS, {
            filter: function(c){ return c.memory.role == 'bbuilder'; }
        });
        var mm = Game.rooms['W42N28'].find(FIND_MY_CREEPS, {
            filter: function(c){ return c.memory.role == 'mmaintainer'; }
        });
        var uu = Game.rooms['W42N28'].find(FIND_MY_CREEPS, {
            filter: function(c){ return c.memory.role == 'uupgrader'; }
        });

        if(pp.length+ssm.length+bb.length+mm.length+uu.length == 0){
            Game.spawns['R3S1'].spawnCreep([WORK,MOVE],name,{memory:{role:'ssrcmineer'}});
        }

        if(pp.length < 1){
            var name = 'ppic '+Game.time%233;
            Game.spawns['R3S1'].spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],name,{memory:{role:'ppicker'}});
            return;
        }

        
        if(ssm.length < 2){
            var name = 'ssrc '+Game.time%233;
            Game.spawns['R3S1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE],name,{memory:{role:'ssrcminer'}});
            return;
        }

        
        if(bb.length < 1 && cs.length){
            var name = 'bbui '+Game.time%233;
            Game.spawns['R3S1'].spawnCreep([WORK,WORK,MOVE,CARRY],name,{memory:{role:'bbuilder'}});
            return;
        }

        
        if(mm.length < 1){
            var name = 'mmai '+Game.time%233;
            Game.spawns['R3S1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE],name,{memory:{role:'mmaintainer'}});
            return;
        }

        
        if(uu.length < 3){
            var name = 'uupg '+Game.time%233;
            Game.spawns['R3S1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],name,{memory:{role:'uupgrader'}});
            return;
        }
    },
    ssrcminer: function(creep){
        if(creep.memory.ready == undefined) creep.memory.ready = 0;
        if(creep.memory.src == undefined){
            var src = creep.pos.findClosestByPath(FIND_SOURCES);
            creep.memory.src = src.id;
        }
        if(creep.memory.ready){
            var src = Game.getObjectById(creep.memory.src);
            creep.harvest(src);
            creep.drop('energy');
        }else{
            var src = Game.getObjectById(creep.memory.src);
            if(creep.pos.isNearTo(src)) creep.memory.ready = 1;
            else creep.moveTo(src,{reuse:100});
        }
    },
    ppicker: function(creep){
        if(creep.store.getUsedCapacity() == 0) creep.memory.take = 1;
        else creep.memory.take = 0;

        if(creep.memory.take){
            var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,{
                filter: function(fdr){ return fdr.energy > 200; }
            });
            if(!target) target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,{
                filter: function(fdr){return fdr.energy > 200;}
            });
            if(!target){
                target = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: function(s){ return s.structureType == STRUCTURE_CONTAINER && s.store.getUsedCapacity()>200; }
                });
                if(creep.pos.isNearTo(target)) B.GetResource(creep, target.pos, 'energy');
                else creep.moveTo(target,{reuse:100});
            }else{
                if(creep.pos.isNearTo(target)) creep.pickup(target);
                else creep.moveTo(target,{reuse:100});
            }
        }else{
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( 
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(!target) target = creep.room.storage;


            if(creep.pos.isNearTo(target)) creep.transfer(target,'energy');
            else creep.moveTo(target);
        }
    },
    uupgrader: function(creep){
        if(creep.room.name == 'W48N31'){
            r4s1.uupgrader(creep);
            return;
        }
        creep.say('hello');
        if(creep.store.getUsedCapacity() == 0) creep.memory.upgrade = 0;
        if(creep.store.getFreeCapacity() == 0) creep.memory.upgrade = 1;

        if(creep.memory.upgrade){
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
        }else{
            var target = creep.room.storage;
            if(creep.pos.isNearTo(target)) B.GetResource(creep, target.pos, 'energy');
            else creep.moveTo(target);
        }
    },
    bbuilder: function(creep){
        if(creep.room.name == 'W48N31'){
            r4s1.bbuilder(creep);
            return;
        }
        if(creep.store.getUsedCapacity() == 0) creep.memory.build = 0;
        if(creep.store.getFreeCapacity() == 0) creep.memory.build = 1;

        if(creep.memory.build){
            if(Game.getObjectById(creep.memory.cs) == null){
                var tmp = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(tmp) creep.memory.cs = tmp.id;
            }
            var cs = Game.getObjectById(creep.memory.cs);
            if(!cs) return;

            if(creep.pos.inRangeTo(cs,3)) creep.build(cs);
            else creep.moveTo(cs,{reuse:200});
        }else{
            var target = creep.room.storage;
            if(creep.pos.isNearTo(target)) B.GetResource(creep, target.pos, 'energy');
            else creep.moveTo(target,{reuse:100});
        }
    },
    mmaintainer: function(creep){
        if(creep.memory.target == undefined) creep.memory.target = 0;
        var target = Game.getObjectById(creep.memory.target);
      	if(creep.memory.target == 0 || target == null){
            var tmptarget = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: function(s){
                    return (s.structureType != STRUCTURE_WALL &&
                            s.structureType != STRUCTURE_RAMPART) &&
                            s.hits < 0.9*s.hitsMax;
                }
            });
            if(tmptarget != null) creep.memory.target = tmptarget.id;
            else creep.memory.target = 0;
            return;
        }

        target = Game.getObjectById(creep.memory.target);
        if(target.hits == target.hitsMax){
            creep.memory.target = 0;
            WK.run(creep);
            return;
        }

        //正式开工
        if(creep.store.getUsedCapacity() == 0){
            var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(creep.pos.isNearTo(target)) creep.pickup(target);
            else creep.moveTo(target);
        }else{
            creep.say('move on!');
            if(creep.pos.inRangeTo(target,3)) creep.repair(target);
            else creep.moveTo(target,{reuse:100});
        }
    },
    exRusher: function(creep){
        creep.say('hello');
        if(creep.store.getUsedCapacity() == 0) creep.memory.upgrade = 0;
        if(creep.store.getFreeCapacity() == 0) creep.memory.upgrade = 1;

        if(creep.memory.upgrade){
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);
        }else{
            var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,{
                filter: function(fdr){ return fdr.energy > 500; }
            });
            if(creep.pos.isNearTo(target)) creep.pickup(target);
            else creep.moveTo(target);
        }
    }
};