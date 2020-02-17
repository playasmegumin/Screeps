module.exports = {
    run: function(creep){
        if(creep.memory.src == undefined){ // ReInit
            if(Memory.rooms[creep.room.name].Source1.creep == null || !Game.creeps[Memory.rooms[creep.room.name].Source1.creep] || Memory.rooms[creep.room.name].Source1.creep == creep.name)
                Memory.rooms[creep.room.name].Source1.creep = creep.name, creep.memory.src = 'Source1';
            else if(Memory.rooms[creep.room.name].Source2.creep == null || !Game.creeps[Memory.rooms[creep.room.name].Source2.creep] || Memory.rooms[creep.room.name].Source2.creep == creep.name)
                Memory.rooms[creep.room.name].Source2.creep = creep.name, creep.memory.src = 'Source2';
            else if(Memory.rooms[creep.room.name].Mineral.active && (Memory.rooms[creep.room.name].Mineral.creep == null || !Game.creeps[Memory.rooms[creep.room.name].Mineral.creep] || Memory.rooms[creep.room.name].Mineral.creep == creep.name))
                Memory.rooms[creep.room.name].Mineral.creep = creep.name, creep.memory.src = 'Mineral';
        }else{
            if(Memory.rooms[creep.room.name][creep.memory.src].creep != creep.name)
            Memory.rooms[creep.room.name][creep.memory.src].creep = creep.name;
        }
        if(!creep.memory.src) return;
        const room = creep.room.name;
        const src_alias = creep.memory.src; 
        const src = Game.getObjectById(Memory.rooms[room][src_alias].id);
        const x = Memory.rooms[room][src_alias].x;
        const y = Memory.rooms[room][src_alias].y;
        const pos = new RoomPosition(x,y,room);
        if(creep.pos.isEqualTo(pos)) creep.harvest(src);
        else creep.moveTo(pos,{visualizePathStyle: {stroke: '#ffffff'},reuse:200});
    }
};