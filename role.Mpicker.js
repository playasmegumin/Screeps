var B = require('behaviors');

module.exports = {
    run: function(creep){
        const room = creep.room.name;
        const pos = new RoomPosition(Memory.rooms[room].Mineral.x, Memory.rooms[room].Mineral.y, room);

        if(creep.memory.take == undefined) creep.memory.take = 0;
        if(creep.store.getFreeCapacity() == 0) creep.memory.take = 0;
        if(creep.store.getUsedCapacity() == 0) creep.memory.take = 1;
        if(creep.ticksToLive < 120) creep.memory.take = 0;

        if(creep.memory.take){
            if(creep.pos.isNearTo(pos)) B.GetResource(creep, pos, Memory.rooms[room].Mineral.type);
            else creep.moveTo(pos);
        }else{
            if(creep.pos.isNearTo(creep.room.storage)){
                for(var resource in creep.store)
                    creep.transfer(creep.room.storage, resource);
            }else creep.moveTo(creep.room.storage);
        }
    }
};