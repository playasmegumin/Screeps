module.exports = {
    run: function(){
        //Check creep
        if(!Game.creeps['LINKER']){
            if(Game.rooms['W35N28'].energyAvailable > 300 && Game.spawns['Ber'].spawing == null)
                Game.spawns['Ber'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],'LINKER');
            return;
        }else if(Game.creeps['LINKER'].spawning) return;

        //Motivate creep
        var creep = Game.creeps['LINKER'];
        var Link = Game.getObjectById('5df87103324dd070219ce64c');
        if(creep.store.getUsedCapacity() == 0){
            if(creep.pos.isNearTo(creep.room.storage)) creep.withdraw(creep.room.storage, RESOURCE_ENERGY, creep.store.getFreeCapacity());
            else creep.moveTo(creep.room.storage);
        }else{
            if(creep.pos.isNearTo(Link)) creep.transfer(Link, RESOURCE_ENERGY);
            else creep.moveTo(Link);
        }

        var target = Game.getObjectById('5df90721ca55d738c5650108');
        var amount = target.store.getFreeCapacity();
        Link.transferEnergy(target);
    }
};