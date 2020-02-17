var FlagName = 'DE';

module.exports = {
    FlagName: FlagName,
    FlagBuilder: function(creep){
        if(!creep.memory.point) creep.memory.mode = 'move';
        
        if(creep.memory.mode == 'dismantle'){
            var target = Game.getObjectById(creep.memory.target);
            if(!target){
                target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                if(target && target.structureType != 'storage' && target.structureType != 'terminal') creep.memory.target = target.id;
                else if(!target || target.structureType == 'storage' || target.structureType == 'terminal') creep.memory.mode = 'build';
            }else if(creep.pos.isNearTo(target)) creep.dismantle(target);
            else creep.moveTo(target, {visualizePathStyle: {stroke: '#00BFFF'},reuse:2000});
            return;
        }

        if(creep.memory.mode == 'move'){
            if(creep.memory.point == undefined) creep.memory.point = 0;
            if(Game.flags['Explore'+creep.memory.point]){
                if(creep.pos.isEqualTo(Game.flags['Explore'+creep.memory.point])) creep.memory.point++;
                else creep.moveTo(Game.flags['Explore'+creep.memory.point], {visualizePathStyle: {stroke: '#00BFFF'},reuse:2000});
            }else creep.memory.mode = 'dismantle';
            return;
        }
        
        if(creep.memory.mode == 'build'){
            // Get to work!
            if(creep.store.getUsedCapacity() == 0) creep.memory.building = 0;
            if(creep.store.getFreeCapacity() == 0) creep.memory.building = 1;

            if(creep.memory.building){
                if(Game.getObjectById(creep.memory.cs) == null){
                    var tmp = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if(tmp) creep.memory.cs = tmp.id;
                }
                var cs = Game.getObjectById(creep.memory.cs);
                if(!cs) return;

                if(creep.pos.inRangeTo(cs,3)) creep.build(cs);
                else creep.moveTo(cs,{reuse:200});
            }else{
                var src = creep.pos.findClosestByPath(FIND_SOURCES,{
                    filter: function(s){
                        return s.energy > 0;
                    }
                });
                if(creep.pos.isNearTo(src)) creep.harvest(src);
                else creep.moveTo(src,{reuse:200});
            }
        }
    },
    FlagUpgrader: function(creep){
        if(creep.memory.mode != 'upgrade')
        if(Memory.explore.mode == 'move') creep.memory.mode = Memory.explore.mode;
        else return creep.say('Zzz');

        if(creep.memory.mode == 'move'){
            if(creep.memory.point == undefined) creep.memory.point = 0;
            if(Game.flags['Explore'+creep.memory.point]){
                if(creep.pos.isEqualTo(Game.flags['Explore'+creep.memory.point])) creep.memory.point++;
                else creep.moveTo(Game.flags['Explore'+creep.memory.point], {visualizePathStyle: {stroke: '#00BFFF'},reuse:2000});
            }else creep.memory.mode = 'upgrade';
            return;
        }
        
        // Get to work!
        if(creep.store.getUsedCapacity() == 0) creep.memory.upgrade = 0;
        if(creep.store.getFreeCapacity() == 0) creep.memory.upgrade = 1;

        if(creep.memory.upgrade){
            const room = creep.room.name;
            const pos = new RoomPosition(Memory.rooms[room].closepoint.x, Memory.rooms[room].closepoint.y, room);
            if(creep.pos.inRangeTo(creep.room.controller,3)) creep.upgradeController(creep.room.controller);
            else creep.moveTo(pos);
        }else{
            if(Game.flags['ExploreSrc']){
                if(creep.pos.isNearTo(Game.flags['ExploreSrc'])) creep.getResource(Game.flags['ExploreSrc'].pos,'energy');
                else creep.moveTo(Game.flags['ExploreSrc']);
            }else{
                if(creep.memory.src == undefined) creep.memory.src = creep.pos.findClosestByPath(FIND_SOURCES).id;
                var src = Game.getObjectById(creep.memory.src);
                if(creep.pos.isNearTo(src)) creep.harvest(src);
                else creep.moveTo(src,{reuse:2000});
            }
        }
        
    },
    FlagClaimer: function(creep){
        creep.say('Ist India?');
        if(Memory.explore.mode == 'move') creep.memory.mode = Memory.explore.mode;
        else return creep.say('Zzz');

        if(creep.memory.mode == 'move'){
            if(creep.memory.point == undefined) creep.memory.point = 0;
            if(Game.flags['Explore'+creep.memory.point]){
                if(creep.pos.isEqualTo(Game.flags['Explore'+creep.memory.point])) creep.memory.point++;
                else creep.moveTo(Game.flags['Explore'+creep.memory.point], {visualizePathStyle: {stroke: '#00BFFF'},reuse:2000});
            }else creep.memory.mode = 'claim';
            return;
        }

        if(creep.memory.mode == 'claim'){
            creep.say('wow');
            if(creep.pos.isNearTo(creep.room.controller)) creep.claimController(creep.room.controller);
            else creep.moveTo(creep.room.controller);
        }
    }
};
/*
Game.spawns['R1S2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Flag Upgrader',{memory:{role:'flagUpgrader'}});
Game.spawns['R1S2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Flag B5',{memory:{role:'flagBuilder'}});
Game.spawns['R1S2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],'Flag B4',{memory:{role:'flagBuilder'}});
Game.spawns['R1S2'].spawnCreep([CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE],'Flag Claimer',{memory:{role:'flagClaimer'}});
*/