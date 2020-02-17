var B = require('behaviors');

module.exports = {
    run: function(){
        //Check creep
        if(!Game.creeps['MU'] && Game.rooms['W35N28'].energyAvailable > 5000 && !Game.spawns['Ber'].spawning)
            Game.spawns['Ber'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                           CARRY,CARRY,CARRY,CARRY,CARRY,
                                           MOVE,MOVE,MOVE,MOVE,MOVE],'MU');
        //if(!Game.creeps['MP'] && Game.rooms['W35N28'].energyAvailable > 1500 && !Game.spawns['Ber'].spawning)
        //    Game.spawns['Ber'].spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],'MP',{memory:{role:'upgpicker'}});
        if(Game.rooms['W34N28'].terminal.store.getFreeCapacity() && Game.rooms['W34N28'].storage.store[RESOURCE_ENERGY] > 400000 && !Game.creeps['MK'] && Game.rooms['W34N28'].energyAvailable > 1000 && !Game.spawns['S2'].spawning)
            Game.spawns['S2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE],'MK',{memory:{role:'tk'}});

        if(Game.creeps['MU']){
            var creep = Game.creeps['MU'];
            if(creep.pos.isEqualTo(Game.flags['Upgrade'])){
                if(creep.store.getUsedCapacity() == 0){
                    const room = creep.room.name;
                    const pos = new RoomPosition(Memory.rooms[room].Upgrade.x, Memory.rooms[room].Upgrade.y, room);
                    if(creep.pos.isNearTo(pos)) B.GetResource(creep, pos, 'energy');
                    else creep.moveTo(pos);
                }else creep.upgradeController(creep.room.controller);
            }else creep.moveTo(Game.flags['Upgrade']);
        }

        if(Game.creeps['MP']){
            var creep = Game.creeps['MP'];
            if(creep.store.getUsedCapacity() == 0){
                if(creep.pos.isNearTo(Game.flags['Source2R1'])) B.GetResource(creep, Game.flags['Source2R1'].pos, 'energy');
                else creep.moveTo(Game.flags['Source2R1']);
            }else{
                if(creep.pos.isNearTo(creep.room.terminal)) creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                else creep.moveTo(creep.room.terminal);
            }
        }

        //if(Game.rooms['W34N28'].terminal.store.getUsedCapacity('energy') > 200000 && Game.rooms['W35N28'].terminal.store.getFreeCapacity() > 200000)
         //   Game.rooms['W34N28'].terminal.send(RESOURCE_ENERGY, 200000, 'W35N28');
    },

    rushB: function(){
        if(!Game.creeps['RushB U'] && Game.rooms['W34N28'].energyAvailable > 4500 && !Game.spawns['S2'].spawning){
            var body = [
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
            var name = 'RushB U';
            Game.spawns['S2'].spawnCreep(body,name);
        }

        if(!Game.creeps['Pick'] && !Game.spawns['S2'].spawning){
            var body = [
                CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                CARRY,CARRY,MOVE,CARRY,CARRY,MOVE];
            var name = 'Pick';
            Game.spawns['S2'].spawnCreep(body,name,{memory:{role:'upgpicker'}});
        }

        if(Game.creeps['RushB U'] && !Game.creeps['RushB U'].spawning){
            var creep = Game.creeps['RushB U'];
            if(!creep.pos.inRangeTo(creep.room.controller,3)){
                creep.moveTo(creep.room.controller);
                return;
            }  

            if(creep.memory.upgrade == undefined) creep.memory.upgrade = 0;
            if(creep.store.getUsedCapacity() == 0) creep.memory.upgrade = 0;
            else creep.memory.upgrade = 1;

            if(creep.memory.upgrade){
                creep.upgradeController(creep.room.controller);
            }else{
                //var src = Game.getObjectById('5e10888b1b057b6c64e7e443');
                //var amount = creep.store.getFreeCapacity();
                //if(amount > src.store['energy']) amount = src.store['energy'];
                //creep.say(creep.withdraw(src,'energy',amount));
                B.GetResource(creep, Game.flags['UpgradeR2'].pos, 'energy');
            }
        }

        if(Game.creeps['RushB P'] && !Game.creeps['RushB P'].spawning){
            var creepP = Game.creeps['RushB P'];
            if(creepP.memory.take == undefined) creepP.memory.take = 0;
            if(creepP.ticksToLive < 25 || creepP.store.getFreeCapacity() == 0) creepP.memory.take = 0;
            if(creepP.store.getUsedCapacity() == 0) creepP.memory.take = 1;
            
            if(creepP.memory.take){
                creepP.say('Rush!');
                var target = creepP.room.storage;
                if(creepP.pos.isNearTo(target)){
                    creepP.say('//?');
                    B.GetResource(creepP, target.pos, 'energy');
                }else creepP.moveTo(target);
            }else{
                creepP.say('?');
                const room = creepP.room.name;
                const pos = new RoomPosition(Memory.rooms[room].Upgrade.x, Memory.rooms[room].Upgrade.y, room);
                if(creepP.pos.isEqualTo(pos)) creepP.drop('energy');
                else creepP.moveTo(pos,{reuse:500});
            }
        }
    }
};