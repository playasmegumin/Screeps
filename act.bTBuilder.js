module.exports = {
    run: function(){
        //Check creep
        if(!Game.creeps['BUIKER']){
            if(Game.rooms['W35N28'].energyAvailable > 700 && Game.spawns['Ber'].spawing == null)
                Game.spawns['Ber'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],'BUIKER');
            return;
        }else if(Game.creeps['BUIKER'].spawning) return;

        //Motivate creep
        var creep = Game.creeps['BUIKER'];
        var Link = Game.getObjectById('5df90721ca55d738c5650108');
        if(creep.store.getUsedCapacity() == 0){
            var amount = creep.store.getFreeCapacity();
            if(amount > Link.store[RESOURCE_ENERGY]) amount = Link.store[RESOURCE_ENERGY];
            if(creep.pos.isNearTo(Link)) creep.withdraw(Link, RESOURCE_ENERGY, amount);
            else creep.moveTo(Link);
        }else{
            var Terminal = Game.getObjectById('5e04c528e15215143d0c93b2');
            if(creep.pos.inRangeTo(Terminal,3)) creep.build(Terminal);
            else creep.moveTo(Terminal);
        }
    }
};