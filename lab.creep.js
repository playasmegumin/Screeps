var Act = require('behaviors');

module.exports = {
    run: function(creep){
        if(Game.flags['LAB']){
            var flag = Game.flags['LAB'];
            if(creep.pos.isNearTo(flag)) {
                Act.GetResource(creep,flag.pos,"energy");
            }else creep.moveTo(flag);
        }
    },
    body: [WORK,CARRY,MOVE],
    name: 'labcreep'
};