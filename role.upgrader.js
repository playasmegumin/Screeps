var B = require('behaviors');

module.exports = {
    run: function(creep){
        const pos1 = new RoomPosition(22,32,'W42N28');
        const pos2 = new RoomPosition(23,31,'W42N28');
        let obj_list = pos2.lookFor("creep");
        if(creep.pos.isEqualTo(pos1) && obj_list.length == 0) creep.move(TOP_RIGHT);
        
        const room = creep.room.name;
        const pos = new RoomPosition(Memory.rooms[room].Upgrade.x, Memory.rooms[room].Upgrade.y, room);
        const closepoint = new RoomPosition(Memory.rooms[room].closepoint.x, Memory.rooms[room].closepoint.y, room);
	    if(creep.store.getUsedCapacity() == 0) {
            if(creep.pos.isNearTo(pos)) B.GetResource(creep, pos, 'energy');
            else creep.moveTo(pos,{visualizePathStyle: {stroke: '#ffffff'},reuse:200});
            if(creep.pos.isEqualTo(pos)) creep.moveTo(closepoint);
        }else{
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(closepoint,{visualizePathStyle: {stroke: '#ffff00'},reuse:200});
        }
    }
};