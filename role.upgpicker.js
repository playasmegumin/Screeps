var B = require('behaviors');

module.exports = {
    run: function(creep){
        const room = creep.room.name;
        const pos = new RoomPosition(Memory.rooms[room].Upgrade.x, Memory.rooms[room].Upgrade.y, room);
        if(B.DetectResource(pos,'energy') > 2000 && room != 'W42N28') return;
        if(creep.store.getUsedCapacity() == 0){
            const pos1 = new RoomPosition(Memory.rooms[room].Source1.x, Memory.rooms[room].Source1.y, room);
            const pos2 = new RoomPosition(Memory.rooms[room].Source2.x, Memory.rooms[room].Source2.y, room);

            var target = pos1;
            if(B.DetectResource(pos1,'energy') < B.DetectResource(pos2,'energy')) target = pos2;
            if(B.DetectResource(target, 'energy') < 100 && Memory.rooms[room].storage) target = creep.room.storage.pos; 

            if(Memory.rooms[room].storage) target = creep.room.storage.pos;

            if(creep.pos.isNearTo(target)) B.GetResource(creep, target, 'energy');
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'},reuse:200});
        }else{
            const pos = new RoomPosition(Memory.rooms[room].Upgrade.x, Memory.rooms[room].Upgrade.y, room);
            if(creep.pos.isNearTo(pos)) creep.transferResource(pos,'energy');
            else creep.moveTo(pos, {visualizePathStyle: {stroke: '#ffff00'},reuse:200});
        }
    }
}

// global.sayHello = function() { console.log('Hello!'); };