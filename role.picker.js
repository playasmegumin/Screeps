var B = require('behaviors');
var configR = require('config.room');

module.exports = {
    run: function(creep){
        const room = creep.room.name;
        if(creep.memory.type == undefined) creep.memory.type = 'energy';
        if(Game.flags['pick'] != undefined && creep.store.getUsedCapacity() < 250 && creep.room.name == Game.flags['pick'].room.name){
            const before = creep.store.getUsedCapacity();
            if(creep.pos.isNearTo(Game.flags['pick'])) B.Loot(creep,Game.flags['pick'].pos);
            else creep.moveTo(Game.flags['pick']);
            const after = creep.store.getUsedCapacity();
            return;
        }

        if(creep.store.getUsedCapacity() > creep.store.getUsedCapacity(creep.memory.type)){
            if(creep.pos.isNearTo(creep.room.storage))
                for(var res in creep.store)
                    creep.transfer(creep.room.storage, res);
            else creep.moveTo(creep.room.storage);
            return;
        }

        if(creep.store.getUsedCapacity() < 0.1*creep.store.getCapacity()){
            const pos1 = new RoomPosition(Memory.rooms[room].Source1.x, Memory.rooms[room].Source1.y, room);
            const pos2 = new RoomPosition(Memory.rooms[room].Source2.x, Memory.rooms[room].Source2.y, room);
            const pos3 = new RoomPosition(Memory.rooms[room].Mineral.x, Memory.rooms[room].Mineral.y, room);
            if(creep.memory.type == 'energy'){
                var target = pos1;
                if(B.DetectResource(pos1,'energy') < B.DetectResource(pos2,'energy')) target = pos2;
            }else var target = pos3;
            if(B.DetectResource(target, 'energy') < 100 && Memory.rooms[room].storage) target = creep.room.storage.pos; 
            if(creep.pos.isNearTo(target)) B.GetResource(creep, target, creep.memory.type);
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reuse:200});
        }else{
            var target = Game.getObjectById(creep.memory.target);
            var link = Game.getObjectById(Memory.rooms[room].central_link);
            if(target == null || target.structureType == STRUCTURE_STORAGE || target.store.getFreeCapacity(creep.memory.type) == 0){
                target = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: function(str){ return (
                            str.structureType == STRUCTURE_EXTENSION ||
                            str.structureType == STRUCTURE_SPAWN
                            ) && str.store.getFreeCapacity(creep.memory.type) > 0;
                }});
                if(target == null) target = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: function(str){ return (
                            str.structureType == STRUCTURE_TOWER
                            ) && str.store.getFreeCapacity(creep.memory.type) > 0;
                }});
                if(target == null && link && link.store.getFreeCapacity('energy') > 0) target = link;
                if(target == null && Memory.rooms[room].storage && creep.room.storage.store.getFreeCapacity(creep.memory.type)) target = creep.room.storage;
                if(target == null) target = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: function(str){ return (
                            str.structureType == STRUCTURE_LAB ||
                            str.structureType == STRUCTURE_NUKER
                            ) && str.store.getFreeCapacity(creep.memory.type) > 0;
                }});
                if(target) creep.memory.target = target.id;
                else creep.say('💤');
            }

            if(target == null) return;
            if(creep.pos.isNearTo(target)) creep.transfer(target, creep.memory.type);
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'},reuse:200});
        }
    }
};