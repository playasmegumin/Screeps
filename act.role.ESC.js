module.exports = {
    run: function(creep){
        var target = Game.flags[creep.name];
        if(creep.pos.isNearTo(target)) creep.reserveController(creep.room.controller);
        else creep.moveTo(target,{reuse:200});
    }
};