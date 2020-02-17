var B = require('behaviors');

module.exports = {
    run: function(creep){
        const room = creep.room.name;
        if(creep.ticksToLive < 100){
            if(creep.pos.isNearTo(creep.room.storage)) creep.transfer(creep.room.storage, RESOURCE_ENERGY);
            else creep.moveTo(creep.room.storage);
            return;
        }

        if(creep.memory.target == undefined) creep.memory.target = 0;
        var target = Game.getObjectById(creep.memory.target);
      	if(creep.memory.target == 0 || target == null){
            var tmptarget = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: function(s){
                    return ((s.structureType != STRUCTURE_WALL &&
                            s.structureType != STRUCTURE_RAMPART) &&
                            s.hits < 0.9*s.hitsMax);
                }
            });
            if(tmptarget != null) creep.memory.target = tmptarget.id;
            else creep.memory.target = 0;
            return;
        }

        target = Game.getObjectById(creep.memory.target);
        if(target.hits == target.hitsMax){
            creep.memory.target = 0;
            return;
        }

        //正式开工
        if(creep.store.getUsedCapacity() == 0){
            const pos1 = new RoomPosition(Memory.rooms[room].Source1.x, Memory.rooms[room].Source1.y, room);
            const pos2 = new RoomPosition(Memory.rooms[room].Source2.x, Memory.rooms[room].Source2.y, room);
            const pos3 = new RoomPosition(Memory.rooms[room].Mineral.x, Memory.rooms[room].Mineral.y, room);
            var target = pos1;
            if(B.DetectResource(pos1,'energy') < B.DetectResource(pos2,'energy')) target = pos2;
            if(Memory.rooms[room].storage) target = creep.room.storage.pos; 
            if(creep.pos.isNearTo(target)) B.GetResource(creep, target, 'energy');
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reuse:200});
        }else{
            creep.say('move on!');
            if(creep.pos.inRangeTo(target,3)) creep.repair(target);
            else creep.moveTo(target);
        }
    }
};