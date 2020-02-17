module.exports = {
    run: function(tower){

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            console.log('??'+tower.attack(closestHostile));
        }
        
        var Roads = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hits < 0.6*s.hitsMax
        });
        if(Roads != null) console.log(tower.repair(Roads));
/*
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }*/
    }
};